var express = require('express');
var bodyParser = require("body-parser");
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

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

app.route('/pictures').post(function (req, res, next) {

    var fstream;

    req.pipe(req.busboy);

    req.busboy.on('file', (fieldname, file, filename) => {

        let dir = __dirname + '/app-docs';

        fs.ensureDirSync(dir);

        fstream = fs.createWriteStream(dir + '/' + filename);

        file.pipe(fstream);

        fstream.on('close', () => {
            res.status(201).type('application/json').send({
                pictureId: 'as9d0a8s9d0a8s9d8as'
            })
        });

    });
});

app.listen(8080, () => {
    console.log('[ oh-ms-picture ] - Up and running');
});