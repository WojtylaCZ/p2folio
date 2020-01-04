import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';

import { IPortfolioResult } from '../core/platforms/models';

type PortfolioHeaderProps = {
  portfolioResult: IPortfolioResult;
  tooltips: {
    deposit?: string;
    withdrawal?: string;
    principalReceived?: string;
    interestReceived?: string;
    extraReceived?: string;
    feesPaid?: string;
  };
};

const PortfolioHeaderView = (props: PortfolioHeaderProps) => {
  let toolTipDeposit;
  let toolTipWithdrawal;
  let toolTipPrincipalReceived;
  let toolTipInterestReceived;
  let toolTipFeesPaid;
  let toolTipExtraReceived;

  if (props.tooltips.deposit) {
    toolTipDeposit = (
      <Tooltip title={props.tooltips.deposit} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  if (props.tooltips.withdrawal) {
    toolTipWithdrawal = (
      <Tooltip title={props.tooltips.withdrawal} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  if (props.tooltips.principalReceived) {
    toolTipPrincipalReceived = (
      <Tooltip title={props.tooltips.principalReceived} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  if (props.tooltips.interestReceived) {
    toolTipInterestReceived = (
      <Tooltip title={props.tooltips.interestReceived} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  if (props.tooltips.feesPaid) {
    toolTipFeesPaid = (
      <Tooltip title={props.tooltips.feesPaid} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  if (props.tooltips.extraReceived) {
    toolTipExtraReceived = (
      <Tooltip title={props.tooltips.extraReceived} placement="right">
        <HelpOutlineIcon fontSize="small" style={{ color: 'secondary' }} />
      </Tooltip>
    );
  }
  return (
    <div>
      <h3>Sjednocené P2Folio součty</h3>
      <p>
        Vklady:
        {props.portfolioResult.deposit.toFormat()} {toolTipDeposit}
      </p>
      <p>
        Výběry:
        {props.portfolioResult.withdrawal.toFormat()} {toolTipWithdrawal}
      </p>
      <p>
        Přijaté jistiny:
        {props.portfolioResult.principalReceived!.toFormat()} {toolTipPrincipalReceived}
      </p>
      <p>
        Zisk:
        {props.portfolioResult.interestReceived!.toFormat()} {toolTipInterestReceived}
      </p>
      <p>
        Zaplaceno na poplatcích:
        {props.portfolioResult.feesPaid!.toFormat()} {toolTipFeesPaid}
      </p>
      <p>
        Mimo investiční odměny:
        {props.portfolioResult.extraReceived!.toFormat()} {toolTipExtraReceived}
      </p>
    </div>
  );
};

export default PortfolioHeaderView;
