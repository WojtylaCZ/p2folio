import React from 'react';

import { PlatformDataProps } from './PlatformView';

const PortfolioHeaderView = (props: PlatformDataProps) => {
  const portfolioTotals = props.platformData.getPortfolioTotals();
  return (
    <div>
      <h2>P2Folio Totals</h2>
      <h4>
        Deposit:
        {portfolioTotals.deposit.toFormat()}
      </h4>
      <h4>
        Withdrawal:
        {portfolioTotals.withdrawal.toFormat()}
      </h4>
      <h4>
        Principal received:
        {portfolioTotals.principalReceived!.toFormat()}
      </h4>
      <h4>
        Interests:
        {portfolioTotals.interestReceived!.toFormat()}
      </h4>
      <h4>
        Fees paid:
        {portfolioTotals.feesPaid!.toFormat()}
      </h4>
      <h4>
        Extra received:
        {portfolioTotals.extraReceived!.toFormat()}
      </h4>
    </div>
  );
};

export default PortfolioHeaderView;
