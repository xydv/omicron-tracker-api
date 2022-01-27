const express = require("express");
const Datastore = require("nedb");
const app = express();
const db = new Datastore("database.db");
db.loadDatabase();
app.use(express.json());
app.get("/", (req, res) => {
  db.find({}, (error, docs) => {
    // console.log(docs);
    res.status(200).send(docs);
  });
});
app.post("/", (req, res) => {
  res.status(200).send("Posted!!");
});
// Listen Only For Development
app.listen(process.env.PORT, () => {
  console.log("Started!!");
});
// Deta Uses Exports
// module.exports = app;
