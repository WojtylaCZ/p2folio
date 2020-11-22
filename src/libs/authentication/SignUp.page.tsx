import Button from '@material-ui/core/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Emoji } from '../../shared/components/Emoji';

import { CredentialsInput } from './components/Credentials.input';

export const SignUpPage = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px' }}>
        <h1>
          <Emoji emoji="🚀" />
          <b> Registrujte se a získejte mnohem více výhod</b>
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ marginLeft: '1em' }}>
          <Emoji emoji="👉" /> <b>P2folio </b> vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi.
          <br />
          <Emoji emoji="👉" /> <b> zkombinuje</b> výsledky dohromady pro historický vývoj celého portfolia
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '350px',
          width: '100%',
          marginTop: '2em',
          marginBottom: '1.5em'
        }}
      >
        <CredentialsInput />

        <Button
          variant="contained"
          color="primary"
          style={{
            borderRadius: '4px',
            backgroundColor: '#195bdd',
            width: '100%',
            marginTop: '2em'
          }}
        >
          REGISTROVAT
        </Button>
      </div>

      <div style={{ marginTop: '1em' }}>
        Jiz mate svuj ucet?{' '}
        <NavLink to="/login" style={{ color: '#f7b500', textDecoration: 'none' }}>
          PRIHLASTE SE
        </NavLink>
      </div>
    </div>
  );
};
