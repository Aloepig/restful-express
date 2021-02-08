const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

let app = express();

console.log("-----------------------------------------");
console.log("[app.js] app.get('evn'): ", app.get('env'));
console.log("-----------------------------------------");

const https = require('https');
const httpsOptions = {
    key: fs.readFileSync(__dirname + '/ssl/test.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/test.crt')
}

https.createServer(httpsOptions, app).listen(443);


// CORS
switch (app.get('env')) {
    case "development":
        app.use(cors({
            origin: "192.168.0.107",
            credentials: true
        }));
        break;
    case "product":
        app.use(cors());
        break;
    default:
        break;
}

// ROUTER
const fintechRouter = {
    indexRouter: require('./routes/index'),
    usersRouter: require('./routes/users'),
    carsRouter: require('./routes/cars')
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', fintechRouter.indexRouter);
app.use('/users', fintechRouter.usersRouter);
app.use('/cars', fintechRouter.carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;