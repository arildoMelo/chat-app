
require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname, '../public');


var app = express();

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server running on port: %d', port);
});

