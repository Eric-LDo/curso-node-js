const Login = require('../models/LoginModel');
exports.index= (req, res, next)=>{
    res.render('login', {
        csrfToken: req.csrfToken()
    })
}
exports.register = (req, res, next)=>{
    const login = new Login(req.body)
   res.send(login.body)
}