const Package = require('dgeni').Package;
const basePackage = require('../csv-base-package');
const testPackage = require('../test-package');

const { CONTENTS_PATH, TEMPLATES_PATH, DOCS_OUTPUT_PATH, requireFolder } = require('../config');


module.exports = new Package('csv-bean', [ testPackage, basePackage])

    .processor(require('./processors/computeField'))

    .config(function (readFilesProcessor, csvFileReader, tsvFileReader, propertyFileReader) {
        readFilesProcessor.fileReaders.push(csvFileReader);
        readFilesProcessor.fileReaders.push(tsvFileReader);
        readFilesProcessor.fileReaders.push(propertyFileReader);
        readFilesProcessor.sourceFiles = readFilesProcessor.sourceFiles.concat([
            {
                basePath: CONTENTS_PATH,
                include: CONTENTS_PATH + '/{csv1,csv2}/**/*.csv',
                fileReader: 'csvFileReader'
            },
            {
                basePath: CONTENTS_PATH,
                include: CONTENTS_PATH + '/csv1/dict.tsv',
                fileReader: 'tsvFileReader'
            },
            {
                basePath: CONTENTS_PATH,
                include: CONTENTS_PATH + '/csv1/dict.property',
                fileReader: 'propertyFileReader'
            }
        ]);

    })

    // Where do we write the output files?
    .config(function (writeFilesProcessor) { writeFilesProcessor.outputFolder = DOCS_OUTPUT_PATH; })


    // Configure nunjucks rendering of docs via templates
    .config(function (templateFinder, templateEngine, getInjectables) {

        // Where to find the templates for the doc rendering
        templateFinder.templateFolders = [TEMPLATES_PATH];

        // Standard patterns for matching docs to templates
        templateFinder.templatePatterns = [
          //  'bean.template.java', // Ebean用的DTO
            'bean2.template.java'   // 标准Java Bean
        ];

        // Nunjucks and Angular conflict in their template bindings so change Nunjucks
        templateEngine.config.tags = { variableStart: '{$', variableEnd: '$}' };

        templateEngine.filters =
            templateEngine.filters.concat(getInjectables(requireFolder(__dirname, './rendering')));
    })





    ;
