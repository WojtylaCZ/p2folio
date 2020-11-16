import React from 'react';

export const ResultBox = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', margin: '1em' }}>
      <div> {props.title} </div>
      <div className="Proposition-text">{props.value}</div>
    </div>
  );
};
