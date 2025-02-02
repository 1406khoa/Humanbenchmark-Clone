const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/auth");
const scoreRoutes = require("./routes/score");

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API đang chạy trên Railway!");
});

// 🚀 Railway sẽ cấp `PORT`, nếu không thì dùng `3000`
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});

module.exports = app;
