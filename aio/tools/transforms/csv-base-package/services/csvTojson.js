module.exports = function csvToJson() {
  return (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
      .slice(data.indexOf('\n') + 1)
      .split(/\r?\n/)
      .map(v => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj, title, index) => ((obj[title.trim()] = values[index].trim()), obj), {}
        );
      });
  };
};