const request = require('request');
const localstorage = require('../localstorage');

const requestFeedlyApi = (api, req, res) => {
    const globalConfig = localstorage.get('global_config');
    const secret = globalConfig.feedly.secret;
    request({
        url: `https://cloud.feedly.com/v3/${api}`,
        headers: {
            Authorization: secret
        },
        qs: req.query
    }, (error, response,  body)=>{
        if (!error && response.statusCode == 200) {
            res.json(body);
        } else {
            res.statusCode = 500;
        }
    });
}

module.exports = {
    /**
     * get all categories
     */
    categories: (req, res) => {
        requestFeedlyApi('categories', req, res);
    },
    /**
     * get all subscriptions feed at categories
     */
    subscriptions: (req, res) => {
        requestFeedlyApi('subscriptions', req, res);
    },
    /**
     * get artical list at feed
     */
    articals: (req, res) => {
        requestFeedlyApi('streams/contents', req, res);
    }
};