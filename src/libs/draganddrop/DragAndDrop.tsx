import Button from '@material-ui/core/Button';
import React from 'react';

import { MintosLogo } from '../../shared/icons/MintosLogo';
import { TwinoLogo } from '../../shared/icons/TwinoLogo';
import { ZonkyLogo } from '../../shared/icons/ZonkyLogo';

import './DragAndDrop.css';

export const DragAndDrop = () => {
  return (
    <div>
      <div className="Dndarea" style={{ width: 500, height: 200 }}>
        Sem pretahnete soubory s vypisy z vasich platforem
        <Button
          variant="contained"
          color="primary"
          style={{
            width: '380px',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#195bdd'
          }}
        >
          VYBRAT SOUBORY RUCNE
        </Button>
        <br />
        Jak ziskat vypis z platforem?
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MintosLogo width="12%" />
        <ZonkyLogo width="12%" />
        <TwinoLogo width="12%" filter="grayscale(100%)" />
      </div>
    </div>
  );
};
