import React from 'react';

import { SocialIcon } from '../shared/components/SocialIcon';
import { FacebookIcon } from '../shared/icons/components/FacebookIcon';
import { GitHubIcon } from '../shared/icons/components/GitHub';
import { TelegramIcon } from '../shared/icons/components/TelegramIcon';
import { TwitterIcon } from '../shared/icons/components/TwitterIcon';

export const Footer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2em' }}>
      <a href="https://github.com/WojtylaCZ/p2folio" target="_blank" rel="noopener noreferrer">
        <SocialIcon style={{ margin: '0.5em' }} icon={<GitHubIcon />} />{' '}
      </a>
      <SocialIcon style={{ margin: '0.5em' }} icon={<FacebookIcon />} />
      <SocialIcon style={{ margin: '0.5em' }} icon={<TwitterIcon />} />
      <SocialIcon style={{ margin: '0.5em' }} icon={<TelegramIcon />} />
    </div>
  );
};
