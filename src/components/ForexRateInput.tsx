import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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

type ForexRateInputProps = {
  setForexRateValue: (value: number) => void;
};

const ForexRateInput = (props: ForexRateInputProps) => {
  const [forexRateInputError, setForexRateInputError] = useState('');
  const [forexRate, setForexRate] = useState('0.0');

  const classes = useStyles();

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    const result = parseFloat(forexRate);
    if (Number.isNaN(result) || result <= 0) {
      setForexRateInputError('Musi byt kladne cislo');
    } else {
      setForexRateInputError('');
      props.setForexRateValue(result);
    }
  };

  return (
    <form className={classes.container} noValidate={true} autoComplete="off">
      <TextField
        id="outlined-basic"
        className={classes.textField}
        error={forexRateInputError ? true : false}
        helperText={forexRateInputError}
        label="1 EUR = ? CZK"
        margin="normal"
        onChange={(event: any) => {
          setForexRate(event.target.value);
        }}
        variant="outlined"
        type="number"
        value={forexRate}
      />
      <Button variant="contained" color="primary" className={classes.button} size="small" type="submit" onClick={onButtonClick}>
        Ok
      </Button>
    </form>
  );
};

export default ForexRateInput;
