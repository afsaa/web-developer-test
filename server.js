const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const monitor = require("pg-monitor");

const dbConfig = {
  "host": "localhost",
  "port": 5432,
  "database": "gestorTareas",
  "user": "postgres",
  "password": "andressaa94"
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

// Starting the server
app.listen(port, () => {
  console.log("Listening on port 8080...");
});

app.use(bodyParser.json());

// @route GET api/tareas
// @desc Obtener Todas las Tareas
// @access Public
app.get("/", (req, res) => {
  db.any("SELECT * FROM tarea", [true])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
    });
});
// @route POST api/tareas
// @desc Crear una tarea
// @access Public
app.post("/", (req, res) => {
  db.any(
    `INSERT INTO tarea (nombre, prioridad, fecha_venc) VALUES(${toString(
      req.body.name
    )}, ${req.body.priority}, ${toString(req.body.exp_date)})`,
    [true]
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
    });
});
// @route DELETE api/tasks/:id
// @desc Delete a task
// @access Public
app.delete("/:id", (req, res) => {
  db.any(`DELETE FROM tarea WHERE id=${req.params.id}`, [true])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
    });
});
