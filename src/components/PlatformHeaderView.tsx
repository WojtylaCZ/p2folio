import React from 'react';

import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import ZonkySpecificHeaderView from './platformSpecific/ZonkySpecificHeaderView';
import { PlatformDataProps } from './PlatformView';
import PortfolioHeaderView from './PortfolioHeaderView';

const PlatformHeaderView = (props: PlatformDataProps) => {
  let platformSpecificHeader;

  if (props.platformData instanceof ZonkyPlatform) {
    platformSpecificHeader = <ZonkySpecificHeaderView platformData={props.platformData} />;
  }

  return (
    <div>
      <PortfolioHeaderView platformData={props.platformData} />
      {platformSpecificHeader}
    </div>
  );
};
export default PlatformHeaderView;
