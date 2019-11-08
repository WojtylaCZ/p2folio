import React from 'react';

import { PlatformResultProps } from '../PlatformHeaderView';

const TwinoSpecificHeaderView = (props: PlatformResultProps) => {
  return (
    <div>
      <h3>Twino.eu - statistiky na webu</h3>
      <p>Vklady - úvodní stránka: {props.platformResult.deposit.deposit.toFormat()}</p>
      <p>Výběry - úvodní stránka: {props.platformResult.withdrawal.withdrawal.toFormat()}</p>
      <p>
        Zisk - úvodní stránka:{' '}
        {props.platformResult.interestReceived.interestReceived
          .add(props.platformResult.interestReceived.penaltyReceived)
          .toFormat()}
      </p>
    </div>
  );
};

export default TwinoSpecificHeaderView;
