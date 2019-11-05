import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { MouseEvent, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    button: {
      margin: theme.spacing(4)
    },
    input: {
      display: 'none'
    }
  })
);

type CurrencyConversionProps = {
  setForexRateValue: (value: number) => void;
};

const ForexRateInput = (props: CurrencyConversionProps) => {
  const [exchangeRateError, setExchangeRateError] = useState('');
  const [exchangeRate, setExchangeRate] = useState('0.0');

  const classes = useStyles();

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    const result = parseFloat(exchangeRate);
    if (Number.isNaN(result) || result <= 0) {
      setExchangeRateError('Musi byt kladne cislo');
    } else {
      setExchangeRateError('');
      props.setForexRateValue(result);
    }
  };

  return (
    <form className={classes.container} noValidate={true} autoComplete="off">
      <TextField
        id="outlined-basic"
        className={classes.textField}
        error={exchangeRateError ? true : false}
        helperText={exchangeRateError}
        label="1 EUR = ? CZK"
        margin="normal"
        onChange={(event: any) => {
          setExchangeRate(event.target.value);
        }}
        variant="outlined"
        type="number"
        value={exchangeRate}
      />
      <Button variant="contained" color="primary" className={classes.button} size="small" type="submit" onClick={onButtonClick}>
        Ok
      </Button>
    </form>
  );
};

export default ForexRateInput;
