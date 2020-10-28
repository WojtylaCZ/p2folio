import Paper from '@material-ui/core/Paper';
import React from 'react';

import { CurrencySelectForm } from '../../shared/components/CurrencySelectForm';
import { ForexNavLink } from '../../shared/components/ForexNavLink';
import { CumulativeGraph } from '../graphs/Cumulative';

import { ResultBox } from './ResultBox';

export const ResultView = () => {
  return (
    <div>
      <CurrencySelectForm />
      <ForexNavLink />

      <Paper>
        <CumulativeGraph />
      </Paper>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultBox title="Celkove vklady" value="200 000" />
        <ResultBox title="Celkove vybery" value="100 000" />
        <ResultBox title="Prijate jistiny" value="300 000" />
        <ResultBox title="Prijate uroky" value="100 000" />
      </div>
    </div>
  );
};
