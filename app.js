const express = require('express');
const DBconnection = require('./config/dbconn');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000
DBconnection();


//////////moddleware//////////
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

/////routes////////////////////
app.use('/', require('./routes/InviteRoute'));

app.listen(port, () => {
    console.log(`connected successful on port ${port}`);
})