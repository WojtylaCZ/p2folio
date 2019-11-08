import React from 'react';

import { PlatformResultProps } from '../PlatformHeaderView';

const MintosSpecificHeaderView = (props: PlatformResultProps) => {
  const campaignRewards = props.platformResult.extraReceived.referalReceived.add(
    props.platformResult.extraReceived.cashbackReceived
  );
  return (
    <div>
      <h3>Mintos - statistiky na webu</h3>
      <p>
        Interest - úvodní stránka:
        {props.platformResult.interestReceived.interestReceived.toFormat()}
      </p>
      <p>
        Late Payment Fees - úvodní stránka:
        {props.platformResult.interestReceived.penaltyReceived.toFormat()}
      </p>
      <p>
        Service fees - úvodní stránka:
        {props.platformResult.feesPaid.secondaryMarketFeePaid
          .add(props.platformResult.feesPaid.currencyExchangeFeePaid)
          .toFormat()}
      </p>
      <p>
        Campaign Rewards:
        {campaignRewards.toFormat()}
      </p>
      <p>
        Deposit - stránka Account statement:
        {props.platformResult.deposit.deposit!.add(campaignRewards).toFormat()}
      </p>
      <p>
        Incoming Currency Exchange - stránka Account statement:
        {props.platformResult.deposit.incomingCurrencyExchange.toFormat()}
      </p>
      <p>
        Outgoing Currency Exchange - stránka Account statement:
        {props.platformResult.withdrawal.outgoingCurrencyExchange.toFormat()}
      </p>
      <p>
        Secondary Market Fees - stránka Account statement:
        {props.platformResult.feesPaid.secondaryMarketFeePaid.toFormat()}
      </p>
      <p>
        Currency Exchange Fee - stránka Account statement:
        {props.platformResult.feesPaid.currencyExchangeFeePaid.toFormat()}
      </p>
    </div>
  );
};

export default MintosSpecificHeaderView;
