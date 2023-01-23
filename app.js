const express = require('express')
const logger = require('morgan');
const session=require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: "config.env" })


const port = process.env.PORT
const path = port

var db=require('./config/database')

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

const app = express()

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use(session({
    secret:'Key',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:6000000}
  }))

app.use('/admin', adminRouter);
app.use('/', usersRouter);
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
