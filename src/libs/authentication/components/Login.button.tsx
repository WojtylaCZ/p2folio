import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button variant="outlined" color="primary" size="small">
        {t('buttons.logIn')}
      </Button>
    </div>
  );
};
