const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const XLSX = require('xlsx');

const SOURCE_DIRECTORY = path.join(__dirname, '..');
const SOURCE_FILENAME = 'ie_data.xls';

const DESTINATION_DIRECTORY = path.join(__dirname, '..');
const DESTINATION_FILENAME = 'data.json';

const sourceFileLoc = path.join(SOURCE_DIRECTORY, SOURCE_FILENAME);
const workbook = XLSX.readFile(sourceFileLoc, {
  raw: true,
});

var first_sheet_name = workbook.SheetNames[4];
var worksheet = workbook.Sheets[first_sheet_name];

// This map is largely a hold-over from a previous build script. As you'll see below,
// all that's currently used is an array of the `key` entries.
const attributeNames = [
  { displayName: 'A', key: 'date' },
  { displayName: 'B', key: 'comp' },
  { displayName: 'C', key: 'dividend' },
  { displayName: 'D', key: 'earnings' },
  { displayName: 'E', key: 'cpi' },
  { displayName: 'F', key: 'dateFraction' },
  { displayName: 'G', key: 'lir' },
  { displayName: 'H', key: 'realPrice' },
  { displayName: 'I', key: 'realDividend' },
  { displayName: 'J', key: 'realTotalReturnPrice' },
  { displayName: 'K', key: 'realEarnings' },
  {
    displayName: 'L',
    key: 'realTotalReturnScaledEarnings',
  },
  {
    displayName: 'M',
    key: 'cape',
  },
  {
    displayName: 'N',
    key: 'blank001',
  },
  {
    displayName: 'O',
    key: 'trCape',
  },
  {
    displayName: 'P',
    key: 'blank002',
  },
  {
    displayName: 'Q',
    key: 'blank003',
  },
  {
    displayName: 'R',
    key: 'monthlyTotalBondReturns',
  },
  {
    displayName: 'S',
    key: 'bondReturns',
  },
  {
    displayName: 'T',
    key: '10yrAnnualizedStockRealReturns',
  },
  {
    displayName: 'U',
    key: '10yrAnnualizedondsRealReturns',
  },
  {
    displayName: 'V',
    key: '10yrExcessAnnualizedReturns',
  },
];

const keys = attributeNames.map((attr) => attr.key);

var labeledData = XLSX.utils.sheet_to_json(worksheet, {
  header: keys,
  raw: true,
});

if (labeledData.length < 1800) {
  console.error(
    `[Error] Expected more rows. The format of the data may have changed. Please check the spreadsheet.`
  );
  process.exit(1);
}

const parsedData = _.chain(labeledData)
  .filter((data) => typeof data.date === 'number')
  .map((data) => {
    const dateString = String(data.date);
    const dateInformation = dateString.split('.');

    const numericYear = Number(dateInformation[0]);
    const stringMonth = dateInformation[1];

    // "01" = the first month
    // "1"  = the tenth month
    // Bob is really trying to kill us
    let numericMonth;
    if (stringMonth === '01') {
      numericMonth = 1;
    } else if (stringMonth === '1') {
      numericMonth = 10;
    } else {
      numericMonth = Number(stringMonth);
    }

    if (Number.isNaN(numericYear) || Number.isNaN(numericMonth)) {
      console.error(
        'There was an error while parsing the date of this data set. The format of the CSV may have changed.'
      );
      process.exit(1);
    }

    const fractionInfoString = String(data.dateFraction);
    const fractionInformation = fractionInfoString.split('.');
    const numericFractionInformation = Number(`.${fractionInformation[1]}`);

    return _.defaults(
      {
        ...data,
        cape: data.cape === 'NA' ? null : data.cape,
        dateFractionDecimal: numericFractionInformation,
        month: numericMonth,
        year: numericYear,
      },
      {
        dividend: null,
        realDividend: null,
        earnings: null,
        realEarnings: null,
        realTotalReturnScaledEarnings: null,
      }
    );
  })
  .value();

const marketDataJson = JSON.stringify(parsedData);

mkdirp.sync(DESTINATION_DIRECTORY);
const destFileLoc = path.join(DESTINATION_DIRECTORY, DESTINATION_FILENAME);

fs.writeFileSync(destFileLoc, marketDataJson);
console.log(chalk.green(`Success! Market data created at: "${destFileLoc}"`));
