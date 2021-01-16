// Imports
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

// Static Files
app.use(express.static('public'))
app.use(express.bodyParser())
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(bodyParser.urlencoded({ extended: false }))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
  //res.sendFile(__dirname + '/views/index.ejs')
})

app.get('/signup', (req, res) => {
  res.render('signup')
  //res.sendFile(__dirname + '/views/index.ejs')
})

app.get('/login', (req, res) => {
  res.render('login')
  //res.sendFile(__dirname + '/views/index.ejs')
})

app.get('/result', (req, res) => {
  res.render('result')
  //res.sendFile(__dirname + '/views/index.ejs')
})

app.post('/result', function(req, res){
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  var account = {
    "email" : email,
    "username" : username,
    "password" : password
  }

  db.collection('details').insertOne(account,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('/result');
})

// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))
