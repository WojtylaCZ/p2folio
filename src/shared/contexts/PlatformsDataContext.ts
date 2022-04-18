import React from 'react';

import { SupportedPlatform } from '../../libs/core/platforms/models';

export type PortfolioPlatformsContext = {
  portfolioPlatforms: SupportedPlatform[];
};

export default React.createContext<PortfolioPlatformsContext>({
  portfolioPlatforms: []
});
