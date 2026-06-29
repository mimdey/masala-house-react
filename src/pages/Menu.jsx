import { useState } from "react";
import MenuCard from "../components/MenuCard";

import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import food5 from "../assets/food5.jpg";
import food6 from "../assets/food6.jpg";

const menuItems = [
  {
    name: "Butter Chicken",
    price: 16.99,
    image: food1,
    description: "Creamy tomato curry with tender chicken pieces.",
  },
  {
    name: "Chicken Biryani",
    price: 15.99,
    image: food2,
    description: "Fragrant basmati rice cooked with spices and chicken.",
  },
  {
    name: "Vegetable Samosa",
    price: 6.99,
    image: food3,
    description: "Crispy pastry filled with spiced potatoes and peas.",
  },
  {
    name: "Garlic Naan",
    price: 4.99,
    image: food4,
    description: "Soft tandoori bread topped with garlic and butter.",
  },
  {
    name: "Tandoori Chicken",
    price: 17.99,
    image: food5,
    description: "Chicken marinated in yogurt and spices, cooked in a tandoor.",
  },
  {
    name: "Gulab Jamun",
    price: 5.99,
    image: food6,
    description: "Sweet milk dumplings soaked in warm sugar syrup.",
  },
];

function Menu() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeOneFromCart = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page-section container">
      <h1 className="page-title">Our Menu</h1>
      <p className="page-subtitle">Click any item to add it to your cart.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="row g-4">
            {menuItems.map((item) => (
              <div className="col-md-6" key={item.name}>
                <MenuCard item={item} addToCart={addToCart} />
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
                <div className="cart-item" key={item.name}>
                  <p className="mb-1">
                    <strong>{item.name}</strong>
                  </p>
                  <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                  <p className="mb-2">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeOneFromCart(item.name)}
                  >
                    Remove One
                  </button>
                </div>
              ))
            )}

            <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>

            <button className="btn btn-warning fw-bold mt-2" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Menu;