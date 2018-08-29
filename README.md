# stock-market-data

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
//   comp: "4.44",
//   dividend: "0.26",
//   earnings: "0.40",
//   cpi: "12.46",
//   dateFractionDecimal: "04",
//   dateFraction: "1871.04",
//   lir: "5.32",
//   realPrice: "88.27",
//   realDividend: "5.17",
//   realEarnings: "7.95",
//   cape: "NA"
// }
```

## Source

The information in this package was compiled by [Robert Shiller](http://www.econ.yale.edu/~shiller/bio.htm).

- [U.S. Stock Market Data](http://www.econ.yale.edu/~shiller/data.htm)

## Contributing

Looking to help out? Thank you! Refer to the [Contributing Guide](./CONTRIBUTING.md), which describes how
to update the data.