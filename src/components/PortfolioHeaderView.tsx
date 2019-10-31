import React from 'react';

import { PlatformDataProps } from './PlatformView';

const PortfolioHeaderView = (props: PlatformDataProps) => {
  const portfolioTotals = props.platformData.getPortfolioTotals();
  return (
    <div>
      <h3>Unified Totals</h3>
      <p>
        Deposit:
        {portfolioTotals.deposit.toFormat()}
      </p>
      <p>
        Withdrawal:
        {portfolioTotals.withdrawal.toFormat()}
      </p>
      <p>
        Principal received:
        {portfolioTotals.principalReceived!.toFormat()}
      </p>
      <p>
        Interests:
        {portfolioTotals.interestReceived!.toFormat()}
      </p>
      <p>
        Fees paid:
        {portfolioTotals.feesPaid!.toFormat()}
      </p>
      <p>Extra received: {portfolioTotals.extraReceived!.toFormat()} </p>
    </div>
  );
};

export default PortfolioHeaderView;
