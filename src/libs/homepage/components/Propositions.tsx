import React from 'react';

import { Rectangle } from '../../../shared/components/Rectangle';

import { Proposition } from './Proposition';

export const Propositions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      👉 P2Folio vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi <br />
      👉 zkombinuje výsledky dohromady pro historický vývoj celého portfolia
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
