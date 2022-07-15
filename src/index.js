const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { dirname } = require('path');
const exp = require('constants');

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// Middlewares
//app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(passport.initialize());
//app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    
    next();
})

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/inicio'));


// Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Servidor en el puerto', app.get('port'))
})