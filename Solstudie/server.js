'use strict';
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
app.use(bodyParser.json());

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

app.post("/test", (req, res) => {
    console.log(req.body);
    console.log(req.body.answers);
    console.log(req.body.answers[0]);

    const ans = req.body.answers;

});

//ska vara sista av alla API-calls
app.get("/*", (req, res) => {
    res.sendFile(staticPath + '/index.html');
});

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});