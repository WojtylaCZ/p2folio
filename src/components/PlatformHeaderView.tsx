import React from 'react';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { TwinoPlatform } from '../core/platforms/TwinoPlatform';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import MintosSpecificHeaderView from './platformSpecific/MintosSpecificHeaderView';
import TwinoSpecificHeaderView from './platformSpecific/TwinoSpecificHeaderView';
import ZonkySpecificHeaderView from './platformSpecific/ZonkySpecificHeaderView';
import { PlatformDataProps } from './PlatformView';
import PortfolioHeaderView from './PortfolioHeaderView';

const PlatformHeaderView = (props: PlatformDataProps) => {
  let platformSpecificHeader;

  if (props.platformData instanceof MintosPlatform) {
    platformSpecificHeader = <MintosSpecificHeaderView platformData={props.platformData} />;
  } else if (props.platformData instanceof TwinoPlatform) {
    platformSpecificHeader = <TwinoSpecificHeaderView platformData={props.platformData} />;
  } else if (props.platformData instanceof ZonkyPlatform) {
    platformSpecificHeader = <ZonkySpecificHeaderView platformData={props.platformData} />;
  }
  const portfolioResult = props.platformData.getPortfolioTotals();

  return (
    <div>
      <PortfolioHeaderView portfolioResult={portfolioResult} />
      <hr />
      {platformSpecificHeader}
      <hr />
    </div>
  );
};
export default PlatformHeaderView;
