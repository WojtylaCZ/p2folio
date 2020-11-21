import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import { CurrencySelectForm } from '../../shared/components/CurrencySelectForm';
import { Emoji } from '../../shared/components/Emoji';
import '../../shared/Style.css';

export const ForexPage = () => {
  return (
    <div style={{ maxWidth: '900px', maxHeight: '800px', backgroundColor: '#ffffff', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '3em', maxWidth: '100%' }}>
        <h2> UPRAVA KURZU MEN </h2>
        Aktuálně pro vykreslení grafu používáme kurzy od ČNB, <br /> můžete si je změnit dle uvážení pod tímto textem.
        <div style={{ marginTop: '2em', marginBottom: '2em' }}>
          Zadané kurzy <Emoji emoji="👇" /> jsou vztažené k hlavní měně <Emoji emoji="👉" />
          <CurrencySelectForm />
        </div>
        <div
          className="forexTable"
          style={{
            maxWidth: '700px',
            backgroundColor: '#f9fcff',
            width: '100%'
          }}
        >
          <div
            style={{ margin: '2em', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexFlow: 'row wrap' }}
          >
            <TextField
              id="standard-number"
              label="1 USD ="
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">CZK</InputAdornment>
              }}
              style={{ maxWidth: '100px' }}
            />

            <TextField
              id="standard-number"
              label="1 USD ="
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">EUR</InputAdornment>
              }}
              style={{ maxWidth: '100px' }}
            />

            <TextField
              id="standard-number"
              label="1 USD ="
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">GBP</InputAdornment>
              }}
              style={{ maxWidth: '100px' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              maxWidth: '100%',

              borderRadius: '4px',
              backgroundColor: '#195bdd'
            }}
          >
            ULOZIT ZADANE KURZY
          </Button>
        </div>
        <div style={{ marginTop: '0.5em' }}>Použít kurzy z ČNB</div>
      </div>
    </div>
  );
};
