import React from 'react';

import zonkyLogo from '../png/zonky.png';

export const ZonkyLogo = (props: any) => {
  return <img src={zonkyLogo} alt="Zonky" style={{ height: 'auto', ...props }} />;
};
