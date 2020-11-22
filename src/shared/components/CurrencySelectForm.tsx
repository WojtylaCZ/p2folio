import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export const CurrencySelectForm = () => {
  return (
    <FormControl style={{ minWidth: '55px' }}>
      <Select
        value={'usd'}
        disableUnderline={true}
        //   onChange={handleChange}
      >
        <MenuItem value={'usd'}>USD</MenuItem>
        <MenuItem value={'eur'}>EUR</MenuItem>
        <MenuItem value={'czk'}>CZK</MenuItem>
      </Select>
    </FormControl>
  );
};
