import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import '../../components/App.css';

export const forex = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fcff', alignItems: 'center' }}>
      <h2> UPRAVA KURZU MEN </h2>
      <h4>Aktuálně pro vykreslení grafu používáme kurzy od ČNB, můžete si je změnit dle uvážení pod tímto textem.</h4>
      <div>
        <h4>Zadané kurzy 👇 jsou vztažené k hlavní měně 👉</h4>

        <FormControl className="currencyform" style={{ width: 70 }}>
          <Select
            value={'usd'}
            //   onChange={handleChange}
          >
            <MenuItem value={'usd'}>$ USD</MenuItem>
            <MenuItem value={'eur'}>€ EUR</MenuItem>
            <MenuItem value={'czk'}>Kc CZK</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className="forexTable"
        style={{
          width: '795px',
          height: '138px',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <TextField
          id="standard-number"
          label="1 USD ="
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          style={{}}
        />

        <TextField
          id="standard-number"
          label="1 USD ="
          type="number"
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          id="standard-number"
          label="1 USD ="
          type="number"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
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
        ULOZIT ZADANE KURZY
      </Button>
      Použít kurzy z ČNB
    </div>
  );
};
