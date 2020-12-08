import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageGlobeIcon } from '../icons/components/LanguageGlobeIcon';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleLanguageSelect = (event: ChangeEvent<{ value: unknown }>) => {
    i18n.changeLanguage(event.target.value as string);
    setLanguage(event.target.value as string);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '0.2em' }}>
        <LanguageGlobeIcon />
      </div>

      <FormControl>
        <Select value={language} disableUnderline={true} IconComponent={() => <></>} onChange={handleLanguageSelect}>
          <MenuItem value={'cs'}>Česky</MenuItem>
          <MenuItem value={'de'}>Deutsch</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'es'}>Español</MenuItem>
          <MenuItem value={'ru'}>Русский</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
