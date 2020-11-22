import Button from '@material-ui/core/Button';
import React from 'react';

export const PlatformHeaderButton = (props: any) => {
  return (
    <Button color="primary" style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
      {props.name}
    </Button>
  );
};
