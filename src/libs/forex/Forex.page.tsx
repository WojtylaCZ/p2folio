import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CurrencySelectForm } from '../../shared/components/CurrencySelectForm';
import { Emoji } from '../../shared/components/Emoji';
import '../../shared/Style.css';

export const ForexPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '900px', maxHeight: '800px', backgroundColor: '#ffffff', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '3em',
          maxWidth: '100%',
          textAlign: 'center'
        }}
      >
        <h2> {t('titles.forexPageH2')} </h2>
        {t('propositions.forexCNB')}
        , <br />
        {t('propositions.forexChange')}
        <div style={{ marginTop: '2em', marginBottom: '2em' }}>
          {t('propositions.forexRates')} <Emoji emoji="👇" /> {t('propositions.forexBaseCurrency')} <Emoji emoji="👉" />
          <CurrencySelectForm />
        </div>
        <div
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
            {t('buttons.saveForexRates')}
          </Button>
        </div>
        <div style={{ marginTop: '0.5em' }}>{t('buttons.usePredefinedForexRates')}</div>
      </div>
    </div>
  );
};
