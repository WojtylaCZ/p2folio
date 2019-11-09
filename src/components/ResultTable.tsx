import Dinero from 'dinero.js';
import React from 'react';

import {
  IDepositOptions,
  IExtraReceivedOptions,
  IFeePaidOptions,
  IInterestReceivedOptions,
  IMonthlyResults,
  IWithdrawalOptions
} from '../core/platforms/models';

import { PlatformDataProps } from './PlatformView';

class ResultTable extends React.Component<PlatformDataProps> {
  public render() {
    return (
      <div>
        <table>
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }

  private renderTableData() {
    if (this.props.platformData.monthlyResults.length > 0) {
      return this.props.platformData.monthlyResults.map(
        (
          month: IMonthlyResults<
            IExtraReceivedOptions,
            IInterestReceivedOptions,
            IFeePaidOptions,
            IDepositOptions,
            IWithdrawalOptions
          >,
          index: any
        ) => {
          const monthResult = {
            deposit: undefined,
            withdrawal: undefined,
            feesPaid: undefined,
            extraReceived: undefined,
            interestReceived: undefined
          } as any;

          for (const [transactionType, value] of Object.entries(month.result)) {
            for (const [, result] of Object.entries<Dinero.Dinero>(value)) {
              if (monthResult[transactionType]) {
                monthResult[transactionType] = monthResult[transactionType].add(result);
              } else {
                monthResult[transactionType] = result;
              }
            }
          }

          return (
            <tr key={index}>
              <td>{month.month.format('MMM YYYY')}</td>
              <td>{monthResult.deposit ? monthResult.deposit.toFormat() : ''}</td>
              <td>{monthResult.withdrawal ? monthResult.withdrawal.toFormat() : ''}</td>
              <td>{monthResult.interestReceived ? monthResult.interestReceived.toFormat() : ''}</td>
              <td>{monthResult.feesPaid ? monthResult.feesPaid.toFormat() : ''}</td>
              <td>{monthResult.extraReceived ? monthResult.extraReceived.toFormat() : ''}</td>
            </tr>
          );
        }
      );
    } else {
      return <tr key={0} />;
    }
  }

  private renderTableHeader() {
    return ['Datum', 'Vklady', 'Výběry', 'Přijaté zisky', 'Zaplaceno na poplatcích', 'Mimo-investiční odměny'].map(
      (key, index) => {
        return <th key={index}>{key}</th>;
      }
    );
  }
}

export default ResultTable;
