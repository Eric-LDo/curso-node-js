const { Contato } = require('../models/ContatoModel')
exports.index = (req, res) => {
    res.render('contato', {
        csrfToken: req.csrfToken(),
        contato:{}
    });
}
exports.register = async (req, res) => {
    
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
exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404', {error: 'Página não encontrada'});
    const contato = await Contato.findById(req.params.id)
    if(!contato) return res.render('404', {error: 'Página não encontrada'});
    res.render('contato', {
        csrfToken: req.csrfToken(),
        contato: contato
    });
}
exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404', {error: 'Página não encontrada'});
    try {
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if(contato.errors.length) {
            req.flash('errors', contato.errors);
            return res.redirect(`/contato/${req.params.id}`);
        }
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(() => {
            res.redirect(`/contato/${req.params.id}`);
        });
    } catch (error) {
        console.log(error)
        return res.render('404', {error: 'Página não encontrada'});
    }
}
exports.delete = async (req, res, next) => {
    if(!req.params.id) return res.render('404', {error: 'Página não encontrada'});
    try {
        const contato = await Contato.findById(req.params.id);
        if(!contato) return res.render('404', {error: 'Página não encontrada'});
        await Contato.delete(contato.id);
        req.flash('success', 'Contato excluído com sucesso');
        req.session.save(() => {
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
        return res.render('404', {error: 'Página não encontrada3'});
    }
}
