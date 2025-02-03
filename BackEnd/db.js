const mysql = require('mysql2/promise');
require('dotenv').config();
const { URL } = require('url');

// Xây dựng DSN từ biến môi trường
const dbUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`;

// Kiểm tra xem dbUrl có rỗng không
if (!dbUrl) {
  throw new Error("❌ Chưa có chuỗi DSN MySQL (dbUrl)!");
}

// Tách DSN
const { hostname, username, password, pathname, port } = new URL(dbUrl);
const database = pathname.slice(1); // Bỏ dấu "/"

const pool = mysql.createPool({
  host: hostname,
  user: username,
  password,
  database,
  port
});

// Thử kết nối khi khởi chạy
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Kết nối MySQL thành công!");
    conn.release();
  } catch (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
  }
})();

module.exports = pool;
