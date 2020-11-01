import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

import { LanguageGlobeIcon } from '../icons/LanguageGlobeIcon';

export const LanguageSelect = () => {
  return (
    <div>
      <LanguageGlobeIcon />
      <FormControl className="languageform" style={{ width: 70 }}>
        <Select
          value={'cs'}
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
