import React from 'react';

import { getDefaultResultTableExample } from '../../shared/components/DataTable';
import { DragAndDrop } from '../../shared/components/DragAndDrop';
import { Emoji } from '../../shared/components/Emoji';
import ResultTable from '../../shared/components/ResultTable';
import { ResultView } from '../../shared/components/ResultView';
import { MintosLogo } from '../../shared/icons/components/MintosLogo';
import { TwinoLogo } from '../../shared/icons/components/TwinoLogo';
import { ZonkyLogo } from '../../shared/icons/components/ZonkyLogo';

import { PlatformsLogoLinks } from './components/PlatformsLogoLinks';
import { Propositions } from './components/Propositions';

export const Portfolio = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1>
          Sjednoťte si data z <b>různých P2P platforem </b> pro kompaktní statistiky a přehled celého portfolia
        </h1>
      </div>

      <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ marginLeft: '1em' }}>
            <div>
              <Emoji emoji="👉" /> <b>P2folio </b> vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi
            </div>
            <div>
              <Emoji emoji="👉" /> <b> zkombinuje</b> výsledky dohromady pro historický vývoj celého portfolia
            </div>
          </div>
          <Propositions />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            maxWidth: '650px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em'
          }}
        >
          <div style={{ maxWidth: '550px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <MintosLogo width="7rem" />
            <ZonkyLogo width="7rem" />
            <TwinoLogo width="7rem" filter="grayscale(100%)" />
          </div>

          <div style={{ maxWidth: '550px', width: '100%', height: '17em', marginTop: '3em', marginBottom: '3em' }}>
            <DragAndDrop />
          </div>
        </div>
      </div>

      <div>
        <h2>VASE PORTFOLIO</h2>
      </div>
      <ResultView />

      <div>
        <h2>DETAILNI ZOBRAZENI DLE PLATFOREM</h2>
      </div>

      <div>
        <PlatformsLogoLinks />
      </div>

      <div>
        <h2> DETAILNI TABULKOVY POHLED</h2>
      </div>

      <ResultTable monthlyPortfolioResults={getDefaultResultTableExample()} />
    </div>
  );
};
