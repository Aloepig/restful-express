const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Router 설정
const fintechRouter = {
    "dev": {
        "indexRouter": require('./routes/index'),
        "userRouter": require('./routes/users'),
        "carsRouter": require('./routes/cars')
    },
    "product": {

    }
};

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

switch (app.get('env')) {
    case "development":
        break;
    case "product":
        break;
    default:
        break;
}

console.log("--------------------------");
console.log("NODE_ENV: ", app.get('env'));
console.log("--------------------------");

// CORS 설정
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/cars', carsRouter);

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