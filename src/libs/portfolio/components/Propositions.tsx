import React from 'react';

import { Emoji } from '../../../shared/components/Emoji';
import { Rectangle } from '../../../shared/components/Rectangle';

import { Proposition } from './Proposition';

export const Propositions = () => {
  return (
    <div>
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={
          <Proposition left={<Emoji emoji="🔐" size="2.0rem" />} right={'Vaše data jsou v bezpečí jen u vás v prohlížeči.'} />
        }
      />
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={
          <Proposition
            left={<Emoji emoji="🦸‍♂️" size="2.0rem" />}
            right={' Vše je anonymní, data se nikam se neodesílají, služba nemá žádnou další část.'}
          />
        }
      />
      <Rectangle
        marginTop="1em"
        marginBottom="1em"
        content={
          <Proposition
            left={<Emoji emoji="🕵️‍♂️ " size="2.0rem" />}
            right={'Jakmile stránku aktualizujete, všechna data jsou ztracena.'}
          />
        }
      />
    </div>
  );
};
