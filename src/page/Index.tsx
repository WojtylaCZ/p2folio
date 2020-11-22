import React from 'react';

import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';

export const Index = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1300px', margin: 'auto' }}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
