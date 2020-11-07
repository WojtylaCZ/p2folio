import React from 'react';

export const Emoji = (props: any) => {
  return <span style={{ fontSize: props.size }}>{props.emoji} </span>;
};
