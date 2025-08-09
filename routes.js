const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

//Rotas do home
route.get('/', homeController.paginaInicial);

//Rotas Login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);

//exports
module.exports = route