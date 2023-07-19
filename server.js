const http = require("http");
const debug = require("debug")("node-angular");
const app = require("./backend/app");

const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const rateLimit = require("express-rate-limit");

const fetch = require("node-fetch");

app.use(cors());
app.use(bodyparser.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Allow a maximum of 10 requests per minute
});



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
        res
          .status(409)
          .json({ message: "Invalid authentication credentials!" });
        return;
      }

      // Hash da senha
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error("Erro ao gerar hash da senha:", err);
          res.status(500).json({ error: "Erro interno no servidor" });
          return;
        }

        // Insere o utilizador na base de dados
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
          return res
            .status(401)
            .json({ message: "Invalid authentication credentials!" });
        }

        const token = jwt.sign(
          { email: user.email, userId: user.id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );

        res.status(200).json({ token: token, expiresIn: 3600 });
      });
    }
  );
});

//inserir exercicio (a funcionar)

app.post("/inserir", limiter, (req, res) => {
  const exercises = req.body.exercises;
  //const { text_code, user_id } = req.body;

  if (!Array.isArray(exercises)) {
    res.status(400).json({ error: "Lista de exercicios invalida" });
    return;
  }
  const values = exercises.map((exercicio) => [
    exercicio.text_code,
    exercicio.user_id,
  ]);

  const query = "INSERT IGNORE INTO exercise (text_code, user_id) VALUES ?";
  //const values = [text_code, user_id];

  mysqlConnection.query(query, [values], (error, results) => {
    if (error) {
      console.error("Erro ao inserir o enunciado na base de dados:", error);
      res.status(500).json({ error: "Erro ao inserir o enunciado" });
      return;
    }

    const affectedRows = results.affectedRows;

    if (affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "O enunciado já existe na base de dados",
      });
    }
  });
});

app.get("/exercise", (req, res) => {
  const query = "SELECT * FROM exercise";

  mysqlConnection.query(query, (error, results) => {
    if (error) {
      console.error("Erro ao recuperar o enunciado da base de dados:", error);
      res.status(500).json({ error: "Erro ao recuperar o enunciado" });
      return;
    }

    // const exercises = results[0]; // Assumindo que há apenas um enunciado

    res.json(results);
  });
});

const exercicio1 = {
  text_code:
    "Construa um algoritmo que solicite ao utilizador o seu nome de se seguida imprima uma saudação com o seu nome.",
  user_id: 1,
};

const exercicio2 = {
  text_code:
    "Construa um algoritmo que solicite ao utilizador o seu nome, a sua idade e de se seguida imprima uma saudação com o seu nome e a sua idade.",
  user_id: 1,
};

const exercises = [exercicio1, exercicio2];

fetch("http://localhost:3000/inserir", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ exercises }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Exercícios inseridos com sucesso:", data);
  })
  .catch((error) => {
    console.error("Erro ao inserir os exercícios:", error);
  });

// Ver exercicio selecionado na tab "Enunciado"
app.get("/exercise/:id", limiter, (req, res) => {
  const exerciseId = req.params.id;
  const query = "SELECT * FROM exercise WHERE id = ?";
  const values = [exerciseId];

  mysqlConnection.query(query, values, (error, results) => {
    if (error) {
      console.error("Erro ao buscar o exercício:", error);
      res.status(500).json({ error: "Erro ao buscar o exercício" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Exercício não encontrado" });
      return;
    }

    const exercise = results[0];
    res.json(exercise);
  });
});

//guardar pseudocodigo na base de dados
app.post("/save_pseudocode", limiter, (req, res) => {
  const { pseudoCode, exerciseId } = req.body;

  // Obter o token JWT do cabeçalho de autorização
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extrair o token sem o prefixo "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação não fornecido" });
  }

  try {
    // Verificar e decodificar o token JWT
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");

    // Extrair o email do utilizador do token decodificado
    const userEmail = decodedToken.email;

    // Consultar o banco de dados para obter o ID do utilizador com base no email
    const userQuery = "SELECT id FROM user WHERE email = ?";
    const userValues = [userEmail];

    mysqlConnection.query(userQuery, userValues, (error, userResults) => {
      if (error) {
        console.error("Erro ao buscar o ID do utilizador:", error);
        res.status(500).json({ error: "Erro ao buscar o ID do utilizador" });
        return;
      }

      if (userResults.length === 0) {
        res.status(404).json({ error: "utilizador não encontrado" });
        return;
      }

      const userId = userResults[0].id;

      const query = "INSERT INTO exercise_solution (pseudocode, exercise_id) VALUES (?, ?)";
      const values = [pseudoCode, exerciseId];

      mysqlConnection.query(query, values, (error, exerciseSolutionResults) => {
        if (error) {
          console.error("Erro ao salvar o pseudocódigo:", error);
          res.status(500).json({ error: "Erro ao salvar o pseudocódigo" });
          return;
        }

        const exerciseSolutionId = exerciseSolutionResults.insertId; // Obtém o ID gerado para a inserção na tabela exercise_solution

        const userSolutionQuery = "INSERT INTO user_solution ( user_id, solution_id) VALUES (?, ?)";
        const userSolutionValues = [userId, exerciseSolutionId];

        mysqlConnection.query(userSolutionQuery, userSolutionValues, (error, userSolutionResults) => {
          if (error) {
            console.error("Erro ao salvar o pseudocódigo na tabela user_solution:", error);
            res.status(500).json({ error: "Erro ao salvar o pseudocódigo" });
            return;
          }

          res.json({ success: true });
        });
      });
    });
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
});