import Button from '@material-ui/core/Button';
import React from 'react';

export const PlatformHeaderButton = (props: any) => {
  return (
    <div>
      <Button color="primary">{props.name}</Button>
    </div>
  );
};
