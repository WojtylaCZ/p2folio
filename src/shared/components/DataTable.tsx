import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../common/enums';
import { IOneMonthPortfolioResult } from '../../libs/core/platforms/models';
import { createZeroPortfolioResult } from '../../libs/core/platforms/utils';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

export function getDefaultResultTableExample(): IOneMonthPortfolioResult[] {
  const example1 = { month: moment(), result: createZeroPortfolioResult(Currency.CZK) };
  const example2 = { month: moment().subtract(1, 'months'), result: createZeroPortfolioResult(Currency.EUR) };
  return [example1, example2];
}

function RenderTableHeader() {
  const { t } = useTranslation();

  const columnNames = [
    t('tableColumns.date'),
    t('tableColumns.deposits'),
    t('tableColumns.withdrawals'),
    t('tableColumns.interestsReceived'),
    t('tableColumns.feesPaid'),
    t('tableColumns.extra')
  ].map((value, index) => {
    return (
      <TableCell key={index} align="center" variant="head">
        {value}
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

export const DataTable = (props: ResultTableProps) => {
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>{RenderTableHeader()}</TableHead>
      <TableBody>{renderTableData(props)}</TableBody>
    </Table>
  );
};
