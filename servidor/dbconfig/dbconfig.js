const monitor = require("pg-monitor");

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "gestorTareas",
  user: "usuario_consulta",
  password: "test123"
};

const initOptions = {
  // global event notification;
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  }
};

monitor.attach(initOptions);
monitor.setTheme("matrix");
const pgp = require("pg-promise")(initOptions);
const db = pgp(dbConfig);

module.exports = { db };
