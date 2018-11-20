function getSheetName() {
  var ss = SpreadsheetApp.openById("1LDGUT7iqbDIBIXxi7XgTp8y9MXq2V9zpQXB3A3LwSVw");
  Logger.log('getSheetName(): ' + ss.getName());
  
  
  var sheet = ss.getSheets()[0];
  // When the "numRows" argument is used, only a single column of data is returned.
  var range = sheet.getRange(ss.getLastRow()+1, 1, 1, 2);
  var values = range.getValues();

  // Prints 3 values from the first column, starting from row 1.
  for (var row in values) {
  for (var col in values[row]) {
    Logger.log('getSheetName(): ' + values[row][col]);
   
  }
  
}
  // The two samples below produce the same output
  var values = sheet.getSheetValues(1, 1, 3, 3);
  Logger.log('getSheetName(): ' + values);

  var range = sheet.getRange(1, 1, 3, 3);
  values = range.getValues();
  Logger.log('getSheetName(): ' + values);
  
}


