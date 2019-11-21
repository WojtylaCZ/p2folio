import React from 'react';

import { IOneMonthPortfolioResult } from '../core/platforms/models';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

class ResultTable extends React.Component<ResultTableProps> {
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
    if (this.props.monthlyPortfolioResults.length > 0) {
      return this.props.monthlyPortfolioResults.map((month: IOneMonthPortfolioResult, index: number) => {
        return (
          <tr key={index}>
            <td>{month.month.format('MMM YYYY')}</td>
            <td>{month.result.deposit ? month.result.deposit.toFormat() : ''}</td>
            <td>{month.result.withdrawal ? month.result.withdrawal.toFormat() : ''}</td>
            <td>{month.result.interestReceived ? month.result.interestReceived.toFormat() : ''}</td>
            <td>{month.result.feesPaid ? month.result.feesPaid.toFormat() : ''}</td>
            <td>{month.result.extraReceived ? month.result.extraReceived.toFormat() : ''}</td>
          </tr>
        );
      });
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
