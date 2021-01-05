import Button from '@material-ui/core/Button';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import './DragAndDrop.css';

export const DragAndDrop = () => {
  const { t } = useTranslation();

  return (
    <div
      className="Dndarea"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <div className="Dndtitle" style={{ textAlign: 'center' }}>
        <Trans i18nKey="dragAndDrop.dragFilesHere">
          <strong>top</strong>
          <br />
          bottom
        </Trans>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{
          height: '3em',
          borderRadius: '4px',
          backgroundColor: '#195bdd'
        }}
      >
        {t('buttons.selectStatementFiles')}
      </Button>

      {t('links.howToGetStatementFiles')}
    </div>
  );
};
