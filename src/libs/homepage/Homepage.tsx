import React from 'react';

import '../../shared/Style.css';
import { DragAndDrop } from '../draganddrop/DragAndDrop';
import { getDefaultResultTableExample } from '../result_table/DataTable';
import ResultTable from '../result_table/ResultTable';
import { ResultView } from '../result_view/ResultView';

import { PlatformsLogoLinks } from './components/PlatformsLogoLinks';
import { Propositions } from './components/Propositions';
import './Homepage.css';

export const Homepage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h3>
          Sjednoťte si data z <b>různých P2P platforem </b> pro kompaktní statistiky a přehled celého portfolia.
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
        <h2>DETAILNI ZOBRAZENI DLE PLATFOREM</h2>
      </div>
      <PlatformsLogoLinks />

      <div>
        <h2> DETAILNI TABULKOVY POHLED</h2>
      </div>

      <div>
        <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
      </div>
    </div>
  );
};
