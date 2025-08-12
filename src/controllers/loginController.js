const {Login} = require('../models/LoginModel');
exports.index= (req, res, next)=>{
    if(req.session.user) {
        return res.redirect('/');
    }
    return res.render('login',{
        csrfToken: req.csrfToken()
    })
}
exports.register = async (req, res, next)=>{
    try{
        const login = new Login(req.body)
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('/login');
            });
            return;
        }
        req.flash('success', 'Seu usuariao foi criado com sucesso');
            req.session.save(function(){
            return res.redirect('/login');
        });

        
    }catch(e){
        console.log(e)
        res.render('404', {error: 'Página não encontrada1'})
    }
   
}
exports.login = async (req, res, next)=>{
    try{
        const login = new Login(req.body)
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('/login');
            });
            return;
        }
        

        req.flash('success', 'Login realizado com sucesso');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('/');
        });


        
    }catch(e){
        console.log(e)
        res.render('404', {error: e})
    }   
}
exports.logout = function (req, res, next){
    req.session.destroy();
    res.redirect('/login');
}