import Button from '@material-ui/core/Button';
import React from 'react';

import './DragAndDrop.css';

export const DragAndDrop = () => {
  return (
    <div
      className="Dndarea"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <div className="Dndtitle">
        <b>Sem pretahnete soubory</b> <br /> s vypisy z vasich platforem
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{
          height: '3em',
          borderRadius: '4px',
          backgroundColor: '#195bdd'
        }}
      >
        VYBRAT SOUBORY RUCNE
      </Button>
      Jak ziskat vypis z platforem?
    </div>
  );
};
