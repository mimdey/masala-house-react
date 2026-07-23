const express = require("express");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// READ: get a cart
router.get("/:cartId", async (req, res) => {
  try {
    let cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      cart = await Cart.create({
        cartId: req.params.cartId,
        items: [],
        totalPrice: 0,
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve cart.",
      error: error.message,
    });
  }
});

// CREATE: add an item to the cart
router.post("/:cartId/items", async (req, res) => {
  try {
    const { menuItemId } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found.",
      });
    }

    let cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      cart = new Cart({
        cartId: req.params.cartId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Could not add item to cart.",
      error: error.message,
    });
  }
});

// UPDATE: change quantity
router.patch("/:cartId/items/:menuItemId", async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be a whole number that is 0 or greater.",
      });
    }

    const cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (cartItem) =>
        cartItem.menuItemId.toString() === req.params.menuItemId
    );

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        (cartItem) =>
          cartItem.menuItemId.toString() !== req.params.menuItemId
      );
    } else {
      item.quantity = quantity;
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Could not update cart item.",
      error: error.message,
    });
  }
});

// DELETE: remove one item completely
router.delete("/:cartId/items/:menuItemId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.menuItemId.toString() !== req.params.menuItemId
    );

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Could not remove cart item.",
      error: error.message,
    });
  }
});

// DELETE: clear the whole cart
router.delete("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Could not clear cart.",
      error: error.message,
    });
  }
});

module.exports = router;