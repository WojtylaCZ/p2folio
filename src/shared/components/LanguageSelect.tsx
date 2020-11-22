import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

import { LanguageGlobeIcon } from '../icons/components/LanguageGlobeIcon';

export const LanguageSelect = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '0.2em' }}>
        <LanguageGlobeIcon />
      </div>

      <FormControl>
        <Select
          value={'en'}
          disableUnderline={true}
          IconComponent={() => <></>}
          //   onChange={handleChange}
        >
          <MenuItem value={'cs'}>Cesky</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'de'}>Deutsch</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
