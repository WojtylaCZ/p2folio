import React from 'react';
import { useParams } from 'react-router-dom';

import { DragAndDrop } from '../draganddrop/DragAndDrop';
import { Propositions } from '../portfolio/components/Propositions';
import { getDefaultResultTableExample } from '../result_table/DataTable';
import ResultTable from '../result_table/ResultTable';
import { ResultView } from '../result_view/ResultView';

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
