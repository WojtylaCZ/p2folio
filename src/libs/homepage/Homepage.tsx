import React from 'react';

import '../../shared/Style.css';
import { getDefaultResultTableExample } from '../result_table/DataTable';
import ResultTable from '../result_table/ResultTable';

import './Homepage.css';

export const Homepage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h3>
          {' '}
          Sjednoťte si data z <b>různých P2P platforem </b> pro kompaktní statistiky a přehled celého portfolia.{' '}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            👉 P2Folio vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi <br />
            👉 zkombinuje výsledky dohromady pro historický vývoj celého portfolia
            <div
              className="Rectangle"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
            >
              {' '}
              🔐 <div className="Rectangle-title"> Vaše data jsou v bezpečí jen u vás v prohlížeči. </div>{' '}
            </div>
            <div
              className="Rectangle"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
            >
              {' '}
              🦸‍♂️{' '}
              <div className="Rectangle-title">
                {' '}
                Vše je anonymní, data se nikam se neodesílají, služba nemá žádnou další část.{' '}
              </div>{' '}
            </div>
            <div
              className="Rectangle"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
            >
              {' '}
              🕵️‍♂️ <div className="Rectangle-title"> Jakmile stránku aktualizujete, všechna data jsou ztracena. </div>{' '}
            </div>
          </div>
        </div>
        <div>Sem pretahnete soubory</div>
      </div>

      <div>
        <h2>VASE PORTFOLIO</h2>
      </div>

      <div>
        <h2>DETAILNI ZOBRAZENI DLE PLATFOREM</h2>
      </div>

      <div>
        <h2> DETAILNI TABULKOVY POHLED</h2>
      </div>

      <div>
        <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
      </div>
    </div>
  );
};
