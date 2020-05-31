var express = require('express');
var bodyParser = require("body-parser");
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path

var postPicture = require('./dlg/PostPicture');

app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-correlation-id, x-msg-id");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

// APIS
app.post('/:box/:collection/pictures', postPicture.do);

app.listen(8080, () => {
    console.log('[ uppics ] - Up and running');
});