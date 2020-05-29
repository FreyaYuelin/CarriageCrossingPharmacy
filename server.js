//'use strict';
const log = console.log


const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'nexus',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/img", express.static(__dirname + '/public/img'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/refillPage.html');
})

app.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '/public/calendar.html');
})


app.post('/index/auth', (req, res) => {
    return res.redirect('/calendar');
    // res.status(400).redirect('/');
    // if (req.body.uname === "user" && req.body.pwd === "user") {
    //     return res.redirect('/calendar');
    // } else {
    //     res.status(400).redirect('/');
    // }

})
// var queryString = "INSERT INTO appointments(email, date, start, finish, option, considerations, address, phone)values('john123@gmail.com', '050220', '13:30', '14:00', '2', 'no special considerations', '6955 Fielding', '123-456-7890')"
// pool.query(queryString, (err, resp) => {
//     log(err, resp);
//     pool.end();
// })

  //[req.body.email, req.body.name, req.body.start, req.body.finish, req.body.option, req.body.considerations, req.body.address, req.body.phone], (err, resp) => {
app.post('/appointment', (req, res) => {
  //var queryString = 'INSERT INTO appointments(email, date, start, finish, option, considerations, address, phone, lastname) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)'

})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))