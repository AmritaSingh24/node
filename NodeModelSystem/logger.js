var url = 'https://mylogger.io/log';
function log(message) {
    console.log(message);
}

module.exports.log = log;
module.exports.endPoint = url;