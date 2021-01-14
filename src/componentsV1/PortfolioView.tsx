import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';

import { Currency } from '../common/enums';
import { IOneMonthPortfolioResult } from '../libs/core/platforms/models';
import { getNewPortfolioResultFactory, getPortfolioResultWithOptionalForexConversion } from '../libs/core/platforms/utils';
import { DataTable, getDefaultResultTableExample } from '../shared/components/DataTable';

import ForexRateInput from './ForexRateInput';
import { PortfolioPlatformsProps } from './PlatformsTabMenuView';
import PortfolioHeaderView from './PortfolioHeaderView';

const PortfolioView = (props: PortfolioPlatformsProps) => {
  const [forexRate, setForexRate] = useState(0.0);

  const setForexRateValue = (value: number) => {
    setForexRate(value);
  };

  let portfolioHeader;
  let portfolioResultTable;
  let forexRateInput;

  let monthlyPortfolioResults: IOneMonthPortfolioResult[] = [];

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

    if (!isCurrencyConversionNeeded || forexRate) {
      [portfolioResult, monthlyPortfolioResults] = getPortfolioResultWithOptionalForexConversion(
        props.portfolioPlatforms,
        portfolioCurrency,
        forexRate
      );
    }

    portfolioHeader = (
      <Grid container={true}>
        <Grid item={true} xs={1} />
        <Grid item={true} xs={5}>
          <PortfolioHeaderView portfolioResult={portfolioResult} tooltips={{}} />
        </Grid>
        <Grid item={true} xs={6}>
          {forexRateInput}
        </Grid>
      </Grid>
    );
  } else {
    monthlyPortfolioResults = getDefaultResultTableExample();
  }

  portfolioResultTable = <DataTable monthlyPortfolioResults={monthlyPortfolioResults} />;

  return (
    <div>
      {portfolioHeader
        ? portfolioHeader
        : 'Nahrajte výpisy z účtu k zobrazení statistik z jednotlivých platforem. Výsledky se zobrazí v následujícím formátě.'}
      <hr />
      {portfolioResultTable}
    </div>
  );
};

export default PortfolioView;
