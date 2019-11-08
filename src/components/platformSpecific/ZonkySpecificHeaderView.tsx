import React from 'react';

import { PlatformResultProps } from '../PlatformHeaderView';

const ZonkySpecificHeaderView = (props: PlatformResultProps) => {
  return (
    <div>
      <h3>Zonky - statistiky na webu</h3>
      <p>
        Vyděláno:
        {props.platformResult.interestReceived.interestReceived
          .add(props.platformResult.interestReceived.penaltyReceived)
          .subtract(props.platformResult.feesPaid.plaformFeePaid)
          .subtract(props.platformResult.feesPaid.secondaryMarketFeePaid)
          .toFormat()}
      </p>

      <p>
        Zaplaceno na poplatcích:
        {props.platformResult.feesPaid.plaformFeePaid.add(props.platformResult.feesPaid.secondaryMarketFeePaid).toFormat()}
      </p>

      <p>
        Úrok zaplacený:
        {props.platformResult.interestReceived.interestReceived.toFormat()}
      </p>
      <p>
        Pokuty:
        {props.platformResult.interestReceived.penaltyReceived.toFormat()}
      </p>
    </div>
  );
};

export default ZonkySpecificHeaderView;
