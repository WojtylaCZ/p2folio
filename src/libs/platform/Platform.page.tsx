import React from 'react';
import { useParams } from 'react-router-dom';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { IntroView } from '../../shared/components/IntroView';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';

export const PlatformPage = () => {
  const { platformId } = useParams();

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          Zobrazte si <b> data z platformy {platformId}. </b>
        </h1>
      </div>

      <IntroView />

      <h2>VASE PORTFOLIO</h2>

      <ResultView />

      <h2> DETAILNI TABULKOVY POHLED</h2>

      <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
    </div>
  );
};
