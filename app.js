const process = require('process');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//if have selfdefine configure
let config = process.argv[2] ? require(path.join(__dirname, process.argv[2])) : require('./config');
const localstorage = require('./src/localstorage');
//put config in mem
localstorage.set('global_config', config);
//must import after config init
const router = require('./src/router');

const options = {
    extensions: ['htm', 'html'],
    index: 'index.html',
    maxAge: '1d',
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('suger-client/pages', options));
app.use('/static', express.static('suger-client/assets'));
router(app);
app.listen(config.server.port);
