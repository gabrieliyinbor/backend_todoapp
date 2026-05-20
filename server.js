require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("./db");
const { v7: uuid7 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: "401", message: "Unauthorized" });
  }
};

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ status: "400", message: "Field empty" });
    }
    const existingUser = await pool.query(
      "select * from users where username = $1",
      [username],
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(200)
        .json({ status: "200", message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuid7();
    const result = await pool.query(
      "insert into users (id,username,email,password) values ($1,$2,$3,$4)",
      [id, username, email, hashedPassword],
    );

    res.status(201).json({ status: "success", data: { id, username, email } });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ status: "400", message: "Field empty" });
    }
    const result = await pool.query("select * from users where username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "404", message: "User doesn't exist" });
    }
    const hash = await bcrypt.compare(password, result.rows[0].password);
    if (!hash) {
      return res
        .status(401)
        .json({ status: "401", message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: result.rows[0].id, username: result.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ status: "200", token: token });
  } catch (err) {
    res.status(500).json({ status: "500", message: "Internal server error" });
  }
});

app.post("/api/todos", authenticate, async (req, res) => {
  try {
    const { id } = req.user;
    const { todo } = req.body;
    const todoId = uuid7();
    if (!todo) {
      return res.status(400).json({ status: "400", message: "Field empty" });
    }
    const result = await pool.query(
      "insert into todos (id,user_id,todo) values ($1,$2,$3) returning *",
      [todoId, id, todo],
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "500", message: "Internal server error" });
  }
});

app.get("/api/todos", authenticate, async (req, res) => {
  try {
    const result = await pool.query("select * from todos where user_id = $1", [
      req.user.id,
    ]);
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

app.delete("/api/todos/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user.id;
    const result = await pool.query(
      "delete from todos where id= $1 AND user_id = $2 ",
      [id, userID],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
