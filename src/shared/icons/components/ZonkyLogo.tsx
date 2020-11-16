import React from 'react';

import zonkyLogo from '../png/zonky.png';

export const ZonkyLogo = (props: any) => {
  return <img src={zonkyLogo} alt="Zonky" style={{ width: '100%', height: 'auto', ...props }} />;
};
