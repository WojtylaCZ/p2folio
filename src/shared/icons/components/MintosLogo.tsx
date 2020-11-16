import React from 'react';

import mintosLogo from '../png/mintos.png';

export const MintosLogo = (props: any) => {
  return <img src={mintosLogo} alt="Mintos" style={{ width: '100%', height: 'auto', ...props }} />;
};
