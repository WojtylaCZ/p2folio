import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const TwinoSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();

  return (
    <div>
      <h3>Twino.eu - web statistics</h3>
      <p>Deposit - homepage: {totals.deposit.deposit.toFormat()}</p>
      <p>Withdrawal - homepage: {totals.deposit.deposit.toFormat()}</p>
      <p>
        Interest - homepage: {totals.interestReceived.interestReceived.add(totals.interestReceived.penaltyReceived).toFormat()}
      </p>
    </div>
  );
};

export default TwinoSpecificHeaderView;
