import React from 'react';

import { CurrencySelectForm } from '../../../shared/components/CurrencySelectForm';
import { ForexNavLink } from '../../../shared/components/ForexNavLink';

export const ForexSelect = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div>
        Vyber hlavni meny: <CurrencySelectForm />
      </div>
      <ForexNavLink />
    </div>
  );
};
