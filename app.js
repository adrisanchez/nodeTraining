const http = require('http');

const routes = require('./routes');

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('In the middleware');
    next(); //After this, the request will continue to the next middleware
});

app.use((req, res, next) => {
    console.log('In another middleware');
});
http.createServer(app).listen(3000);
