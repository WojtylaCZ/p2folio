import React from 'react';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { DragAndDrop } from '../../shared/components/DragAndDrop';
import { Emoji } from '../../shared/components/Emoji';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import '../../shared/Style.css';

import { PlatformsLogoLinks } from './components/PlatformsLogoLinks';
import { Propositions } from './components/Propositions';
import './Portfolio.css';

export const Portfolio = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h3>
          Sjednoťte si data z <b>různých P2P platforem </b> pro kompaktní statistiky a přehled celého portfolia.
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <Emoji emoji="👉" /> P2Folio vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi <br />
            <Emoji emoji="👉" /> zkombinuje výsledky dohromady pro historický vývoj celého portfolia
          </div>
          <Propositions />
        </div>

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
