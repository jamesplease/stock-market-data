import _ from 'lodash';
import marketData from '../data.json';

const MARKET_DATA_SIZE = _.size(marketData);

describe('marketData', () => {
  describe('amount of data', () => {
    test('it has at least the same number of data points as the last run', () => {
      // 1792 data points as of April 2020
      expect(MARKET_DATA_SIZE >= 1792).toBe(true);
    });
  });

  describe('data shape', () => {
    it('each month has the right number of keys', () => {
      _.forEach(marketData, (monthValue) => {
        const keys = Object.keys(monthValue);
        expect(keys.length).toBe(16);
      });
    });

    it('each month has the expected keys', () => {
      _.forEach(marketData, (monthValue) => {
        const keys = Object.keys(monthValue);
        expect(keys).toEqual(
          expect.arrayContaining([
            'year',
            'month',
            'date',
            'comp',
            'dividend',
            'earnings',
            'cpi',
            'dateFractionDecimal',
            'dateFraction',
            'lir',
            'realPrice',
            'realDividend',
            'realTotalReturnPrice',
            'realEarnings',
            'realTotalReturnScaledEarnings',
            'cape',
          ])
        );
      });
    });
  });

  // This is to test that the 10th month, which is in the spreadsheets as "1",
  // can be parsed correctly.
  describe('handling month format', () => {
    it('does not create two values for January', () => {
      const value = _.filter(marketData, {
        year: 1990,
        month: 1,
      });

      expect(value.length).toBe(1);
    });
  });

  describe('values', () => {
    it('has no values that are NaN or strings', () => {
      _.forEach(marketData, (monthValue) => {
        _.forEach(monthValue, (value) => {
          expect(Number.isNaN(value)).toBe(false);
          expect(typeof value === 'string').toBe(false);
        });
      });
    });

    describe('year', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.year === 'number').toBe(true);
        });
      });

      it('has values that are all integers', () => {
        _.forEach(marketData, (monthValue) => {
          expect(Number.isInteger(monthValue.year)).toBe(true);
        });
      });

      it('has values that are reasonable years', () => {
        _.forEach(marketData, (monthValue) => {
          expect(monthValue.year >= 1871 && monthValue.year < 3000).toBe(true);
        });
      });
    });

    describe('month', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.month === 'number').toBe(true);
        });
      });

      it('has values that are all integers', () => {
        _.forEach(marketData, (monthValue) => {
          expect(Number.isInteger(monthValue.month)).toBe(true);
        });
      });

      it('has values that are valid years', () => {
        _.forEach(marketData, (monthValue) => {
          expect(monthValue.month >= 1 && monthValue.month <= 12).toBe(true);
        });
      });
    });

    describe('date', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.date === 'number').toBe(true);
        });
      });
    });

    describe('comp', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.comp === 'number').toBe(true);
        });
      });
    });

    describe('dividend', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.dividend === 'number').toBe(true);
        });
      });
    });

    describe('earnings', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.earnings === 'number').toBe(true);
        });
      });
    });

    describe('cpi', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.cpi === 'number').toBe(true);
        });
      });
    });

    describe('dateFractionDecimal', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.dateFractionDecimal === 'number').toBe(true);
        });
      });

      it('has values that are all integers', () => {
        _.forEach(marketData, (monthValue) => {
          expect(Number.isInteger(monthValue.dateFractionDecimal)).toBe(true);
        });
      });

      it('has values that are valid fractions', () => {
        _.forEach(marketData, (monthValue) => {
          expect(
            monthValue.dateFractionDecimal >= 0 &&
              monthValue.dateFractionDecimal <= 100
          ).toBe(true);
        });
      });
    });

    describe('dateFraction', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.dateFraction === 'number').toBe(true);
        });
      });
    });

    describe('lir', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.lir === 'number').toBe(true);
        });
      });
    });

    describe('realPrice', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.realPrice === 'number').toBe(true);
        });
      });
    });

    describe('realDividend', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.realDividend === 'number').toBe(true);
        });
      });
    });

    describe('realTotalReturnPrice', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.realTotalReturnPrice === 'number').toBe(
            true
          );
        });
      });
    });

    describe('realEarnings', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(typeof monthValue.realEarnings === 'number').toBe(true);
        });
      });

      describe('has values that are unchanged', () => {
        it('1990, December', () => {
          const monthValue = _.find(marketData, {
            year: 1990,
            month: 1,
          });

          expect(monthValue.realEarnings).toBe(45.76);
        });
      });
    });

    describe('realTotalReturnScaledEarnings', () => {
      it('has values that are all numeric', () => {
        _.forEach(marketData, (monthValue) => {
          expect(
            typeof monthValue.realTotalReturnScaledEarnings === 'number'
          ).toBe(true);
        });
      });
    });

    describe('cape', () => {
      it('has values that are all either numeric or null', () => {
        _.forEach(marketData, (monthValue) => {
          expect(
            monthValue.cape === null || typeof monthValue.cape === 'number'
          ).toBe(true);
        });
      });

      describe('current values are unchanged', () => {
        it('1871, January', () => {
          const monthValue = _.find(marketData, {
            year: 1871,
            month: 1,
          });

          expect(monthValue.cape).toBe(null);
        });

        it('1920, January', () => {
          const monthValue = _.find(marketData, {
            year: 1920,
            month: 1,
          });

          expect(monthValue.cape).toBe(5.99);
        });

        it('1990, December', () => {
          const monthValue = _.find(marketData, {
            year: 1990,
            month: 12,
          });

          expect(monthValue.cape).toBe(15.85);
        });
      });
    });
  });
});
