require('dotenv').config({path: './.env'})
const express= require('express')

const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csurf = require('csurf')
const {meuMiddlewere, CheckCsrfError, csrfMiddlewere} = require('./src/middlewere/middlewere.js')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const sessionOptions = session({
    secret: 'asdkjfhaksjdfhaskjdfh',
    store: MongoStore.create({ mongoUrl: process.env.URL }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(meuMiddlewere)
app.use(csrfMiddlewere)
app.use(CheckCsrfError)
app.use(csurf())
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')
app.use(routes) 


mongoose.connect(process.env.URL)
.then(()=>{
    console.log('Conectado ao MongoDB')
    app.emit('pronto')
}).catch((err)=>{
    console.log('Erro ao conectar ao MongoDB', err)
})
app.on('pronto', ()=>{
    app.listen(3000, ()=>{
        console.log('Acessar http://localhost:3000')
        console.log('Acessar http://localhost:3000/login')
        console.log('Acessar http://localhost:3000/contato')
        console.log('Servidor executando na porta 3000')
    })
})



