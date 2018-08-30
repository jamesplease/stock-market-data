# Calculating Dividend Yield

The "dividend yield" is the dividend expressed as a percentage of the
current share price.

### Formula

From the definition of a dividend yield, we can derive the formula:

```
dividendYield = dividend / shareCost
```

In this formula, the result will be a percentage expressed as a decimal value. For instance,
if you compute a dividend yield of 0.012, you could say:

> "For this particular year, the dividend yield was 1.2%"

### Cost in this Dataset

The cost of a share of the S&P 500 is available under the `comp` key
in this dataset, and the dividend is available under the `dividend`
key.

The following code snippet demonstrates how you can access these values
for the first month in the dataset (which happens to be January 1971).

```js
import stockMarketData from 'stock-market-data';

// The cost of a share of the S&P 500 for the first month in the dataset
const sharePrice = stockMarketData[0].comp;
// The dividends, in USD, for the S&P 500 for the first month in the dataset
const dividend = stockMarketData[0].dividend;
```

### Example

Let's look at January 2018. The value of `dividend` is 49.29, and the value of
`comp` is 2789.8.

```
dividendYield = dividend / shareCost
              = 49.29 / 2789.8
              = 0.0177
```

Note that this is the decimal representation of the dividend yield. To convert it to a percentage,
we must multiply this value by 100.

Once we do that, we get our result: the dividend yield for January 2018 was 1.77%.
