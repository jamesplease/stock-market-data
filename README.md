# stock-market-data

[![npm version](https://img.shields.io/npm/v/stock-market-data.svg)](https://www.npmjs.com/package/stock-market-data)

U.S. Stock Market data from Robert Shiller.

## Installation

Install using [npm](https://www.npmjs.com):

```
npm install stock-market-data
```

or [yarn](https://yarnpkg.com/):

```
yarn add stock-market-data
```

## Usage

The main export of this module is an array of stock market data. Each object
in the array is an object that represents a single month of market data.

The earliest year represented is 1871.

```js
import stockMarketData from 'stock-market-data';

console.log(stockMarketData[0]);
// {
//   year: "1871",
//   month: "01",
//   date: "1871.01",
//   dateFractionDecimal: "04",
//   dateFraction: "1871.04",
//   comp: "4.44",
//   dividend: "0.26",
//   earnings: "0.40",
//   cpi: "12.46",
//   lir: "5.32",
//   realPrice: "88.27",
//   realDividend: "5.17",
//   realEarnings: "7.95",
//   cape: "NA"
// }
```

## Data

The following table goes into more detail about the individual data points provided for each month.

| Key                 | Description                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| year                | The year, as a string                                                                                                            |
| month               | The month, as a string. `"01"` is January, `"12"` is December.                                                                   |
| date                | Another string representation of the date for this month of data in the format `{year}.{month}`                                  |
| dateFractionDecimal | Another string representation of the date for this month of data in the format `{year}.{completionPercentOfYear}`                |
| dateFraction        | Another string representation of the date for this month of data. This value represents the completion of the year as a percent. |
| comp                | The cost of a single share of the S&P 500                                                                                        |
| dividend            | Dividends paid, in USD                                                                                                           |
| earnings            | Earnings per share                                                                                                               |
| cpi                 | The value of the Consumer Price Index (CPI)                                                                                      |
| lir                 | "Long Interest Rate (GS10)" (I am not sure what this is)                                                                         |
| realPrice           | Inflation adjusted `comp` (compared against the last month in the dataset)                                                       |
| realDividend        | Inflated adjusted `dividend` (compared against the last month in the dataset)                                                    |
| realEarnings        | Inflation adjusted `earnings` (compared against the last month in the dataset)                                                   |
| cape                | "Cyclically Adjusted Price Earnings Ratio" (I am not sure what this is)                                                          |

## Source

The information in this package was compiled by [Robert Shiller](http://www.econ.yale.edu/~shiller/bio.htm). To
learn more about how this information is collected, refer to the link below.

- [U.S. Stock Market Data](http://www.econ.yale.edu/~shiller/data.htm)

## Contributing

Looking to help out? Thank you! Refer to the [Contributing Guide](./CONTRIBUTING.md), which describes how
to update the data.
