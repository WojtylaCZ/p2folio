import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
        {t('dragAndDrop.dragFilesHere')}
        <br />
        {t('dragAndDrop.dragFilesHere2')}
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
