import Paper from '@material-ui/core/Paper';
import React from 'react';

import { IOneMonthPortfolioResult } from '../../core/platforms/models';
import { ForexSelect } from '../../libs/forex/components/ForexSelect';

import { DataTable } from './DataTable';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

const ResultTable = (props: ResultTableProps) => {
  return (
    <div>
      <ForexSelect />
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
