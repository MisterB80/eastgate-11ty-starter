const path = require('path');
module.exports = {
    entry: ['./src/site/scripts/navigation.js'],
    output: {
        path: path.resolve(__dirname, 'dist/scripts'),
        filename: 'main.js'
    }
};