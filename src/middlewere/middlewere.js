exports.meuMiddlewere = (req, res, next) =>{
    res.locals.umaVariavelLocal = 'Este é o valor da variável local';
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