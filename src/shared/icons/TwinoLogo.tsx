import React from 'react';

import twinoLogo from './png/twino.png';

export const TwinoLogo = (props: any) => {
  return <img src={twinoLogo} alt="Twino" style={{ height: 'auto', ...props }} />;
};
