import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const ZonkySpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();
  return (
    <div>
      <h3>Zonky - web statistics</h3>
      <p>
        Vyděláno:
        {totals.interestReceived.interestReceived
          .add(totals.interestReceived.penaltyReceived)
          .subtract(totals.feesPaid.plaformFeePaid)
          .subtract(totals.feesPaid.secondaryMarketFeePaid)
          .toFormat()}
      </p>

      <p>
        Zaplaceno na poplatcích:
        {totals.feesPaid.plaformFeePaid.add(totals.feesPaid.secondaryMarketFeePaid).toFormat()}
      </p>

      <p>
        Úrok zaplacený:
        {totals.interestReceived.interestReceived.toFormat()}
      </p>
      <p>
        Pokuty:
        {totals.interestReceived.penaltyReceived.toFormat()}
      </p>
    </div>
  );
};

export default ZonkySpecificHeaderView;
