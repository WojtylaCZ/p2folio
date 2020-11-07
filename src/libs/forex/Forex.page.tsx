import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import { CurrencySelectForm } from '../../shared/components/CurrencySelectForm';
import { Emoji } from '../../shared/components/Emoji';
import '../../shared/Style.css';

export const ForexPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fcff', alignItems: 'center' }}>
      <h2> UPRAVA KURZU MEN </h2>
      <h4>Aktuálně pro vykreslení grafu používáme kurzy od ČNB, můžete si je změnit dle uvážení pod tímto textem.</h4>
      <div>
        <h4>
          Zadané kurzy <Emoji emoji="👇" /> jsou vztažené k hlavní měně <Emoji emoji="👉" />
        </h4>

        <CurrencySelectForm />
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
