const express = require("express"),
  md5 = require("md5");
const router = express.Router();
const { db } = require("../dbconfig/dbconfig");

// @route GET api/tareas
// @desc Obtener Todas las Tareas
// @access Public
router.get("/tareas", (req, res) => {
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
router.post("/tareas", (req, res) => {
  db.any(
    `INSERT INTO tarea (nombre, prioridad, fecha_venc) VALUES('${req.body.nombre}', ${req.body.prioridad}, '${req.body.fecha_venc}')`,
    [true]
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.json({ success: false });
    });
});
// @route DELETE api/tareas/:id
// @desc Eliminar una tarea
// @access Public
router.delete("/tareas/:id", (req, res) => {
  db.any(`DELETE FROM tarea WHERE id=${req.params.id}`, [true])
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.json({ success: false });
    });
});

// Auth
router.post("/login", (req, res) => {
  db.any(
    `SELECT * FROM usuario WHERE nombre_usuario='${
      req.body.email
    }' AND "contraseña"='${md5(req.body.password)}'`
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.json({ success: false });
    });
});
module.exports = router;
