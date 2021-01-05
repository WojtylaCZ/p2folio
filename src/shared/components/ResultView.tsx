import React from 'react';
import { useTranslation } from 'react-i18next';

import { ForexSelect } from '../../libs/forex/components/ForexSelect';
import { CumulativeGraph } from '../../libs/graphs/Cumulative';

import { Rectangle } from './Rectangle';
import { ResultBox } from './ResultBox';

export const ResultView = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ForexSelect />
      <Rectangle
        justifyContent="flex-start"
        overflowX="auto"
        squared={true}
        content={
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', margin: '1em' }}>
            <CumulativeGraph />
          </div>
        }
      />

      <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Rectangle
          content={<ResultBox title={t('results.totalDeposit')} value="200 000 Kc" />}
          width="100%"
          maxWidth="323px"
          squared={true}
        />
        <Rectangle
          content={<ResultBox title={t('results.totalWithdrawal')} value="100 000 Kc" />}
          width="100%"
          maxWidth="323px"
          squared={true}
        />
        <Rectangle
          content={<ResultBox title={t('results.totalPrincipalReceived')} value="300 000 Kc" />}
          width="100%"
          maxWidth="323px"
          squared={true}
        />
        <Rectangle
          content={<ResultBox title={t('results.totalInterestsReceived')} value="100 000 Kc" />}
          width="100%"
          maxWidth="323px"
          squared={true}
        />
      </div>
    </div>
  );
};
