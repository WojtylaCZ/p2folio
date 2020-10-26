import React from 'react';

import { SupportedPlatform } from '../core/platforms/models';
import { DataTable } from '../libs/result_table/DataTable';
import ResultTable from '../libs/result_table/ResultTable';

import PlatformHeaderView from './PlatformHeaderView';

export type PlatformDataProps = {
  platformData: SupportedPlatform;
};

const PlatformView = (props: PlatformDataProps) => {
  const monthlyPortfolioResults = props.platformData.getMonthlyPortfolioResults();

  return (
    <div>
      <PlatformHeaderView platformData={props.platformData} />
      <hr />
      <DataTable monthlyPortfolioResults={monthlyPortfolioResults} />
    </div>
  );
};

export default PlatformView;
