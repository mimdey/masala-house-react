import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";

import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import food5 from "../assets/food5.jpg";
import food6 from "../assets/food6.jpg";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

const CART_ID =
  localStorage.getItem("cartId") ||
  crypto.randomUUID();

localStorage.setItem("cartId", CART_ID);

const imageMap = {
  "food1.jpg": food1,
  "food2.jpg": food2,
  "food3.jpg": food3,
  "food4.jpg": food4,
  "food5.jpg": food5,
  "food6.jpg": food6,
};

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        setError("");

        const [menuResponse, cartResponse] = await Promise.all([
          fetch(`${API_URL}/api/menu`),
          fetch(`${API_URL}/api/cart/${CART_ID}`),
        ]);

        if (!menuResponse.ok) {
          throw new Error("Could not load the menu.");
        }

        if (!cartResponse.ok) {
          throw new Error("Could not load the shopping cart.");
        }

        const menuData = await menuResponse.json();
        const cartData = await cartResponse.json();

        const menuWithImages = menuData.map((item) => ({
          ...item,
          image: imageMap[item.image] || food1,
        }));

        setMenuItems(menuWithImages);
        setCart(cartData.items || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, []);

  const addToCart = async (item) => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/cart/${CART_ID}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menuItemId: item._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add the item.");
      }

      setCart(data.items || []);
      setMessage(`${item.name} was added to your cart.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const removeOneFromCart = async (item) => {
    try {
      setError("");
      setMessage("");

      const newQuantity = item.quantity - 1;

      const response = await fetch(
        `${API_URL}/api/cart/${CART_ID}/items/${item.menuItemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not update the cart item."
        );
      }

      setCart(data.items || []);
      setMessage(`One ${item.name} was removed.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const clearCart = async () => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/cart/${CART_ID}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not clear the cart.");
      }

      setCart(data.items || []);
      setMessage("Your cart was cleared.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!customerName.trim()) {
      setError("Please enter your name before placing the order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setError("");
      setMessage("");

      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalPrice: Number(total.toFixed(2)),
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message || "Could not place the order."
        );
      }

      const clearResponse = await fetch(
        `${API_URL}/api/cart/${CART_ID}`,
        {
          method: "DELETE",
        }
      );

      const clearedCart = await clearResponse.json();

      if (!clearResponse.ok) {
        throw new Error(
          clearedCart.message ||
            "The order was saved, but the cart could not be cleared."
        );
      }

      setCart(clearedCart.items || []);
      setCustomerName("");
      setMessage(
        `Order placed successfully! Order ID: ${orderData._id}`
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="page-section container">
      <h1 className="page-title">Our Menu</h1>

      <p className="page-subtitle">
        Menu items are loaded directly from our database.
      </p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading menu...</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="row g-4">
              {menuItems.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <MenuCard
                    item={item}
                    addToCart={addToCart}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cart-box">
              <h2>Shopping Cart</h2>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.menuItemId}
                  >
                    <p className="mb-1">
                      <strong>{item.name}</strong>
                    </p>

                    <p className="mb-1">
                      Price: ${item.price.toFixed(2)}
                    </p>

                    <p className="mb-2">
                      Quantity: {item.quantity}
                    </p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeOneFromCart(item)}
                    >
                      Remove One
                    </button>
                  </div>
                ))
              )}

              <h3 className="mt-3">
                Total: ${total.toFixed(2)}
              </h3>

              <button
                className="btn btn-warning fw-bold mt-2"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear Cart
              </button>

              <hr />

              <label
                htmlFor="customerName"
                className="form-label fw-bold"
              >
                Customer Name
              </label>

              <input
                id="customerName"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
              />

              <button
                className="btn btn-success fw-bold w-100 mt-3"
                onClick={placeOrder}
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Menu;