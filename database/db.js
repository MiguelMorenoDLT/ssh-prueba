const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "admin",
  database: "store",
});

connection.connect((error) => {
  if (error) {
    console.log("El error de conexion es : " + error);
    return;
  }
  console.log("Conectado correctamente a la base de datos");
});

module.exports = connection;
