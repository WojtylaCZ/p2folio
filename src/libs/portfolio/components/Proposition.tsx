import React from 'react';

export const Proposition = (props: any) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', margin: '1em' }}>
      <div style={{ width: '20%', textAlign: 'center' }}> {props.left} </div>
      <div style={{ width: '80%' }}>
        <h3> {props.right} </h3>
      </div>
    </div>
  );
};
