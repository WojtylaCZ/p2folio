import Button from '@material-ui/core/Button';
import React from 'react';

import { Emoji } from '../../shared/components/Emoji';

import { CredentialsInput } from './components/Credentials.input';

export const LoginPage = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fcff', alignItems: 'center' }}>
      <div className="title">
        <Emoji emoji="🙋‍♂️" /> Vítejte zpět
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
        PRIHLASIT SE
      </Button>

      <div>Jeste nemate svuj ucet? ZAREGISTRUJTE SE</div>
    </div>
  );
};
