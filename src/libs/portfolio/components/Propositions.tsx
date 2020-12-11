import React from 'react';
import { useTranslation } from 'react-i18next';

import { Emoji } from '../../../shared/components/Emoji';
import { Rectangle } from '../../../shared/components/Rectangle';

import { Proposition } from './Proposition';

export const Propositions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={<Proposition left={<Emoji emoji="🔐" size="2.0rem" />} right={t('propositions.privateData')} />}
      />
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={<Proposition left={<Emoji emoji="🦸‍♂️" size="2.0rem" />} right={t('propositions.noDataUpload')} />}
      />
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={<Proposition left={<Emoji emoji="🕵️‍♂️ " size="2.0rem" />} right={t('propositions.noDataUpload')} />}
      />
    </div>
  );
};
