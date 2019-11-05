import React from 'react';

import { IPortfolioResult } from '../core/platforms/models';

type PortfolioHeaderProps = {
  portfolioResult: IPortfolioResult;
};

const PortfolioHeaderView = (props: PortfolioHeaderProps) => {
  return (
    <div>
      <h3>Sjednocené součty</h3>
      <p>
        Vklady:
        {props.portfolioResult.deposit.toFormat()}
      </p>
      <p>
        Výběry:
        {props.portfolioResult.withdrawal.toFormat()}
      </p>
      <p>
        Přijaté jistiny:
        {props.portfolioResult.principalReceived!.toFormat()}
      </p>
      <p>
        Zisk:
        {props.portfolioResult.interestReceived!.toFormat()}
      </p>
      <p>
        Zaplaceno na poplatcích:
        {props.portfolioResult.feesPaid!.toFormat()}
      </p>
      <p>Mimo investiční odměny: {props.portfolioResult.extraReceived!.toFormat()} </p>
    </div>
  );
};

export default PortfolioHeaderView;
