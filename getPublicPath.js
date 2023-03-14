const command = require('./src/Assets/js/command');
const getPublicPath = () => {
    if (command.isProV1) {
        return '/v1/dev/';
    }
    if (command.isProV2) {
        return '/v2/dev/';
    }
    if (command.isTestV1) {
        return '/v1/test/';
    }
    if (command.isTestV2) {
        return '/v2/test/';
    }

    return '/';
};

module.exports = getPublicPath;
