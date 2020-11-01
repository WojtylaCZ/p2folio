import React from 'react';

import { SupportedPlatform } from '../core/platforms/models';
import { DataTable } from '../shared/components/DataTable';

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
