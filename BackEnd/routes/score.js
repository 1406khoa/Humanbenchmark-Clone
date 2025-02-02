const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ success: false, message: "Chưa đăng nhập hoặc token không hợp lệ" });
    }
  
    const token = authHeader.split(" ")[1]; // Lấy token sau "Bearer "
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ success: false, message: "Token không hợp lệ" });
      req.userId = decoded.id;
      next();
    });
  };
  

// API Lưu Điểm
router.post("/save", verifyToken, (req, res) => {
  const { game_id, score } = req.body;
  const userId = req.userId;

  const query = "INSERT INTO scores (id, user_id, game_id, score) VALUES (UUID(), ?, ?, ?) ON DUPLICATE KEY UPDATE score = VALUES(score)";
  db.query(query, [userId, game_id, score], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Lỗi khi lưu điểm" });
    res.json({ success: true, message: "Điểm số đã được cập nhật!" });
  });
});

// API Lấy Điểm Của Người Dùng
router.get("/user", verifyToken, (req, res) => {
  const userId = req.userId;
  
  db.query("SELECT * FROM scores WHERE user_id = ? ORDER BY created_at DESC", [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Lỗi khi lấy điểm" });
    res.json({ success: true, scores: results });
  });
});

// API Lấy Điểm Của Một Trò Chơi
router.get("/game/:gameId", (req, res) => {
  const { gameId } = req.params;

  db.query("SELECT * FROM scores WHERE game_id = ? ORDER BY score DESC", [gameId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Lỗi khi lấy điểm" });
    res.json({ success: true, scores: results });
  });
});

module.exports = router;
