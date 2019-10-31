import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const MintosSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();
  const campaignRewards = totals.extraReceived.referalReceived.add(totals.extraReceived.cashbackReceived);
  return (
    <div>
      <h3>Mintos - web statistics</h3>
      <p>
        Interest homepage:
        {totals.interestReceived.interestReceived.toFormat()}
      </p>
      <p>
        Late Payment Fees homepage:
        {totals.interestReceived.penaltyReceived.toFormat()}
      </p>
      <p>
        Service fees homepage:
        {totals.feesPaid.secondaryMarketFeePaid.add(totals.feesPaid.currencyExchangeFeePaid).toFormat()}
      </p>
      <p>
        Campaign Rewards:
        {campaignRewards.toFormat()}
      </p>
      <p>
        Deposit - account statement page:
        {totals.deposit.deposit!.add(campaignRewards).toFormat()}
      </p>
      <p>
        Incoming Currency Exchange - account statement page:
        {totals.deposit.incomingCurrencyExchange.toFormat()}
      </p>
      <p>
        Outgoing Currency Exchange - account statement page:
        {totals.withdrawal.outgoingCurrencyExchange.toFormat()}
      </p>
      <p>
        Secondary Market Fees - account statement page:
        {totals.feesPaid.secondaryMarketFeePaid.toFormat()}
      </p>
      <p>
        Currency Exchange Fee - account statement page:
        {totals.feesPaid.currencyExchangeFeePaid.toFormat()}
      </p>
    </div>
  );
};

export default MintosSpecificHeaderView;
