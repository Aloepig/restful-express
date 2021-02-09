const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    fs = require('fs');

let app = express();

console.log("-----------------------------------------");
console.log("[app.js] app.get('evn'): ", app.get('env'));
console.log("-----------------------------------------");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // content-type: application/json 가능
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HTTPS
const https = require('https'),
    httpsOptions = {
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
    case "production":
        app.use(cors());
        break;
    default:
        app.use(cors());
        break;
}

// PASSPORT
const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    LocalStrategy = require('passport-local'),
    OAuth2Strategy = require('passport-oauth2');

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'passwd'
//     },
//     function(username, password, done) {
//         if (username !== "sample@fintech1.co.kr") {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (password !== "fintech") {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         console.log(done)
//         return done();
//     }
// ));

const EXAMPLE_CLIENT_ID = "fintech1";
const EXAMPLE_CLIENT_SECRET = "12345";

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://www.example.com/oauth2/authorize',
        tokenURL: 'https://www.example.com/oauth2/token',
        clientID: EXAMPLE_CLIENT_ID,
        clientSecret: EXAMPLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/example/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ exampleId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/example',
    passport.authenticate('oauth2'));

app.get('/auth/example/callback',
    passport.authenticate('oauth2', { successRedirect: '/', failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


// Auth server
let oauth2orize = require('oauth2orize');
let server = oauth2orize.createServer();
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
    var code = utils.uid(16);

    var ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope);
    ac.save(function(err) {
        if (err) { return done(err); }
        return done(null, code);
    });
}));
app.get('/dialog/authorize',
    login.ensureLoggedIn(),
    server.authorize(function(clientID, redirectURI, done) {
        Clients.findOne(clientID, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.redirectUri != redirectURI) { return done(null, false); }
            return done(null, client, client.redirectURI);
        });
    }),
    function(req, res) {
        res.render('dialog', {
            transactionID: req.oauth2.transactionID,
            user: req.user,
            client: req.oauth2.client
        });
    });

// ROUTER
const fintechRouter = {
    indexRouter: require('./routes/index'),
    usersRouter: require('./routes/users'),
    carsRouter: require('./routes/cars'),
    testsRouter: require('./routes/tests')
}

app.post('/login',
    passport.authenticate('oauth2', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.use('/', fintechRouter.indexRouter);
// app.use('/*', passport.authenticate('local'), function(req, res, next) {
//     next();
// });
app.use('/users', fintechRouter.usersRouter);
app.use('/cars', fintechRouter.carsRouter);
app.use('/tests', fintechRouter.testsRouter)



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