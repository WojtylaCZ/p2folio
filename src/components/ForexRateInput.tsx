import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
    <div>
      <h3>Zadejte svůj kurz EUR-CZK</h3>1 EUR = ? CZK:
      <form className={classes.container} noValidate={true} autoComplete="off">
        <TextField
          id="outlined-basic"
          className={classes.textField}
          error={forexRateInputError ? true : false}
          helperText={forexRateInputError}
          margin="normal"
          onChange={(event: any) => {
            setForexRate(event.target.value);
          }}
          variant="outlined"
          type="number"
          value={forexRate}
        />
        <Button variant="contained" color="primary" className={classes.button} size="small" type="submit" onClick={onButtonClick}>
          Zadat kurz
        </Button>
      </form>
    </div>
  );
};

export default ForexRateInput;
