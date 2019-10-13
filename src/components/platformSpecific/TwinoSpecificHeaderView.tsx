import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const TwinoSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();

  return (
    <div>
      <h2>Twino.eu - web statistics</h2>
      <h4>
        Deposit - homepage:
        {totals.deposit.deposit.toFormat()}
      </h4>
      <h4>
        Withdrawal - homepage:
        {totals.deposit.deposit.toFormat()}
      </h4>
      <h4>
        Interest - homepage:
        {totals.interestReceived.interestReceived.add(totals.interestReceived.penaltyReceived).toFormat()}
      </h4>
    </div>
  );
};

export default TwinoSpecificHeaderView;
