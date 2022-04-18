import React from 'react';

import { IOneMonthPortfolioResult } from '../../libs/core/platforms/models';
import { ForexSelect } from '../../libs/forex/components/ForexSelect';

import { DataTable } from './DataTable';
import { Rectangle } from './Rectangle';

type ResultTableProps = {
  monthlyPortfolioResults: IOneMonthPortfolioResult[];
};

const ResultTable = (props: ResultTableProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
      <ForexSelect />
      <Rectangle
        justifyContent="flex-start"
        overflowX="auto"
        squared={true}
        content={
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', margin: '1em' }}>
            <DataTable monthlyPortfolioResults={props.monthlyPortfolioResults} />
          </div>
        }
      />
    </div>
  );
};

export default ResultTable;
