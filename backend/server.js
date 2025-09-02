const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ err });
    }
    res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?)";
  const values = [req.body.Name, req.body.Email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE `ID` = ?";
  const values = [req.body.Name, req.body.Email, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log("Delete request received for ID:", req.params.id); // Add this line
  const sql = "DELETE FROM student WHERE `ID` = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });
    return res.json({ success: true });
  });
});

app.listen(8081, () => {
  console.log("listening");
});
