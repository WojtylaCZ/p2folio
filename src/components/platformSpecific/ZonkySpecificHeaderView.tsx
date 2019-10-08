import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const ZonkySpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();
  return (
    <div>
      <h2>Zonky - web statistics</h2>
      <h4>
        Vyděláno :
        {totals.interestReceived.interestReceived
          .add(totals.interestReceived.penaltyReceived)
          .subtract(totals.feesPaid.plaformFeePaid)
          .subtract(totals.feesPaid.secondaryMarketFeePaid)
          .toFormat()}
      </h4>

      <h4>
        Zaplaceno na poplatcích:
        {totals.feesPaid.plaformFeePaid.add(totals.feesPaid.secondaryMarketFeePaid).toFormat()}
      </h4>

      <h4>
        Úrok zaplacený:
        {totals.interestReceived.interestReceived.toFormat()}
      </h4>
      <h4>
        Pokuty:
        {totals.interestReceived.penaltyReceived.toFormat()}
      </h4>
    </div>
  );
};

export default ZonkySpecificHeaderView;
