import React from 'react';

import { FacebookIcon } from '../shared/icons/FacebookIcon';
import { TelegramIcon } from '../shared/icons/TelegramIcon';
import { TwitterIcon } from '../shared/icons/TwitterIcon';

export const Footer = () => {
  return (
    <div className="content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div> {} </div>
        <div className="signature">© 2018-2020 - Vojtech Uhlir</div>

        <div className="social">
          <FacebookIcon />
          <TwitterIcon />
          <TelegramIcon />
        </div>
      </div>
    </div>
  );
};
