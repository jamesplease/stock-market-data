# Calculating Stock Market Growth

Historically, the stock market has trended upward. You can calculate
the growth of the stock market between any two points of data in this dataset.

### Formula

The growth of the stock market is given by:

```
growth = (endCost / startCost) - 1
```

Where "cost" refers to the value of a share.

In this formula, growth will be a percentage. For instance, if
you compute a growth of 0.23, then you could say:

> "Over this time period, the stock market grew by 23%"

### Cost in this Dataset

The cost of a share of the S&P 500 is available under the `comp` key
in this dataset.

The following code snippet demonstrates how you can access the comp
for the first month in the dataset (which happens to be January 1971).

```js
import stockMarketData from 'stock-market-data';

// The cost of a share of the S&P 500 for the first month in the dataset
const firstCpi = stockMarketData[0].comp;
```

### Example

From the data, we can see that the `comp` in January 2015 was 1918.6, and the `comp` in
January 2016 was 2028.18.

Placing these values into the equation from above, we can compute the growth
over this period of time:

```
growth = (endCost / startCost) - 1
       = (2028.18 / 1918.6) - 1
       = 0.0571
```

Note that this is the decimal representation of the growth. To convert it to a percentage,
we must multiply this value by 100.

Once we do that, we get our result: the stock market grew by 5.71% between 2015 and 2016.
