const HomeModel = require('../models/HomeModel')



module.exports.paginaInicial = (req, res, next) => {
    res.render('index',{
        titulo: 'Este será o título da página',
        numeros: [1,2,3,4,5,6,7,8,9,10],
        csrfToken: req.csrfToken()
    })
    return
}

module.exports.trataPost = (req, res, next) =>{
    res.render('home',{
        umaVariavelLocal: req.body.cliente
    })
    return

} 