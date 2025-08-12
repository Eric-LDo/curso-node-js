const { Contato } = require('../models/ContatoModel')
exports.index = (req, res, next) => {
    res.render('contato', {
        csrfToken: req.csrfToken()
    });
}
exports.register = async (req, res, next) => {
    
    try {
    const contato = new Contato(req.body);
    console.log(contato)
    await contato.register();
    console.log('2')
    if(contato.errors.length) {
        req.flash('errors', contato.errors);
        return res.redirect('/contato');
    }
    req.flash('success', 'Contato registrado com sucesso');
    res.redirect('/contato');
    } catch (error) {
        console.log(error)
        return res.render('404', {error: 'Página não encontrada'});
        
    }
}