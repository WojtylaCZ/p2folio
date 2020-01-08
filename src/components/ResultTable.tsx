import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import { IOneMonthPortfolioResult } from '../core/platforms/models';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

function renderTableHeader() {
  const columnNames = ['Datum', 'Vklady', 'Výběry', 'Příjaté zisky', 'Zaplacené poplatky', 'Extra odměny'].map((value, index) => {
    return (
      <TableCell key={index} align="center" variant="head">
        {' '}
        {value}{' '}
      </TableCell>
    );
  });
  return <TableRow>{columnNames}</TableRow>;
}

function renderTableData(props: ResultTableProps) {
  if (props.monthlyPortfolioResults.length > 0) {
    return props.monthlyPortfolioResults.map((month: IOneMonthPortfolioResult, index: number) => {
      return (
        <TableRow key={index} hover={true}>
          <TableCell component="th" scope="row" align="center" style={{ width: '12%' }}>
            {month.month.format('MMM YYYY')}
          </TableCell>
          <TableCell align="right" style={{ width: '18%' }}>
            {month.result.deposit ? month.result.deposit.toFormat() : ''}
          </TableCell>
          <TableCell align="right" style={{ width: '18%' }}>
            {month.result.withdrawal ? month.result.withdrawal.toFormat() : ''}
          </TableCell>
          <TableCell align="right" style={{ width: '18%' }}>
            {month.result.interestReceived ? month.result.interestReceived.toFormat() : ''}
          </TableCell>
          <TableCell align="right" style={{ width: '17%' }}>
            {month.result.feesPaid ? month.result.feesPaid.toFormat() : ''}
          </TableCell>
          <TableCell align="right" style={{ width: '17%' }}>
            {month.result.extraReceived ? month.result.extraReceived.toFormat() : ''}
          </TableCell>
        </TableRow>
      );
    });
  } else {
    return (
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    );
  }
}

const ResultTable = (props: ResultTableProps) => {
  return (
    <div style={{ overflow: 'auto' }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>{renderTableHeader()}</TableHead>
        <TableBody>{renderTableData(props)}</TableBody>
      </Table>
    </div>
  );
};

export default ResultTable;
