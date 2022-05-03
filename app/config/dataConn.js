const fs = require('fs');

var pass = fs.readFileSync('./password.txt').toString();
const hostname = '127.0.0.1';

module.exports = {
    HOST: hostname,
    USER: "root",
    PASSWORD: pass,
    DB: "eshop"
};