import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useParams } from 'react-router-dom';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { IntroView } from '../../shared/components/IntroView';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import DatasetContext from '../../shared/contexts/DatasetContext';
import { IOneMonthPortfolioResult, IPortfolioResult, SupportedPlatformTypes } from '../core/platforms/models';
import { createZeroPortfolioResult, defaultCurrencyForPlatform } from '../core/platforms/utils';
import { PlatformsLogoLinks } from '../portfolio/components/PlatformsLogoLinks';

function getPlatformTitle(platformId: string) {
  return platformId[0].toUpperCase() + platformId.slice(1);
}

function getPlatform(platformId: string) {
  switch (platformId) {
    case SupportedPlatformTypes.MINTOS:
      return SupportedPlatformTypes.MINTOS;
    case SupportedPlatformTypes.TWINO:
      return SupportedPlatformTypes.TWINO;
    case SupportedPlatformTypes.ZONKY:
      return SupportedPlatformTypes.ZONKY;
    default:
      return undefined;
  }
}

export const PlatformPage = () => {
  const { t } = useTranslation();
  const { platformId } = useParams<{ platformId: string }>();
  const { dataset } = useContext(DatasetContext);

  const platformType = getPlatform(platformId);
  if (!platformType) {
    return <Redirect to="/" />;
  }

  const defaultCurrency = defaultCurrencyForPlatform(platformType);

  const platformData = dataset.platforms.get(platformType)
    ? dataset.platforms.get(platformType)!.get(defaultCurrency)
    : undefined;

  let portfolioResult: IPortfolioResult;
  let monthlyPortfolioResults: IOneMonthPortfolioResult[];
  if (platformData) {
    portfolioResult = platformData.getPortfolioResult();
    monthlyPortfolioResults = platformData.getMonthlyPortfolioResults();

    if (platformData.platform === SupportedPlatformTypes.ZONKY) {
      console.log(platformData.getPlatformResult().interestReceived.interestReceived.toFormat());
      console.log(platformData.getPlatformResult().interestReceived.penaltyReceived.toFormat());
      console.log(platformData.getPlatformResult().feesPaid.plaformFeePaid.toFormat());
      console.log(platformData.getPlatformResult().feesPaid.secondaryMarketFeePaid.toFormat());
    }
  } else {
    portfolioResult = createZeroPortfolioResult(defaultCurrency);
    monthlyPortfolioResults = getDefaultResultTableExample();
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          {t('titles.plaformPageH1')} {getPlatformTitle(platformId)}
        </h1>
      </div>

      <IntroView />

      <h2>{t('titles.platformResultsH2')} </h2>
      <ResultView portfolioResult={portfolioResult} />

      <h2>{t('titles.viewInDetailH2')}</h2>
      <PlatformsLogoLinks />

      <h2> {t('titles.portfolioResultTableH2')} </h2>
      <ResultTable monthlyPortfolioResults={monthlyPortfolioResults} />
    </div>
  );
};
