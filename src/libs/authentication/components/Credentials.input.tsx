import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CredentialsInput = (props: any) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <TextField id="text-input-email" label="Email" variant="outlined" style={{ width: '100%' }} />
      <TextField
        id="text-input-password"
        label={t('misc.password')}
        variant="outlined"
        style={{ marginTop: '2em', width: '100%' }}
      />
    </React.Fragment>
  );
};
