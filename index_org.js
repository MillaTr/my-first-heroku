const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();

const mysql = require("mysql");
const port = process.env.PORT || 8080;

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

// not needed with static app.use(cors());
/* not needed with cors
app.use((req, res, next) => {
  // testing console.log("Time:", Date.now());
  res.header("Access-Control-Allow-Origin", "*");
  next();
});*/

var connection = mysql.createConnection(config);

app.use(express.static("public"));

app.get("/locations", (req, res) => {
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
