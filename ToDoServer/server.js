require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
var cors = require('cors')

app.use(cors())
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection


db.on('error', (err)=> console.log(err))
db.once('open', ()=> console.log('DB Opened successfull'))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use(express.json())

const users = require('./routes/users')
app.use("/users", users)



app.listen(8080, ()=> console.log('Server Started'))