module.exports = function csvFileReader(csvToJson) {
    return {
      name: 'csvFileReader',
      defaultPattern: /\.csv$/,
      getDocs: function(fileInfo) {
        return [{docType: 'csv', data: csvToJson(fileInfo.content)}];
      }
    };
  };
  