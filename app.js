//express for modulus.io
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

app.listen(process.env.PORT || 3000);