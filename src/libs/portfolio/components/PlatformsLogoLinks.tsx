import React from 'react';

import { Rectangle } from '../../../shared/components/Rectangle';
import { MintosLogo } from '../../../shared/icons/components/MintosLogo';
import { TwinoLogo } from '../../../shared/icons/components/TwinoLogo';
import { ZonkyLogo } from '../../../shared/icons/components/ZonkyLogo';

export const PlatformsLogoLinks = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Rectangle content={<MintosLogo width="70%" />} width={310} margin="1em" />
      <Rectangle content={<ZonkyLogo width="70%" />} width={310} margin="1em" />
      <Rectangle content={<TwinoLogo width="70%" />} width={310} margin="1em" />
    </div>
  );
};
