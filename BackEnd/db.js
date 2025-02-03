// db.js
const mysql = require('mysql2');
require('dotenv').config();

// In ra giá trị các biến môi trường để debug
console.log("process.env.MYSQL_HOST =", process.env.MYSQL_HOST);
console.log("process.env.MYSQL_PORT =", process.env.MYSQL_PORT);
console.log("process.env.MYSQL_USER =", process.env.MYSQL_USER);
console.log("process.env.MYSQL_PASSWORD =", process.env.MYSQL_PASSWORD);
console.log("process.env.MYSQL_DATABASE =", process.env.MYSQL_DATABASE);

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

module.exports = db;
