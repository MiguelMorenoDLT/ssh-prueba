//EXPRESS
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/resources", express.static("static"));
app.use("/resources", express.static(__dirname + "/static"));
app.set("view engine", "ejs");

const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const bcryptjs = require("bcryptjs");
const connecttion = require("./database/db");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  connecttion.query(
    "INSERT INTO user SET ?",
    { user: user, name: name, rol: rol, password: passwordHaash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("registrar", {
          alert: true,
          alertTitle: "Registro",
          alertMessage: "!Succesful Registration!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: ""
        });
      }
    }
  );
});
app.post('/auth', async (req, res)=>{
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  if (user && pass) {
    connecttion.query('SELECT * FROM user WHERE user = ?', [user], async (error, results)=>{
      if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].password))) {
        res.render("ingresar", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "!Usuario y/o Contraseña incorrectas!",
          alertIcon: "error",
          showConfirmButton: true,
          timer: 2500,
          ruta:"login"
        });
      }else{
        req.session.name = results[0].name
        res.render("ingresar", {
          alert: true,
          alertTitle: "Ingresaste",
          alertMessage: "!LOGIN CORRECTO!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "www.prueba2.com"
        });
      }
    })
    
  }else{
    res.send("pon algo cooherente");
  }
});

app.use(require("./routes/login"));
app.use(require("./routes/register"));

// Rutas
app.listen(3000, (req, res) => {
  console.log("SERVER RUNNING IN http://localhost:3000");
});
