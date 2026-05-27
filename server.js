require('dotenv').config();
const express = require('express');
const cors = require("cors");
const usuarioRoute = require("./src/routes/usuario.route.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/usuario", usuarioRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
