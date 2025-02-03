const mysql = require("mysql2");
require("dotenv").config();

const url = process.env.MYSQL_URL;

const db = mysql.createConnection(url);

db.connect((err) => {
  if (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
    return;
  }
  console.log("✅ Kết nối MySQL thành công!");
});

module.exports = db;
