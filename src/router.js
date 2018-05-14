const feedlyApi = require('./feedly/api');
const ib = require('./issue-blog/api');
const sm = require('./sm/api');

module.exports = (app) => {
    app.get('/feedly/:operate', (req, res) => {
        const operate = req.params.operate;
        feedlyApi[operate] && feedlyApi[operate](req, res);
    });

    app.get('/ib/:operate', (req, res) => {
        const operate = req.params.operate;
        ib[operate] && ib[operate](req, res);
    });

    //shortMessage
    app.post('/sm/post', (req, res) => {
        sm.post(req, res);
    });
    app.get('/sm/get', (req, res) => {
        sm.get(req, res);
    });
    app.post('/sm/put', (req, res) => {
        sm.put(req, res);
    });
    app.post('/sm/del', (req, res) => {
        sm.del(req, res);
    });
};