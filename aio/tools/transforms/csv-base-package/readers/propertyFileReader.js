module.exports = function propertyFileReader() {
    return {
      name: 'propertyFileReader',
      defaultPattern: /\.property$/,
      getDocs: function(fileInfo) {
        return [{docType: fileInfo.baseName + '-property', data: fileInfo.content}];
      }
    };
  };
  