const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const SOURCE_DIRECTORY = path.join(__dirname, '..');
const SOURCE_FILENAME = 'ie_data.csv';

const DESTINATION_DIRECTORY = path.join(
  __dirname,
  '..',
);
const DESTINATION_FILENAME = 'data.json';

const marketDataFileLoc = path.join(SOURCE_DIRECTORY, SOURCE_FILENAME);
const marketData = fs.readFileSync(marketDataFileLoc, 'utf-8');

const marketDataArray = marketData.split('\n').map(r => r.split(','));

// This is the array index of the CSV line that represents the header of the table
const HEADER_LINE = _.findIndex(marketDataArray, val => val[0] === 'Date');

// This is the first line that contains the market data (rather than headers/chart metadata)
const FIRST_DATA_LINE = HEADER_LINE + 1;

// The total number of rows that contain market data
const DATA_ROW_COUNT = marketDataArray.length - 1 - FIRST_DATA_LINE;

// This is a mapping that represents the names of the columns on the chart
const attributeNames = [
  { displayName: 'Date', key: 'date' },
  { displayName: 'S&P Comp. (P)', key: 'comp' },
  { displayName: 'Dividend (D)', key: 'dividend' },
  { displayName: 'Earnings (E)', key: 'earnings' },
  { displayName: 'Consumer Price Index (CPI)', key: 'cpi' },
  { displayName: 'Date Fraction', key: 'dateFraction' },
  { displayName: 'Long Interest Rate GS10', key: 'lir' },
  { displayName: 'Real Price', key: 'realPrice' },
  { displayName: 'Real Dividend', key: 'realDividend' },
  { displayName: 'Real Total Return Price', key: 'realTotalReturnPrice' },
  { displayName: 'Real Earnings', key: 'realEarnings' },
  { displayName: 'Real Total Return Scaled Earnings', key: 'realTotalReturnScaledEarnings' },
  {
    displayName: 'Cyclically Adjusted Price Earnings Ratio (P/E10) or (CAPE)',
    key: 'cape'
  }
];

// An array of the indices for every row in the chart containing data
const dataRows = _.times(DATA_ROW_COUNT, n => n + FIRST_DATA_LINE);

// This maps the data from being an array of values to an object of key-value pairs
const labeledData = _.chain(dataRows)
  .map(dataIndex => {
    const dataRow = marketDataArray[dataIndex];

    // This converts the array form of the row to be an object with keys mapped
    // to the `attributeNames` above
    const labeledRow = _.reduce(
      dataRow,
      (result, columnEntry, columnIndex) => {

        // Sometimes, Robert Shiller puts unstructured information in his data. This is an effort
        // to guard us against that.
        // One example is:
        //
        // ,Aug 2018 CPI is Aug 1 close,,,"July, Aug, 2018 CPI estimated",,Aug 2018 long rate is Aug 1 value,,,,
        //
        // Bob, we love ya, but ya ain't makin this easy!
        if (!attributeNames[columnIndex]) {
          return result;
        }

        // First, we get the "key" for this column from the attribute names array above
        const columnName = attributeNames[columnIndex].key;

        if (columnName === 'date' && columnEntry) {
          // For dates, we also store the month and year separately
          const dateInformation = columnEntry.split('.');
          result.year = dateInformation[0];
          result.month = dateInformation[1];
        } else if (columnName === 'dateFraction') {
          // The fraction contains the year as well, so we store an extra field that's just
          // the fractional value
          const fractionInformation = columnEntry.split('.');
          result.dateFractionDecimal = fractionInformation[1];
        }

        // '\r' appears in every CAPE column, so we swap that out
        result[columnName] = columnEntry.replace('\r', '');
        return result;
      },
      {}
    );

    // Sometimes, there are placeholder or empty rows. We check the date column
    // to see if that's the case
    const rowIsEmpty = Boolean(labeledRow.date);
    return rowIsEmpty ? labeledRow : null;
  })
  // Filter out empty rows, which are returned as `null` above
  .filter()
  .value();

// This stringified data is what we will store on the filesystem
const marketDataJson = JSON.stringify(labeledData);

// Ensure the destination directory exists
mkdirp.sync(DESTINATION_DIRECTORY);

// Lastly, save the transformed data
const destFileLoc = path.join(DESTINATION_DIRECTORY, DESTINATION_FILENAME);
fs.writeFileSync(destFileLoc, marketDataJson);

console.log(chalk.green(`Success! Market data created at: "${destFileLoc}"`));
