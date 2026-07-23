const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// CREATE: place a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, items, totalPrice } = req.body;

    if (!customerName || !items || items.length === 0 || totalPrice === undefined) {
      return res.status(400).json({
        message: "Customer name, items, and total price are required.",
      });
    }

    const newOrder = await Order.create({
      customerName,
      items,
      totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({
      message: "Could not create order.",
      error: error.message,
    });
  }
});

// READ: get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve orders.",
      error: error.message,
    });
  }
});

// UPDATE: update order status or details
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Could not update order.",
      error: error.message,
    });
  }
});

// DELETE: delete an order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully.",
      deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete order.",
      error: error.message,
    });
  }
});

module.exports = router;