module.exports = function toPascalCase() {
    return (str) => {
        const s = str &&
        str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join('');
        return s;
    };
  };