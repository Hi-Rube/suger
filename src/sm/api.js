const path = require('path');

const localstorage = require('../localstorage');
const config = localstorage.get('global_config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('suger', null, null, {
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: path.join(process.cwd(), config.sm.db)
});

const ShortMessage = sequelize.define('ShortMessage', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    artical: {
        type: Sequelize.TEXT
    },
    time: {
        type: Sequelize.TIME
    },
    tag: {
        type: Sequelize.STRING
    }
});
ShortMessage.sync();

const responseError = (res) => {
    res.statusCode = 500;
    res.end();
};

module.exports = {
    post: function(req, res){
        const artical = req.body.artical;
        const tag = req.body.tag;
        const time = new Date().getTime();

        if (!artical){
            responseError(res);
        }

        ShortMessage.create({artical, time, tag})
        .then((shortMessage) => {
            res.json({
                success: true,
                data: {
                    artical,
                    tag,                    
                    time,
                    id: shortMessage.id
                }
            });
        })
        .error(() => {
            responseError(res);
        });
    },
    del: function(req, res){
        const id = req.body.id;

        if (!id){
            responseError(res);
        }

        ShortMessage.destroy({where: {id}})
        .then(() => {
            res.json({
                success: true,
                data: {
                    id
                }
            });
        })
        .error(() => {
            responseError(res);
        })
    },
    get: function(req, res){
        const limit = req.query.limit || 20;
        const offset = req.query.offset || 0;
        ShortMessage.findAll({limit, offset, order: [['createdAt', 'DESC']]})
        .then(result => {
            res.json({
                success: true,
                data: result || []
            });
        })
        .error(() => {
            responseError(res);
        });
    },
    put: function(req, res){
        const artical = req.body.artical;
        const tag = req.body.tag;
        const id = req.body.id;

        if (!artical || !id){
            responseError(res);
        }

        ShortMessage.update(tag ? {artical, tag} : {artical}, {where: {id}})
        .then(result => {
            res.json({
                success: true,
                data: {
                    id
                }
            });
        })
        .error(() => {
            responseError(res);
        });
    }
};