exports.meuMiddlewere = (req, res, next) =>{

    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user =  req.session.user;
    next();
    
}
exports.CheckCsrfError = (err, req, res, next) =>{
    if(err && err.code === 'EBADCSRFTOKEN' && req.csrfToken) {
        return res.render('404.ejs', {
            error: err
        })
    }
    next();
}
exports.csrfMiddlewere = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken()
    next()
}
exports.loginRequired = (req, res, next) =>{
    if(!req.session.user) {
        req.flash('errors', 'Você precisa estar logado para acessar esta página.')
        req.session.save(function() {
            return res.redirect('/login');
        })
        return;
    }
    next();
}