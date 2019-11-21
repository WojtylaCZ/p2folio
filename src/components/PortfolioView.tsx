import Grid from '@material-ui/core/Grid';
import Dinero from 'dinero.js';
import React, { useState } from 'react';

import { Currency } from '../common/enums';
import { IOneMonthPortfolioResult, IPortfolioResult } from '../core/platforms/models';
import { getNewPortfolioResultFactory } from '../core/platforms/utils';

import ForexRateInput from './ForexRateInput';
import { PortfolioPlatformsProps } from './PlatformsTabMenuView';
import PortfolioHeaderView from './PortfolioHeaderView';
import ResultTable from './ResultTable';

function sumWithOptionalForexConversion(
  data: IPortfolioResult,
  target: IPortfolioResult,
  forexRate: number,
  targetCurrency: Currency
): void {
  for (const [transactionType, amount] of Object.entries<any>(data)) {
    let value = { ...amount };
    if (forexRate) {
      if (value.getCurrency() !== targetCurrency) {
        const tmp = value.multiply(forexRate);
        value = Dinero({ amount: tmp.getAmount(), currency: Currency.CZK, precision: tmp.getPrecision() });
        // TODO FIX this hack somehow with:
        // const rates = {
        //     rates: {
        //       CZK: 26.7
        //     }
        //   }
        // converted = await amount.convert('CZK', {
        //     endpoint: new Promise(resolve => resolve(rates))
        //   })
      }
    }
    // @ts-ignore
    target[transactionType] = target[transactionType].add(value);
  }
}
const PortfolioView = (props: PortfolioPlatformsProps) => {
  const [forexRate, setForexRate] = useState(0.0);

  const setForexRateValue = (value: number) => {
    setForexRate(value);
  };

  let portfolioHeader;
  let portfolioResultTable;
  let forexRateInput;

  if (props.portfolioPlatforms.length > 0) {
    let portfolioCurrency = props.portfolioPlatforms[0].currency;
    let isCurrencyConversionNeeded = false;

    for (const platform of props.portfolioPlatforms) {
      if (portfolioCurrency !== platform.currency) {
        isCurrencyConversionNeeded = true;
        break;
      }
    }

    if (isCurrencyConversionNeeded) {
      portfolioCurrency = Currency.CZK;
      forexRateInput = <ForexRateInput setForexRateValue={setForexRateValue} />;
    }

    const portfolioResult = getNewPortfolioResultFactory(portfolioCurrency);
    const monthlyPortfolioResults: IOneMonthPortfolioResult[] = [];

    if (!isCurrencyConversionNeeded || forexRate) {
      for (const platform of props.portfolioPlatforms) {
        sumWithOptionalForexConversion(platform.getPortfolioResult(), portfolioResult, forexRate, Currency.CZK);

        const rowToAdd = platform.getMonthlyPortfolioResults();

        let indexInRowToAdd = 0;
        for (let indexToMontlyResults = 0; indexToMontlyResults < monthlyPortfolioResults.length; indexToMontlyResults++) {
          const resultMonth = monthlyPortfolioResults[indexToMontlyResults];
          if (indexInRowToAdd === rowToAdd.length) {
            break;
          }

          const monthDataToAdd = rowToAdd[indexInRowToAdd];

          /**
           * NOTE: months are in descending order = later in time is ealier in monthly results
           * 11-2019
           * 10-2019
           * 9-2019
           */

          if (monthDataToAdd.month.isSame(resultMonth.month, 'month')) {
            // same month, so sum it
            sumWithOptionalForexConversion(rowToAdd[indexInRowToAdd].result, resultMonth.result, forexRate, Currency.CZK);
            indexInRowToAdd++;
            continue;
          }
          if (monthDataToAdd.month.isAfter(resultMonth.month, 'month')) {
            // isAfter = is later in time, but earlier in the monthly results, so prepend it to the present one
            const month = rowToAdd[indexInRowToAdd].month.clone();
            const result = getNewPortfolioResultFactory(portfolioCurrency);

            sumWithOptionalForexConversion(rowToAdd[indexInRowToAdd].result, result, forexRate, Currency.CZK);

            monthlyPortfolioResults.splice(indexToMontlyResults, 0, { month, result });
            indexInRowToAdd++;
            continue;
          }
          if (monthDataToAdd.month.isBefore(resultMonth.month, 'month')) {
            // isBefore = is earlier in time, but later in the monthly results, handler later
          }
        }

        if (indexInRowToAdd !== rowToAdd.length) {
          // there are no existing months to sum with, so just append all
          while (indexInRowToAdd < rowToAdd.length) {
            const month = rowToAdd[indexInRowToAdd].month.clone();
            const result = getNewPortfolioResultFactory(portfolioCurrency);

            sumWithOptionalForexConversion(rowToAdd[indexInRowToAdd].result, result, forexRate, Currency.CZK);

            monthlyPortfolioResults.push({ month, result });
            indexInRowToAdd++;
          }
        }
      }
    }

    portfolioHeader = <PortfolioHeaderView portfolioResult={portfolioResult} />;
    portfolioResultTable = <ResultTable monthlyPortfolioResults={monthlyPortfolioResults || []} />;
  } else {
    portfolioHeader = 'Nahrajte výpisy z účtu k zobrazení statistik z jednotlivých platforem.';
  }

  return (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={6}>
          {portfolioHeader}
        </Grid>
        <Grid item={true} xs={6}>
          {forexRateInput}
        </Grid>
      </Grid>

      <hr />
      {portfolioResultTable}
    </div>
  );
};

export default PortfolioView;
