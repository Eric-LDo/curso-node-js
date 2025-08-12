exports.meuMiddlewere = (req, res, next) =>{
    console.log('Sessão:', req.session.user); // Veja se está vindo o usuário
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