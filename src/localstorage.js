const fs = require('fs');
const store = {};

module.exports = {
    init: () => {
        //TODO (level: 2) load local /store config when init
    },
    set: (key, value) => {
        store[key] = value;
    },
    get: (key) => {
        return store[key]; 
    },
    setAndStoreInLocal: (key, value, path) => {
        //TODO (level: 2) put value in mem and cache in local /store dir
    }
};