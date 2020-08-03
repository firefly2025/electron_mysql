var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var xmlparser = require('express-xml-bodyparser');

var favicon = require('serve-favicon');
var path = require("path");
var assert = require('assert');
var colors = require('colors');



process.on('uncaughtException', function(e) {
    console.log("server on error");　　
    console.log(e);
});

app.use(favicon(__dirname + '/web/favicon.ico'));
app.use(cookieParser());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());
app.use(xmlparser());
app.disable('x-powered-by');

function logErrors(err, req, res, next) {
    console.warn("logErrors");
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.sendWrap(500, {
            error: 'Something blew up!'
        });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    console.warn("error handler catch err", err);
    res.status(500);
    res.end();
}



process.on('exit', function() {　　
    console.log('server exit!');　　
    console.log('Bye.');
});

process.on('uncaughtException', function(e) {
    console.warn("server on uncaughtException");
    console.log(e);
});


app.use("/web/", express.static(__dirname + "/web/")); //服务处理程序 handler

var host = "127.0.0.1";
var host = "0.0.0.0";
var port = "80";

console.log("启动成功 listen host=[" + host + "] on port=[" + port + "]");
app.listen(port, host);