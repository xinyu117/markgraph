const Package = require('dgeni').Package;
const basePackage = require('dgeni-packages/base');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const path = require('canonical-path');

 const { PROJECT_ROOT } = require('../config');


module.exports = new Package('csv-base', [basePackage, nunjucksPackage]) 

    .factory(require('./services/csvToJson'))
    .factory(require('./services/tsvToJson'))
    .factory(require('./services/propertyToJson'))
    .factory(require('./services/toCamelCase'))
    .factory(require('./services/toPascalCase'))
    .factory(require('./readers/csvFileReader'))
    .factory(require('./readers/tsvFileReader'))
    .factory(require('./readers/propertyFileReader'))
    .processor(require('./processors/test'))

    .config(function (readFilesProcessor) {
        readFilesProcessor.basePath = PROJECT_ROOT;
        readFilesProcessor.fileReaders = [];
        readFilesProcessor.sourceFiles = [];
    })

    .config(function(computeIdsProcessor) {
        computeIdsProcessor.idTemplates.push({
          docTypes: ['csv-bean'],
          getId(doc) {
            let docPath = doc.name || doc.codeName;
            if ( !docPath ) {
              docPath = path.dirname(doc.fileInfo.relativePath);
              if ( doc.fileInfo.baseName !== 'index' ) {
                docPath = path.join(docPath, doc.fileInfo.baseName);
              }
            }
            return docPath;
          },
          getAliases(doc) {
            return [doc.id];
          }
        });
      })
      
      .config(function(computePathsProcessor) {
        computePathsProcessor.pathTemplates.push({
          docTypes: ['csv-bean'],
          pathTemplate: '${id}',
          outputPathTemplate: '${path}.java'
        });
      })
      ;