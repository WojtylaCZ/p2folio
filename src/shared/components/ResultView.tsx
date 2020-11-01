import React from 'react';

import { ForexSelect } from '../../libs/forex/components/ForexSelect';
import { CumulativeGraph } from '../../libs/graphs/Cumulative';

import { ResultBox } from './ResultBox';

export const ResultView = () => {
  return (
    <div>
      <ForexSelect />
      <CumulativeGraph />

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultBox title="Celkove vklady" value="200 000" />
        <ResultBox title="Celkove vybery" value="100 000" />
        <ResultBox title="Prijate jistiny" value="300 000" />
        <ResultBox title="Prijate uroky" value="100 000" />
      </div>
    </div>
  );
};
