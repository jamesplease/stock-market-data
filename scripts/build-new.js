const _ = require('lodash');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./ie_data.xls', {
  raw: true,
});
var first_sheet_name = workbook.SheetNames[4];
var worksheet = workbook.Sheets[first_sheet_name];

var js = XLSX.utils.sheet_to_json(worksheet, {
  header: 'A',
  raw: true,
});

console.log(
  'hi',
  _.find(js, {
    A: 1990.12,
  })
);
