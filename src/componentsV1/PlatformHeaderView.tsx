import Grid from '@material-ui/core/Grid';
import React from 'react';

import { MintosPlatform } from '../libs/core/platforms/MintosPlatform';
import { IBaseResult } from '../libs/core/platforms/models';
import { TwinoPlatform } from '../libs/core/platforms/TwinoPlatform';
import { ZonkyPlatform } from '../libs/core/platforms/ZonkyPlatform';

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

  let portfolioResultTooltips = {};
  if (props.platformData instanceof MintosPlatform) {
    platformSpecificHeader = <MintosSpecificHeaderView platformResult={platformResult} />;
    portfolioResultTooltips = {
      deposit: 'Vklady + Příchozí směnná transakce',
      withdrawal: 'Vklady + Odchozí směnná transakce',
      principalReceived: 'Neimplementovano',
      interestReceived: 'Přijaté úroky + Obdržené poplatky z prodlení',
      feesPaid: 'Poplatek za obchod na sekundárním trhu  + Poplatek směnárny',
      extraReceived: 'Bonus za doporučení příteli + Cashback bonus'
    };
  } else if (props.platformData instanceof TwinoPlatform) {
    platformSpecificHeader = <TwinoSpecificHeaderView platformResult={platformResult} />;
    portfolioResultTooltips = {
      principalReceived: 'Neimplementovano',
      interestReceived: 'Přijaté úroky + Obdržené poplatky z prodlení'
    };
  } else if (props.platformData instanceof ZonkyPlatform) {
    platformSpecificHeader = <ZonkySpecificHeaderView platformResult={platformResult} />;
    portfolioResultTooltips = {
      principalReceived: 'Splátka půjčky + prodej na sekundárním trhu',
      interestReceived: 'Přijaté úroky + pokuty',
      feesPaid: 'Poplatek za investování + za prodej na sekundárním trhu'
    };
  }
  return (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={1} />
        <Grid item={true} xs={5}>
          <PortfolioHeaderView portfolioResult={portfolioResult} tooltips={portfolioResultTooltips} />
        </Grid>
        <Grid item={true} xs={6}>
          {platformSpecificHeader}
        </Grid>
      </Grid>
    </div>
  );
};
export default PlatformHeaderView;
