import { Grid } from '@material-ui/core';
import Dinero from 'dinero.js';
import React, { useState } from 'react';

import { Currency } from '../common/enums';
import { getNewPortfolioResultFactory } from '../core/platforms/utils';

import ForexRateInput from './ForexRateInput';
import { PortfolioPlatformsProps } from './PlatformsTabMenuView';
import PortfolioHeaderView from './PortfolioHeaderView';

const PortfolioView = (props: PortfolioPlatformsProps) => {
  const [forexRate, setForexRate] = useState(0.0);

  const setForexRateValue = (value: number) => {
    setForexRate(value);
  };

  let portfolioHeader;
  let forexRateInput;

  if (props.portfolioPlatforms.length > 0) {
    const portfolioCurrency = props.portfolioPlatforms[0].currency;
    let isCurrencyConversionNeeded = false;

    for (const platform of props.portfolioPlatforms) {
      if (portfolioCurrency !== platform.currency) {
        isCurrencyConversionNeeded = true;
        break;
      }
    }

    let portfolioResult;
    if (isCurrencyConversionNeeded) {
      portfolioResult = getNewPortfolioResultFactory(Currency.CZK);
      forexRateInput = <ForexRateInput setForexRateValue={setForexRateValue} />;
    } else {
      portfolioResult = getNewPortfolioResultFactory(portfolioCurrency);
    }

    if (!isCurrencyConversionNeeded || forexRate) {
      for (const platform of props.portfolioPlatforms) {
        for (let [transactionType, amount] of Object.entries<any>(platform.getPortfolioTotals())) {
          if (forexRate) {
            if (amount.getCurrency() !== Currency.CZK) {
              const tmp = amount.multiply(forexRate);
              amount = Dinero({ amount: tmp.getAmount(), currency: Currency.CZK, precision: tmp.getPrecision() });
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
          portfolioResult[transactionType] = portfolioResult[transactionType].add(amount);
        }
      }
    }
    portfolioHeader = <PortfolioHeaderView portfolioResult={portfolioResult} />;
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
    </div>
  );
};

export default PortfolioView;
