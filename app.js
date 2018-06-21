let createError = require('http-errors');


let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let http = require('http');
let i18n = require("i18n");


// 導入路徑執行檔
let indexRouter = require('./routes/index');
let signupRouter = require('./routes/signup');
let loginRouter = require('./routes/login');
let logoutnRouter = require('./routes/logout');
let userRouter = require('./routes/user');
let languageRouter = require('./routes/language');
let app = express();





// 連接mongoDB資料庫
mongoose.connect('mongodb://shopping:mongo@192.168.1.76:2717/shopping-car');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());   //json格式
// app.use(bodyParser.urlencoded({extended: true}));  //url編碼處理



i18n.configure({
    locales:['en', 'zh-tw'],
    directory: path.join(__dirname, 'locales'),
    cookie: 'locale',
    defaultLocale: 'en'
});

app.use(i18n.init);


app.use(session({
    secret: 'Hello',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 300 * 1000} //5分鐘到期
}));


app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutnRouter);
app.use('/user', userRouter);
app.use('/language', languageRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// 設定連線
app.set('port', '8080');
let server = http.createServer(app);

// 啟動伺服器
server.listen(8080);


module.exports = app;
