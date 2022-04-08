const express = require("express");
const app = express();
var cors = require("cors");
const locations = require("./database/locations_crudrepository");

var Validator = require("jsonschema").Validator;
var validator = new Validator();

const port = process.env.PORT || 8080;

const locationSchema = {
  id: "/OneLocation",
  type: "object",
  properties: {
    latitude: { type: "number", minimum: -90, maximum: 90 },
    longitude: { type: "number", minimum: -180, maximum: 180 },
  },
  required: ["latitude", "longitude"],
};
validator.addSchema(locationSchema, "/OneLocation");

app.use(cors());
app.use(express.static("frontend/build"));
// first static version app.use(express.static("public"));
app.use(express.json());

app.get("/locations", async (req, res) => {
  try {
    let allLocations = await locations.findAll(); //
    if (allLocations.length > 0) {
      res.send(allLocations);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/locations/:id([1-9]+)", async (req, res) => {
  try {
    const locationID = Number(req.params.id);
    let oneLocations = await locations.findById(locationID);
    if (oneLocations.length > 0) {
      res.send(oneLocations);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(404).end();
  }
});

app.delete("/locations/:id([1-9]+)", async (req, res) => {
  try {
    const removeID = Number(req.params.id);
    let oneLocations = await locations.deleteById(removeID);
    if (Number(oneLocations.affectedRows) > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).end();
  }
});

app.post("/locations", async (req, res) => {
  try {
    let newLocation = req.body;
    const validation = validator.validate(newLocation, locationSchema);
    //testing console.log(validation);
    var errorMessages = validation.errors.map(function (err) {
      return err.stack;
    });
    console.log(errorMessages);

    if (errorMessages.length === 0) {
      let oneLocations = await locations.save(newLocation);
      //test console.log(oneLocations);
      console.log("rows affected " + oneLocations.affectedRows);
      if (Number(oneLocations.affectedRows) > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } else {
      res.status(404).end(); // this is better to do in front end send("Bad location code/codes");
    }
  } catch (err) {
    res.status(400).end();
  }
});

const server = app.listen(port, async () => {
  console.log(`Example app listening on port ${server.address().port}`);
  //not needed with connection pool let rConn = await locations.connect();
  //console.log(rConn);
});
