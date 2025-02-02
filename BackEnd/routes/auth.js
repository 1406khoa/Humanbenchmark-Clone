const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// API Đăng Ký
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (id, email, password_hash) VALUES (UUID(), ?, ?)";
  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Lỗi khi đăng ký" });
    res.json({ success: true, message: "Đăng ký thành công!" });
  });
});

// API Đăng Nhập
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ success: false, message: "Email không tồn tại" });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password_hash))
      return res.status(401).json({ success: false, message: "Sai mật khẩu" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token, user: { id: user.id, email: user.email } });
  });
});

module.exports = router;
