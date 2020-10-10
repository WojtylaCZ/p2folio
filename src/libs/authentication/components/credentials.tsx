import TextField from '@material-ui/core/TextField';
import React from 'react';

export const CredentialsInput = () => {
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <TextField className="credentialsTextInputs" id="outlined-basic" label="Email" variant="outlined" />
      </div>
      <div style={{ padding: '20px' }}>
        <TextField className="credentialsTextInputs" id="outlined-basic" label="Heslo" variant="outlined" />
      </div>
    </div>
  );
};
