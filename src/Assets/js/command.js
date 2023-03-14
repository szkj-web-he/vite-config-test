const command = process.argv[process.argv.length - 1];
// 获取指令
module.exports = {
    isDev: command.startsWith('dev'),
    isPro: command === 'build',
    isProV1: command.startsWith('build-v1'),
    isProV2: command.startsWith('build-v2'),
    isTestV1: command.startsWith('build-test-v1'),
    isTestV2: command.startsWith('build-test-v2'),
    isAnalysis: command.includes('analysis'),
};
