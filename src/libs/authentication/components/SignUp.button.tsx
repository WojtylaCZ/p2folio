import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SignUpButton = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: '#195bdd'
        }}
      >
        {t('buttons.SignUp')}
      </Button>
    </div>
  );
};
