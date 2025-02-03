const mysql = require('mysql2/promise');
require('dotenv').config();
const { URL } = require('url');

const dbUrl = process.env.MYSQL_URL;

const { hostname, username, password, pathname, port } = new URL(dbUrl);
const database = pathname.slice(1);

const pool = mysql.createPool({
  host: hostname,
  user: username,
  password,
  database,
  port
});
db.connect((err) => {
  if (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
    return;
  }
  console.log("✅ Kết nối MySQL thành công!");
});

module.exports = pool;
