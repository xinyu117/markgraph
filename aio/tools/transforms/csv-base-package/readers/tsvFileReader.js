module.exports = function tsvFileReader() {
    return {
      name: 'tsvFileReader',
      defaultPattern: /\.tsv$/,
      getDocs: function(fileInfo) {
        return [{docType: fileInfo.baseName + '-tsv', data: fileInfo.content}];
      }
    };
  };
  