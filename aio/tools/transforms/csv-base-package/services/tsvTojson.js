module.exports = function tsvToJson() {
  return (data) => {
    return data
      .split(/\r?\n/)
      .reduce(
        (obj, v) => {
          const values = /^([^#=]+)(={0,1})(.*)$/.exec(v);
          obj[values[1].trim()] = values[3].trim();
          return obj;
        }, {}
      );
  };
};