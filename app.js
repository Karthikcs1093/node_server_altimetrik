const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const registerRoutes = require('./api/routes/register');
const loginRoutes = require('./api/routes/login');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"       
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
})

    // mongoose.connect(
    //     'mongodb+srv://express_shop:' + 
    //         process.env.MONGO_ATLAS_PWD + 
    //             '@cluster0-nhsic.mongodb.net/test?retryWrites=true&w=majority',
    //         {
    //             useNewUrlParser: true
    //         });
        const db = mongoose.connection;
console.log(db);
//db.once('open', () => console.log('Successfully connected to MongoDB'));
//db.on('error', (e) => console.log(e, "CSK"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use('/products', productRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use((error, req, res, next) => {
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;