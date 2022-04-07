require("dotenv").config();
// this works console.log(process.env);
/* no router const express = require("express");
const location = express.Router();*/

const mysql = require("mysql");
var pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 5,
  //multipleStatements: true, // to avoid sqlinjection
});

let connectionPromiseFunctions = {
  /*connect: () => {
    //remember (resolve, reject) NOT (reject, resolve) works better this way
    function newF(resolve, reject) {
      pool.connect((err) => {
        if (err) {
          reject("Connection could not be opened: " + err);
        } else {
          resolve("connected");
        }
      });
    }
    return new Promise(newF);
  },*/
  findAll: () => {
    function newF(resolve, reject) {
      let sqlQ = "";
      sqlQ = `select * from locations`;
      pool.query(sqlQ, (err, locations) => {
        // for testing console.log("sqlQ: " + sqlQ);
        if (err) {
          reject(err);
        } else {
          resolve(locations);
        }
      });
    }
    return new Promise(newF);
  },
  findById: (id) => {
    //remember (resolve, reject) NOT (reject, resolve) works better this way
    function newF(resolve, reject) {
      let sqlQid = `select * from locations where id = ${connection.escape(
        id
      )}`;

      pool.query(sqlQid, (err, locations) => {
        //testing console.log("sqlQid: " + sqlQid);
        if (err) {
          reject(err); //("No location in id : " + id);
        } else {
          resolve(locations);
        }
      });
    }
    return new Promise(newF);
  },
  deleteById: (id) => {
    function newF(resolve, reject) {
      let sqlQrid = `delete from locations where id =${connection.escape(id)}`;
      connection.query(sqlQrid, (err, removed) => {
        //testing console.log("sqlQrid: " + sqlQrid);
        if (err) {
          reject(err);
        } else {
          resolve(removed);
        }
      });
    }
    return new Promise(newF);
  },
  save: (newlocation) => {
    function newF(resolve, reject) {
      let sqlQins = `insert into locations (latitude, longitude) values(${pool.escape(
        newlocation.latitude
      )} , ${pool.escape(newlocation.longitude)})`;

      pool.query(sqlQins, (err, inserted) => {
        //testings console.log("sqlQins: " + sqlQins);
        if (err) {
          reject(err);
        } else {
          resolve(inserted);
        }
      });
    }
    return new Promise(newF);
  },
  /* redo later
  close: () => {
    //remember (resolve, reject) NOT (reject, resolve) works better this way
    function newF(resolve, reject) {
      connection.end((err) => {
        if (err) {
          reject("Connection could not be closed: " + err);
        } else {
          resolve("closed");
        }
      });
    }
    return new Promise(newF);
  },*/
};

// will wait if previously enqueued queriest
module.exports = connectionPromiseFunctions;
//module.exports = location;
