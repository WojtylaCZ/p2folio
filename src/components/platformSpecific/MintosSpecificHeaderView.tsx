import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const MintosSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();
  const campaignRewards = totals.extraReceived.referalReceived.add(totals.extraReceived.cashbackReceived);
  return (
    <div>
      <h3>Mintos - statistiky na webu</h3>
      <p>
        Interest - úvodní stránka:
        {totals.interestReceived.interestReceived.toFormat()}
      </p>
      <p>
        Late Payment Fees - úvodní stránka:
        {totals.interestReceived.penaltyReceived.toFormat()}
      </p>
      <p>
        Service fees - úvodní stránka:
        {totals.feesPaid.secondaryMarketFeePaid.add(totals.feesPaid.currencyExchangeFeePaid).toFormat()}
      </p>
      <p>
        Campaign Rewards:
        {campaignRewards.toFormat()}
      </p>
      <p>
        Deposit - stránka Account statement:
        {totals.deposit.deposit!.add(campaignRewards).toFormat()}
      </p>
      <p>
        Incoming Currency Exchange - stránka Account statement:
        {totals.deposit.incomingCurrencyExchange.toFormat()}
      </p>
      <p>
        Outgoing Currency Exchange - stránka Account statement:
        {totals.withdrawal.outgoingCurrencyExchange.toFormat()}
      </p>
      <p>
        Secondary Market Fees - stránka Account statement:
        {totals.feesPaid.secondaryMarketFeePaid.toFormat()}
      </p>
      <p>
        Currency Exchange Fee - stránka Account statement:
        {totals.feesPaid.currencyExchangeFeePaid.toFormat()}
      </p>
    </div>
  );
};

export default MintosSpecificHeaderView;
