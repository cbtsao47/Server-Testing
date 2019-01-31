const express = require("express");
const configMiddleware = require("../config/middleware");
const server = express();

configMiddleware(server);

server.get("/", async (req, res) => {
  res.status(200).send("sanity check");
});

module.exports = server;
