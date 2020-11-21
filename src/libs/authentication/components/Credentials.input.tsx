import TextField from '@material-ui/core/TextField';
import React from 'react';

export const CredentialsInput = (props: any) => {
  return (
    <React.Fragment>
      <TextField id="outlined-basic" label="Email" variant="outlined" style={{ width: '100%' }} />
      <TextField id="outlined-basic" label="Heslo" variant="outlined" style={{ marginTop: '2em', width: '100%' }} />
    </React.Fragment>
  );
};
