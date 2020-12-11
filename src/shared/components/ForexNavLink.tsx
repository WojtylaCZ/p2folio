import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const ForexNavLink = () => {
  const { t } = useTranslation();

  return (
    <div>
      <NavLink to="/forex" style={{ color: '#f7b500', textDecoration: 'none' }}>
        {t('links.showForexRates')}
      </NavLink>
    </div>
  );
};
