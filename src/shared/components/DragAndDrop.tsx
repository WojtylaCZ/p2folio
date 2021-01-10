import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import './DragAndDrop.css';

const defaultBgColorDnD = '#ffffff';
const dragOoverBgColorDnD = '#95959547';

export const DragAndDrop = () => {
  const { t } = useTranslation();

  const [uploadedFiles, setUploadedFiles] = useState([] as any[]);
  const [bgColor, setBgColor] = useState(defaultBgColorDnD);

  const handleFileReader = (files: any[]) => {
    for (const file of files) {
      const reader = new FileReader();

      reader.onload = () => {
        setUploadedFiles((prevFiles: any) => [...prevFiles, { fileName: file.name, uploadedFile: reader.result }]);
      };
      reader.onerror = ex => {
        // FIXME
        console.log(ex);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onFileInputChange = (event: any) => {
    event.preventDefault();

    handleFileReader(event.target.files);
  };

  const handleDragDrop = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    setBgColor(defaultBgColorDnD);
    handleFileReader(event.dataTransfer.files);
  };

  const handleDragOver = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setBgColor(dragOoverBgColorDnD);
  };

  const handleDragLeave = () => {
    setBgColor(defaultBgColorDnD);
  };

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  return (
    <div
      className="Dndarea"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: bgColor
      }}
      onDragOver={handleDragOver}
      onDrop={handleDragDrop}
      onDragLeave={handleDragLeave}
    >
      <div className="Dndtitle" style={{ textAlign: 'center' }}>
        <Trans i18nKey="dragAndDrop.dragFilesHere">
          <strong>top</strong>
          <br />
          bottom
        </Trans>
      </div>

      <input
        type="file"
        disabled={false}
        style={{ display: 'none' }}
        multiple={true}
        id="select-files-button"
        onChange={onFileInputChange}
      />

      <label htmlFor="select-files-button">
        <Button
          variant="contained"
          component="span"
          color="primary"
          style={{
            height: '3em',
            borderRadius: '4px',
            backgroundColor: '#195bdd'
          }}
        >
          {t('buttons.selectStatementFiles')}
        </Button>
      </label>

      {t('links.howToGetStatementFiles')}
    </div>
  );
};
