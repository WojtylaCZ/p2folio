import Button from '@material-ui/core/Button';
import React from 'react';

export const LoginButton = () => {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          borderRadius: '4px'
          // backgroundColor: '#195bdd'
        }}
      >
        PRIHLASIT SE
      </Button>
    </div>
  );
};
