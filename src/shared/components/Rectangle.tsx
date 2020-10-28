import React from 'react';

import './Rectangle.css';

export const Rectangle = (props: any) => {
  return (
    <div className="Rectangle" style={{ width: props.width }}>
      {props.content}
    </div>
  );
};
