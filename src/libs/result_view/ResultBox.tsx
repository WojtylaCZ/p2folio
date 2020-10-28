import Paper from '@material-ui/core/Paper';
import React from 'react';

import './ResultBox.css';

export const ResultBox = (props: any) => {
  return (
    <Paper>
      <div className="ResultBox">
        {props.title}
        {props.value}
      </div>
    </Paper>
  );
};
