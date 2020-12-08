import React from 'react';
import { useTranslation } from 'react-i18next';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { IntroView } from '../../shared/components/IntroView';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';

import { PlatformsLogoLinks } from './components/PlatformsLogoLinks';

export const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          {/* Sjednoťte si data z <b>různých P2P platforem </b> pro kompaktní statistiky a přehled celého portfolia */}
          {t('titles.portfolio')}
        </h1>
      </div>

      <IntroView />

      <h2>VASE PORTFOLIO</h2>
      <ResultView />

      <h2>DETAILNI ZOBRAZENI DLE PLATFOREM</h2>
      <PlatformsLogoLinks />

      <h2> DETAILNI TABULKOVY POHLED</h2>
      <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
    </div>
  );
};
