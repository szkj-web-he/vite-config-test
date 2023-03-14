import command from './src/Assets/js/command';
const setNodeEnvValue = () => {
    if (command.isDev) {
        return 'development';
    }

    if (command.isProV1) {
        return 'v1_dev';
    }
    if (command.isProV2) {
        return 'v2_dev';
    }
    if (command.isTestV1) {
        return 'v1_test';
    }
    if (command.isTestV2) {
        return 'v2_test';
    }

    if (command.isPro) {
        return 'production';
    }

    return 'none';
};

module.exports = setNodeEnvValue;
