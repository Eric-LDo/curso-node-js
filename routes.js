const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')

//Rotas do home
route.get('/', homeController.paginaInicial);
route.post('/',homeController.trataPost )

//Rotas contato
route.get('/contato', contatoController.paginaInicial)

//exports
module.exports = route