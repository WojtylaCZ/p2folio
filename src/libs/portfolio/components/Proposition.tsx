import React from 'react';

import './Proposition.css';

export const Proposition = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
      {props.left}
      <div className="Proposition-text"> {props.right} </div>
    </div>
  );
};
