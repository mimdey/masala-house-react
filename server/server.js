const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const menuRoutes = require("./routes/menuRoutes");

const orderRoutes = require("./routes/orderRoutes"); 

const cartRoutes = require("./routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send("Masala House backend is running!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });