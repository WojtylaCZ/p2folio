import React from 'react';

import { Propositions } from '../../libs/portfolio/components/Propositions';
import { MintosLogo } from '../icons/components/MintosLogo';
import { TwinoLogo } from '../icons/components/TwinoLogo';
import { ZonkyLogo } from '../icons/components/ZonkyLogo';

import { DragAndDrop } from './DragAndDrop';
import { Emoji } from './Emoji';

export const IntroView = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ marginLeft: '1em' }}>
          <Emoji emoji="👉" /> <b>P2folio </b> vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi
          <br />
          <Emoji emoji="👉" /> <b> zkombinuje</b> výsledky dohromady pro historický vývoj celého portfolia
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
  );
};
