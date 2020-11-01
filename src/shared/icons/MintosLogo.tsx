import React from 'react';

import mintosLogo from './png/mintos.png';

export const MintosLogo = (props: any) => {
  return <img src={mintosLogo} alt="Mintos" style={{ height: 'auto', ...props }} />;
};
