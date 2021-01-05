import Button from '@material-ui/core/Button';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Emoji } from '../../shared/components/Emoji';

import { CredentialsInput } from './components/Credentials.input';

export const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px' }}>
        <h1>
          <Emoji emoji="🚀" />
          <b> {t('titles.signUpPageH1')} </b>
        </h1>
      </div>
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
          {t('buttons.signUp')}
        </Button>
      </div>

      <div style={{ marginTop: '1em' }}>
        {t('propositions.alredyHaveAccount')}{' '}
        <NavLink to="/login" style={{ color: '#f7b500', textDecoration: 'none' }}>
          {t('buttons.logIn')}
        </NavLink>
      </div>
    </div>
  );
};
