import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';

import { Currency } from '../common/enums';
import { IOneMonthPortfolioResult } from '../core/platforms/models';
import { getNewPortfolioResultFactory, getPortfolioResultWithOptionalForexConversion } from '../core/platforms/utils';

import ForexRateInput from './ForexRateInput';
import { PortfolioPlatformsProps } from './PlatformsTabMenuView';
import PortfolioHeaderView from './PortfolioHeaderView';
import ResultTable from './ResultTable';

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

    let portfolioResult = getNewPortfolioResultFactory(portfolioCurrency);
    let monthlyPortfolioResults: IOneMonthPortfolioResult[] = [];

    if (!isCurrencyConversionNeeded || forexRate) {
      [portfolioResult, monthlyPortfolioResults] = getPortfolioResultWithOptionalForexConversion(
        props.portfolioPlatforms,
        portfolioCurrency,
        forexRate
      );
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

      {portfolioResultTable ? <hr /> : undefined}
      {portfolioResultTable}
    </div>
  );
};

export default PortfolioView;
