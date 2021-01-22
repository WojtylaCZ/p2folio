import React from 'react';
import { Trans } from 'react-i18next';

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
          <Emoji emoji="👉" />
          <Trans i18nKey="propositions.monthlyResults">
            <strong /> rest
          </Trans>
          <br />
          <Emoji emoji="👉" />
          <Trans i18nKey="propositions.portfolioSummary">
            <strong /> rest
          </Trans>
        </div>
        <Propositions />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '650px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1em',
        }}
      >
        <div
          style={{ maxWidth: '550px', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}
        >
          <div style={{ maxWidth: '6em' }}>
            <MintosLogo />
          </div>
          <div style={{ maxWidth: '6em' }}>
            <ZonkyLogo />
          </div>
          <div style={{ maxWidth: '6em' }}>
            <TwinoLogo filter="grayscale(100%)" />
          </div>
        </div>

        <div style={{ maxWidth: '550px', width: '100%', height: '17em', marginTop: '3em', marginBottom: '3em' }}>
          <DragAndDrop />
        </div>
      </div>
    </div>
  );
};
