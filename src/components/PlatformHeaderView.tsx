import React from 'react';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import MintosSpecificHeaderView from './platformSpecific/MintosSpecificHeaderView';
import ZonkySpecificHeaderView from './platformSpecific/ZonkySpecificHeaderView';
import { PlatformDataProps } from './PlatformView';
import PortfolioHeaderView from './PortfolioHeaderView';

const PlatformHeaderView = (props: PlatformDataProps) => {
  let platformSpecificHeader;

  if (props.platformData instanceof MintosPlatform) {
    platformSpecificHeader = <MintosSpecificHeaderView platformData={props.platformData} />;
  } else if (props.platformData instanceof ZonkyPlatform) {
    platformSpecificHeader = <ZonkySpecificHeaderView platformData={props.platformData} />;
  }

  return (
    <div>
      <hr />
      <PortfolioHeaderView platformData={props.platformData} />
      <hr />
      {platformSpecificHeader}
      <hr />
    </div>
  );
};
export default PlatformHeaderView;
