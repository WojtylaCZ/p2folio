import React from 'react';

import { PlatformDataProps } from '../PlatformView';

const MintosSpecificHeaderView = (props: PlatformDataProps) => {
  const totals = props.platformData.getPlatformTotals();
  const campaignRewards = totals.extraReceived.referalReceived.add(totals.extraReceived.cashbackReceived);
  return (
    <div>
      <h2>Mintos - web statistics</h2>
      <h4>
        Interest homepage:
        {totals.interestReceived.interestReceived.toFormat()}
      </h4>
      <h4>
        Late Payment Fees homepage:
        {totals.interestReceived.penaltyReceived.toFormat()}
      </h4>
      <h4>
        Service fees homepage:
        {totals.feesPaid.secondaryMarketFeePaid.add(totals.feesPaid.currencyExchangeFeePaid).toFormat()}
      </h4>
      <h4>
        Campaign Rewards:
        {campaignRewards.toFormat()}
      </h4>
      <h4>
        Deposit - account statement page:
        {totals.deposit.deposit!.add(campaignRewards).toFormat()}
      </h4>
      <h4>
        Incoming Currency Exchange - account statement page:
        {totals.deposit.incomingCurrencyExchange.toFormat()}
      </h4>
      <h4>
        Outgoing Currency Exchange - account statement page:
        {totals.withdrawal.outgoingCurrencyExchange.toFormat()}
      </h4>
      <h4>
        Secondary Market Fees - account statement page:
        {totals.feesPaid.secondaryMarketFeePaid.toFormat()}
      </h4>
      <h4>
        Currency Exchange Fee - account statement page:
        {totals.feesPaid.currencyExchangeFeePaid.toFormat()}
      </h4>
    </div>
  );
};

export default MintosSpecificHeaderView;
