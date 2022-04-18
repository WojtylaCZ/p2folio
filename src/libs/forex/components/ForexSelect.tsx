import React from 'react';
import { useTranslation } from 'react-i18next';

import { CurrencySelectForm } from '../../../shared/components/CurrencySelectForm';
import { ForexNavLink } from '../../../shared/components/ForexNavLink';

export const ForexSelect = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ marginRight: '0.5em' }}> {t('links.selectBaseCurrency')} </div>
        <CurrencySelectForm />
      </div>

      <ForexNavLink />
    </div>
  );
};
