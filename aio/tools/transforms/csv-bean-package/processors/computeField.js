module.exports = function computeField(toCamelCase, toPascalCase, tsvToJson, propertyToJson) {

  function createBeanProperty(item, fieldMapping) {
    const obj = {};
    obj.property = toCamelCase(item.name);
    const type = item.type;  // db define csv
    const key = Object.keys(fieldMapping).find(key => type.indexOf(key) > -1); //mapping csv
    
    const javaType = fieldMapping[key];
    obj.type = javaType;
    const mtcher = new RegExp('^(' + key + ')\\({0,1}(\\d*)\\){0,1}');
    const values = mtcher.exec(type);
    if (values) {
      obj.type_length = values[2];
    }
    return obj;
  }

  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['computeIdsProcessor'],
    fieldMapping: {

    },
    $process(docs) {
      const beanDocs = [];
      this.fieldMapping = tsvToJson(docs.find(doc => doc.docType === 'dict-tsv').data);
      this.fieldMapping2 = propertyToJson(docs.find(doc => doc.docType === 'dict-property').data);
      docs.filter(doc => {
        if (doc.docType !== 'csv') return true;
        const rowList = doc.data;
        const newObj = {
          docType: 'csv-bean',
          fileInfo: doc.fileInfo,
          className: toPascalCase(doc.fileInfo.baseName),
          data: []
        };
        rowList.forEach((row) =>
          newObj.data.push(createBeanProperty(row, this.fieldMapping))
        );

        beanDocs.push(newObj);

      });
      return docs.concat(beanDocs);
    }
  };

};

  // function findKey(obj, fn) {
  //   const key = Object.keys(obj).find(key => fn(obj[key], key, obj));
  //   return obj[key];
  // }

