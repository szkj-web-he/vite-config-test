module.exports = () => ({
    plugins: [
        [
            'postcss-preset-env',
            {
                browsers: 'cover 99%',
                stage: 3,
                minimumVendorImplementations: 2,
                autoprefixer: true,
            },
        ],
    ],
});
