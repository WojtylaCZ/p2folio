import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { flexbox } from '@material-ui/system';
import moment from 'moment';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Currency } from '../../common/enums';
import { IOneMonthPortfolioResult } from '../../core/platforms/models';
import { getNewPortfolioResultFactory } from '../../core/platforms/utils';
import { CurrencySelectForm } from '../../shared/components/CurrencySelectForm';

import { DataTable } from './DataTable';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

const ResultTable = (props: ResultTableProps) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          Vyber hlavni meny
          <CurrencySelectForm />
        </div>

        <div>
          <NavLink to="/forex" style={{ color: '#f7b500', textDecoration: 'none' }}>
            Zobrazit kurz měn pro přepočet
          </NavLink>
        </div>
      </div>
      <Paper>
        <div style={{ width: '1000px', paddingTop: 20, paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
          <div style={{ overflow: 'auto' }}>
            <DataTable monthlyPortfolioResults={props.monthlyPortfolioResults} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ResultTable;
