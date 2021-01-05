import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { IntroView } from '../../shared/components/IntroView';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import { PlatformsLogoLinks } from '../portfolio/components/PlatformsLogoLinks';

function getPlatformTitle(platformId: string) {
  return platformId[0].toUpperCase() + platformId.slice(1);
}

export const PlatformPage = () => {
  const { platformId } = useParams();
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          {t('titles.plaformPageH1')} {getPlatformTitle(platformId)}
        </h1>
      </div>

      <IntroView />

      <h2>{t('titles.platformResultsH2')} </h2>
      <ResultView />

      <h2>{t('titles.viewInDetailH2')}</h2>
      <PlatformsLogoLinks />

      <h2> {t('titles.portfolioResultTableH2')} </h2>
      <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
    </div>
  );
};
