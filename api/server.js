const express = require("express");
const configMiddleware = require("../config/middleware");
const server = express();
const db = require("../data/dbConfig");

configMiddleware(server);

server.get("/", async (req, res) => {
  res.status(200).send("sanity check");
});

server.get("/hobbits", async (req, res) => {
  const hobbits = await db("hobbits");
  console.log(hobbits);
  res.status(200).json(hobbits);
});

server.post("/hobbits", async (req, res) => {
  const newHobbit = req.body;
  const result = await db("hobbits").insert(newHobbit);
  res.status(200).json(result);
});

server.delete("/hobbits/:id", async (req, res) => {
  const { id } = req.params;
  const numberDeleted = await db("hobbits")
    .where({ id })
    .del();
  res.status(200).json(numberDeleted);
});
module.exports = server;
