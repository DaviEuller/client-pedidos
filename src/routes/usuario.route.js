const express = require("express");

const route = express.Router();

const { listar, cadastrar } = require("../controllers/usuario.controllers.js");

route.get("/listar", listar);
route.post("/cadastrar", cadastrar);

module.exports = route;