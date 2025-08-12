exports.index = (req, res, next) => {
    res.render('contato', {
        csrfToken: req.csrfToken()
    });
}