import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Emoji } from '../../shared/components/Emoji';

import { CredentialsInput } from './components/Credentials.input';

export const LoginPage = (props: any) => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px' }}>
        <h1>
          <Emoji emoji="👋🏼" /> <b> {t('titles.logInPageH1')} </b>
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '350px',
          width: '100%',
          marginTop: '2em',
          marginBottom: '1.5em',
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
            marginTop: '2em',
          }}
        >
          {t('buttons.logIn')}
        </Button>
      </div>

      <div style={{ marginTop: '1em' }}>
        {t('propositions.notYetRegistered')}{' '}
        <NavLink to="/signup" style={{ color: '#f7b500', textDecoration: 'none' }}>
          {t('buttons.signUp')}
        </NavLink>
      </div>
    </div>
  );
};
