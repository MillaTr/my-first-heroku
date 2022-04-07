const express = require("express");
const app = express();
require("dotenv").config();

const mysql = require("mysql");
const port = process.env.PORT || 8080;

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

var connection = mysql.createConnection(config);

app.get("/", (req, res) => {
  connection.query("SELECT * from locations", (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

/*
const db = [{ name: "tiina" }, { name: "jack" }];

app.get("/names", (req, res) => {
  res.send(db);
});*/
