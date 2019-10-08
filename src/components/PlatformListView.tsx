import React from 'react';

import { SupportedPlatform } from '../core/platforms/models';

import PlatformView from './PlatformView';

export type PortfolioPlatformsProps = {
  portfolioPlatforms: (SupportedPlatform)[];
};

const PlatformListView = (props: PortfolioPlatformsProps) => {
  const platformList = props.portfolioPlatforms.map((platform: SupportedPlatform, index: number) => {
    return <PlatformView key={index} platformData={platform} />;
  });

  return <div className="platform-list">{platformList}</div>;
};

export default PlatformListView;
