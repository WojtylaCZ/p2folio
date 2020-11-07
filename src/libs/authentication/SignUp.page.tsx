import Button from '@material-ui/core/Button';
import React from 'react';

import { Emoji } from '../../shared/components/Emoji';

import { CredentialsInput } from './components/Credentials.input';

export const SignUpPage = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fcff', alignItems: 'center' }}>
      <div className="title">
        <Emoji emoji="🚀" /> Registrujte se a získejte mnohem více výhod
      </div>
      <div className="subtitles">
        <Emoji emoji="👉" /> P2Folio vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi <br />
        <Emoji emoji="👉" /> zkombinuje výsledky dohromady pro historický vývoj celého portfolia
      </div>

      <CredentialsInput />

      <Button
        variant="contained"
        color="primary"
        style={{
          width: '380px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#195bdd'
        }}
      >
        REGISTROVAT
      </Button>

      <div>Jiz mate svuj ucet? PRIHLASTE SE</div>
    </div>
  );
};
