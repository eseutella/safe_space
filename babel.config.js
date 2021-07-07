module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            [
                'babel-preset-expo',
                {
                    web: { disableImportExportTransform: false }
                }
            ]
        ],
        plugins: [
            ["module:react-native-dotenv", {
                "moduleName": "@env",
                "path": ".env"
            }]
        ]
    };
};