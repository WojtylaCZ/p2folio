import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import '../../../shared/components/LogoP2FOLIO.css';
import { Rectangle } from '../../../shared/components/Rectangle';
import { MintosLogo } from '../../../shared/icons/components/MintosLogo';
import { TwinoLogo } from '../../../shared/icons/components/TwinoLogo';
import { ZonkyLogo } from '../../../shared/icons/components/ZonkyLogo';

export const PlatformsLogoLinks = (props: any) => {
  const { platformId } = useParams();
  let portfolioLink;
  if (platformId) {
    portfolioLink = (
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Rectangle content={<div className="P2FOLIO">Portfolio</div>} width={310} margin="1em" />
      </NavLink>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'center' }}>
      {portfolioLink}
      <NavLink to="/platforms/mintos" style={{ textDecoration: 'none' }}>
        <Rectangle content={<MintosLogo width="70%" />} width={310} margin="1em" />
      </NavLink>
      <NavLink to="/platforms/zonky" style={{ textDecoration: 'none' }}>
        <Rectangle content={<ZonkyLogo width="70%" />} width={310} margin="1em" />
      </NavLink>
      <NavLink to="/platforms/twino" style={{ textDecoration: 'none' }}>
        <Rectangle content={<TwinoLogo width="70%" />} width={310} margin="1em" />
      </NavLink>
    </div>
  );
};
