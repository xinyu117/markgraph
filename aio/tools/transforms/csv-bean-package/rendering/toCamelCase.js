module.exports = function (toCamelCase) {
    return {
        name: 'toCamelCase',
        process: function (str) {
            return toCamelCase(str);
        }
    };
};