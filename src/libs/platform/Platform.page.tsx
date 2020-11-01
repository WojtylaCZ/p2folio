import React from 'react';
import { useParams } from 'react-router-dom';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { DragAndDrop } from '../../shared/components/DragAndDrop';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import { Propositions } from '../portfolio/components/Propositions';

export const PlatformPage = () => {
  const { platformId } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h3>
          Zobrazte si <b> data z platformy {platformId}. </b>
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Propositions />
        <DragAndDrop />
      </div>

      <div>
        <h2>VASE PORTFOLIO</h2>
      </div>
      <ResultView />

      <div>
        <h2> DETAILNI TABULKOVY POHLED</h2>
      </div>

      <div>
        <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
      </div>
    </div>
  );
};
