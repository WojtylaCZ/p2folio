import React from 'react';

import { Rectangle } from '../../shared/components/Rectangle';
import '../../shared/Style.css';
import { getDefaultResultTableExample } from '../result_table/DataTable';
import ResultTable from '../result_table/ResultTable';
import { ResultView } from '../result_view/ResultView';

import './Homepage.css';
import { PlatformsLogoLinks } from './PlatformsLogoLinks';
import { Propositions } from './Propositions';

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
        <div>Sem pretahnete soubory</div>
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
