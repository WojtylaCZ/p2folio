import React from 'react';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { IBaseResult } from '../core/platforms/models';
import { TwinoPlatform } from '../core/platforms/TwinoPlatform';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import MintosSpecificHeaderView from './platformSpecific/MintosSpecificHeaderView';
import TwinoSpecificHeaderView from './platformSpecific/TwinoSpecificHeaderView';
import ZonkySpecificHeaderView from './platformSpecific/ZonkySpecificHeaderView';
import { PlatformDataProps } from './PlatformView';
import PortfolioHeaderView from './PortfolioHeaderView';

export type PlatformResultProps = {
  platformResult: IBaseResult<any, any, any, any, any>;
};

const PlatformHeaderView = (props: PlatformDataProps) => {
  let platformSpecificHeader;

  const platformResult = props.platformData.getPlatformResult();

  const portfolioResult = props.platformData.getPortfolioResult();

  if (props.platformData instanceof MintosPlatform) {
    platformSpecificHeader = <MintosSpecificHeaderView platformResult={platformResult} />;
  } else if (props.platformData instanceof TwinoPlatform) {
    platformSpecificHeader = <TwinoSpecificHeaderView platformResult={platformResult} />;
  } else if (props.platformData instanceof ZonkyPlatform) {
    platformSpecificHeader = <ZonkySpecificHeaderView platformResult={platformResult} />;
  }
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
