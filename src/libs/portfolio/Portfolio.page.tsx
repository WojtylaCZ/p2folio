import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Currency } from '../../common/enums';
import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { IntroView } from '../../shared/components/IntroView';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import DatasetContext from '../../shared/contexts/DatasetContext';

import { PlatformsLogoLinks } from './components/PlatformsLogoLinks';

export const Portfolio = () => {
  const { t } = useTranslation();
  const { dataset } = useContext(DatasetContext);

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          <Trans i18nKey="titles.portfolioPageH1">
            before <strong /> after
          </Trans>
        </h1>
      </div>

      <IntroView />

      <h2> {t('titles.yourPortfolioH2')} </h2>
      <ResultView portfolioResult={dataset.portfolio.result} />

      <h2> {t('titles.viewInDetailH2')} </h2>
      <PlatformsLogoLinks />

      <h2> {t('titles.portfolioResultTableH2')} </h2>
      <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
    </div>
  );
};
