import React from 'react';

import { CurrencySelectForm } from '../../../shared/components/CurrencySelectForm';
import { ForexNavLink } from '../../../shared/components/ForexNavLink';

export const ForexSelect = () => {
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
        <div style={{ marginRight: '0.5em' }}>Vyber hlavni meny:</div>
        <CurrencySelectForm />
      </div>

      <ForexNavLink />
    </div>
  );
};
