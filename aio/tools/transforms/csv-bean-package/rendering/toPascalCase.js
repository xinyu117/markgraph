module.exports = function (toPascalCase) {
    return {
        name: 'toPascalCase',
        process: function (str) {
            return toPascalCase(str);
        }
    };
};