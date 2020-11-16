import React from 'react';

import { SocialIcon } from '../shared/components/SocialIcon';
import { FacebookIcon } from '../shared/icons/components/FacebookIcon';
import { TelegramIcon } from '../shared/icons/components/TelegramIcon';
import { TwitterIcon } from '../shared/icons/components/TwitterIcon';

export const Footer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2em' }}>
      <SocialIcon style={{ margin: '0.5em' }} icon={<FacebookIcon />} />
      <SocialIcon style={{ margin: '0.5em' }} icon={<TwitterIcon />} />
      <SocialIcon style={{ margin: '0.5em' }} icon={<TelegramIcon />} />
    </div>
  );
};
