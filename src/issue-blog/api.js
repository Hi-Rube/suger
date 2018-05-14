const request = require('request');
const localstorage = require('../localstorage');

const requestGithubIssueApi = (req, res) => {
    const globalConfig = localstorage.get('global_config');
    const {userName, blogRepo, token} = globalConfig.github;
    request({
        url: `https://api.github.com/repos/${userName}/${blogRepo}/issues`,
        headers: {
            Authorization: token,
            'User-Agent': 'suger'
        },
        qs: req.query
    }, (error, response,  body)=>{
        if (!error && response.statusCode == 200) {
            res.json(body);
        } else {
            res.statusCode = 500;
            res.end();
        }
    });
};

module.exports = {
    articals: (req, res) => {
        requestGithubIssueApi(req, res);
    },
    publish: (req, res) => {
    },
    update: (req, res) => {
    },
    remove: (req, res) => {
    }
};