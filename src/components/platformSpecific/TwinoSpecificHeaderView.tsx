import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const TwinoSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();

  return (
    <div>
      <h3>Twino.eu - statistiky na webu</h3>
      <p>Vklady - úvodní stránka: {totals.deposit.deposit.toFormat()}</p>
      <p>Výběry - úvodní stránka: {totals.withdrawal.withdrawal.toFormat()}</p>
      <p>
        Zisk - úvodní stránka: {totals.interestReceived.interestReceived.add(totals.interestReceived.penaltyReceived).toFormat()}
      </p>
    </div>
  );
};

export default TwinoSpecificHeaderView;
