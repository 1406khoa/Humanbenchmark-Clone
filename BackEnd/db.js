const mysql = require('mysql2/promise');
require('dotenv').config();
const { URL } = require('url');

const dbUrl = process.env.MYSQL_URL;
if (!dbUrl) {
  throw new Error("❌ Chưa có biến môi trường MYSQL_URL!");
}

// Tách DSN
const { hostname, username, password, pathname, port } = new URL(dbUrl);
const database = pathname.slice(1); // bỏ dấu "/"

const pool = mysql.createPool({
  host: hostname,
  user: username,
  password,
  database,
  port
});

// Kiểm tra kết nối (test)
(async () => {
  try {
    const conn = await pool.getConnection(); // Kết nối thử
    console.log("✅ Kết nối MySQL thành công!");
    conn.release(); // Trả connection về pool
  } catch (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
  }
})();

module.exports = pool;
