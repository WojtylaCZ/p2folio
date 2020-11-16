import React from 'react';

import './Rectangle.css';

export const Rectangle = (props: any) => {
  return (
    <div
      className={props.squared ? 'RectangleSquared' : 'RectangleShadow'}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...props }}
    >
      {props.content}
    </div>
  );
};
