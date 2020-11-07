import React from 'react';

import './Rectangle.css';

export const Rectangle = (props: any) => {
  return (
    <div className="Rectangle" style={{ width: props.width, margin: '1.1em' }}>
      {props.content}
    </div>
  );
};
