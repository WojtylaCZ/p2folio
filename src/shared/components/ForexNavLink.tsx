import React from 'react';
import { NavLink } from 'react-router-dom';

export const ForexNavLink = () => {
  return (
    <div>
      <NavLink to="/forex" style={{ color: '#f7b500', textDecoration: 'none' }}>
        Zobrazit kurzy měn
      </NavLink>
    </div>
  );
};
