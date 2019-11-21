import React from 'react';

import { SupportedPlatform } from '../core/platforms/models';

import PlatformHeaderView from './PlatformHeaderView';
import ResultTable from './ResultTable';

export type PlatformDataProps = {
  platformData: SupportedPlatform;
};

const PlatformView = (props: PlatformDataProps) => {
  const monthlyPortfolioResults = props.platformData.getMonthlyPortfolioResults();

  return (
    <div>
      <PlatformHeaderView platformData={props.platformData} />
      <ResultTable monthlyPortfolioResults={monthlyPortfolioResults} />
    </div>
  );
};

export default PlatformView;
