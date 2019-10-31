import React from 'react';

import { PlatformDataProps } from './PlatformView';

const PortfolioHeaderView = (props: PlatformDataProps) => {
  const portfolioTotals = props.platformData.getPortfolioTotals();
  return (
    <div>
      <h3>Sjednocené součty</h3>
      <p>
        Vklady:
        {portfolioTotals.deposit.toFormat()}
      </p>
      <p>
        Výběry:
        {portfolioTotals.withdrawal.toFormat()}
      </p>
      <p>
        Přijaté jistiny:
        {portfolioTotals.principalReceived!.toFormat()}
      </p>
      <p>
        Zisk:
        {portfolioTotals.interestReceived!.toFormat()}
      </p>
      <p>
        Zaplaceno na poplatcích:
        {portfolioTotals.feesPaid!.toFormat()}
      </p>
      <p>Mimo investiční odměny: {portfolioTotals.extraReceived!.toFormat()} </p>
    </div>
  );
};

export default PortfolioHeaderView;
