# Calculating Inflation

Inflation is the tendency for a currency to decrease in value over time.

Because inflation represents a change over time, it requires two data
points to be calculated: a start and an end.

> To learn more about inflation, refer to [**this guide**](https://hearth-app.com/guides/inflation).

### Formula

Inflation is derived from the [Consumer Price Index](https://www.investopedia.com/terms/c/consumerpriceindex.asp),
or CPI, of two moments in time. The formula for inflation is:

```
inflation = endCpi / startCpi
```

### CPI in this Dataset

The Consumer Price Index is available under the `cpi` key.

The following code snippet demonstrates how you can access the CPI
for the first month in the dataset (which happens to be January 1971).

```js
import stockMarketData from 'stock-market-data';

// The CPI of the first month in the dataset
const firstCpi = stockMarketData[0].cpi;
```

### Example

From the data, we can see that the CPI in January 1971 was 12.46, and the CPI in
January 2018 was 49.28.

Placing these values into the equation from above, we can compute the inflation
in this period of time:

```
inflation = endCpi / startCpi
          = 49.28  / 12.46
          = 3.96
```

Note that this is the decimal representation of inflation. To convert it to a percentage,
we must multiply this value by 100.

Accordingly, inflation between January 1971 and January 2018 was 396%.
