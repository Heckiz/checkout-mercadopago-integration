const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const morgan = require('morgan');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
       defaultLayout: 'main',
       layoutsDir: path.join(app.get('views'), 'layouts'),
       partialsDir: path.join(app.get('views'), 'partials'),
       extname: '.hbs',
      
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({type: "application/json"}));


//Statics Files
app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));

//Routes
app.use(require('./routes/index.routes'));
app.use('/payment',require('./routes/payment.routes'));


app.listen(app.get('port'), ()=>{
    console.log('server on port ' + app.get('port'));
})