const {Contato} = require('../models/ContatoModel')
exports.paginaInicial = async (req, res, next) => {
    const contatos = await Contato.findAll()
    res.render('index', {contatos})
}