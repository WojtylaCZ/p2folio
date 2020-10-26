import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export const CurrencySelectForm = () => {
  return (
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
  );
};
