module.exports = function propertyToJson() {
  return (data) => {
    let curSection = null;
    return data
      .split(/\r?\n/)
      .reduce(
        (obj, v) => {
          const section = /^\[([^=]+)]$/.exec(v);
          const property = !section && /^([^#=]+)(={0,1})(.*)$/.exec(v);
          if (section) {
            curSection = section[1].trim();
            obj[curSection] = {};
          } else if (property) {
            const values = /^([^#=]+)(={0,1})(.*)$/.exec(v);
            if (curSection) {
              obj[curSection][values[1].trim()] = values[3].trim();
            } else {
              obj[values[1].trim()] = values[3].trim();
            }
          }
          return obj;
        }, {}
      );
  };
};