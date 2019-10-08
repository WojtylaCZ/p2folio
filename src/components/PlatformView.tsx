import React from 'react';

import { SupportedPlatform } from '../core/platforms/models';

import PlatformHeaderView from './PlatformHeaderView';
import ResultTable from './ResultTable';

export type PlatformDataProps = {
  platformData: SupportedPlatform;
};

const PlatformView = (props: PlatformDataProps) => {
  return (
    <div>
      <PlatformHeaderView platformData={props.platformData} />
      <ResultTable platformData={props.platformData} />
    </div>
  );
};

export default PlatformView;
