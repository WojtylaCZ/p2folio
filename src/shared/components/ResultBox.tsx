import React from 'react';

export const ResultBox = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
      <h4>{props.title} </h4>
      <h5> {props.value} </h5>
    </div>
  );
};
