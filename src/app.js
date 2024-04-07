const express = require("express");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const clientesRoutes = require("./routes/clientes");
const productosRoutes = require("./routes/productos");

/*
const mysqlConfig = {
  host: "node_mysql",
  user: "valeria",
  password: "valeria",
  database: "nodedb"
};*/

let con = null;

const app = express();
app.set("port", 9000);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(myconnection(mysql, {
  host: "node_mysql",
  user: "valeria",
  password: "valeria",
  database: "nodedb"
}, 'single' ));


app.use("/", clientesRoutes);
app.use("/", productosRoutes);

// Crear la tabla clientes si no existe
app.use("/", (req, res, next) => {
    req.getConnection((err, connection) => {
      if (err) return next(err);
      const sql = `
        CREATE TABLE IF NOT EXISTS clientes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          correo VARCHAR(255) NOT NULL,
          tel VARCHAR(20) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  ENGINE=INNODB;
      `;
      connection.query(sql, (err, result) => {
        if (err) return next(err);
        next(); // Llama al siguiente middleware
      });
    });
  });

// Crear la tabla productos si no existe
app.use("/", (req, res, next) => {
    req.getConnection((err, connection) => {
      if (err) return next(err);
      const sql = `
        CREATE TABLE IF NOT EXISTS productos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          producto VARCHAR(255) NOT NULL,
          precio DOUBLE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  ENGINE=INNODB;
      `;
      connection.query(sql, (err, result) => {
        if (err) return next(err);
        next(); // Llama al siguiente middleware
      });
    });
  });

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.listen(app.get("port"), () => {
    console.log("Listening on port ", app.get("port"));
  });