//'use strict';
const log = console.log


const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/img", express.static(__dirname + '/public/img'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

const localhost ="http://localhost:3000";
// const router = express.Router();
// app.use('/', router);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/refillPage.html');
})

app.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '/public/calendar.html');
})



app.post('/index/auth', (req, res) => {
    if (req.body.uname === "user" && req.body.pwd === "user") {
        return res.redirect('/calendar');
    } else {
        res.status(400).sendFile(__dirname + '/public/refillPage.html');
    }
    //next();

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))