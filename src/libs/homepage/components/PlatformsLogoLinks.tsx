import React from 'react';

import { Rectangle } from '../../../shared/components/Rectangle';
import { MintosLogo } from '../../../shared/icons/MintosLogo';
import { TwinoLogo } from '../../../shared/icons/TwinoLogo';
import { ZonkyLogo } from '../../../shared/icons/ZonkyLogo';

export const PlatformsLogoLinks = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Rectangle content={<MintosLogo width="100%" />} width={310} />
      <Rectangle content={<ZonkyLogo width="100%" />} width={310} />
      <Rectangle content={<TwinoLogo width="100%" />} width={310} />
    </div>
  );
};
