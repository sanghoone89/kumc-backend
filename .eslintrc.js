const path = require('path');

module.exports = {
    "extends": "airbnb",
    "settings":{
        "import/resolver": {
            node: { paths: [path.resolve('./src')]}
        }
    },
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "rules": {
        "no-unused-vars": 1,
        "comma-dangle": 0,
        "eol-last": 0,
        "no-console": 0
    }
};