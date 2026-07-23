const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// READ: Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve menu items.",
      error: error.message,
    });
  }
});

// CREATE: Add a new menu item
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || price === undefined || !image) {
      return res.status(400).json({
        message: "Name, description, price, and image are required.",
      });
    }

    const newMenuItem = await MenuItem.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({
      message: "Could not create menu item.",
      error: error.message,
    });
  }
});

// UPDATE: Edit an existing menu item
router.put("/:id", async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({
        message: "Menu item not found.",
      });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({
      message: "Could not update menu item.",
      error: error.message,
    });
  }
});

// DELETE: Delete a menu item
router.delete("/:id", async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({
        message: "Menu item not found.",
      });
    }

    res.status(200).json({
      message: "Menu item deleted successfully.",
      deletedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete menu item.",
      error: error.message,
    });
  }
});

module.exports = router;