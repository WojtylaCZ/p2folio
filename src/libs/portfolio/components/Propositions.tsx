import React from 'react';

import { Rectangle } from '../../../shared/components/Rectangle';

import { Proposition } from './Proposition';

export const Propositions = () => {
  return (
    <div>
      <Rectangle width="620px" content={<Proposition left={'🔐'} right={'Vaše data jsou v bezpečí jen u vás v prohlížeči.'} />} />
      <Rectangle
        width="620px"
        content={
          <Proposition left={'🦸‍♂️'} right={' Vše je anonymní, data se nikam se neodesílají, služba nemá žádnou další část.'} />
        }
      />
      <Rectangle
        width="620px"
        content={<Proposition left={'🕵️‍♂️ '} right={'Jakmile stránku aktualizujete, všechna data jsou ztracena.'} />}
      />
    </div>
  );
};
