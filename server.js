const http = require("http");
const debug = require("debug")("node-angular");
const app = require("./backend/app");

const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tesp2018#",
  database: "easy_programming",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

const port2 = process.env.PORT || 8080;
app.listen(port2, () => console.log(`Listening on port ${port2}..`));

mysqlConnection.query("Select * from user", (error, result, fields) => {
  /*console.log(error);
  console.log(result);*/
});

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if ((port) => 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

module.exports = mysqlConnection;

// Rota de registro de usuário
app.post("/api/user/signup", (req, res) => {
  const { nome, email, password } = req.body;

  // Verifica se o email já está em uso
  mysqlConnection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar o email:", err);
        res.status(500).json({ error: "Erro interno no servidor" });
        return;
      }

      if (results.length > 0) {
        res.status(409).json({ error: "Email já está em uso" });
        return;
      }

      // Hash da senha
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error("Erro ao gerar hash da senha:", err);
          res.status(500).json({ error: "Erro interno no servidor" });
          return;
        }

        // Insere o usuário no banco de dados
        mysqlConnection.query(
          "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
          [nome, email, hash],
          (err, results) => {
            if (err) {
              console.error("Erro ao inserir o usuário:", err);
              res.status(500).json({ error: "Erro interno no servidor" });
              return;
            }

            res.status(201).json({ message: "Usuário registrado com sucesso" });
          }
        );
      });
    }
  );
});

app.post("/api/user/login", (req, res, next) => {
  const { email, password } = req.body;

  mysqlConnection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar o email:", err);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Auth failed" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Erro ao comparar as senhas:", err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        if (!result) {
          return res.status(401).json({ message: "Auth failed" });
        }

        const token = jwt.sign(
          { email: user.email, userId: user.id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );

        res.status(200).json({ token: token, expiresIn: 3600});
      });
    }
  );
});
