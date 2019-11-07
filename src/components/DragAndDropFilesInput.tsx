import React from 'react';

import { loadSelectedFile } from '../common/utils';

import { FileUploadInputProps } from './App';
import './DragAndDropFilesInput.css';

class DragAndDropFilesInput extends React.Component<FileUploadInputProps> {
  public onLoadHandler(event: any, filename: string) {
    this.props.onRawFileUploaded(event.target.result, filename);
  }

  public handleDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  public handleFileSelect(event: any) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer.files;

    this.onLoadHandler = this.onLoadHandler.bind(this);
    for (const file of files) {
      loadSelectedFile(file, this.onLoadHandler);
    }
  }

  public render() {
    let dropZoneText;
    if (this.props.uploadEnabled) {
      dropZoneText = 'Přetáhněte soubory sem';
    } else {
      dropZoneText = 'Vyčkejte na zpracování souboru';
    }
    return (
      <div
        id="drop_zone"
        onDragOver={e => {
          this.handleDragOver(e);
        }}
        onDrop={e => this.handleFileSelect(e)}
      >
        {dropZoneText}
      </div>
    );
  }
}

export default DragAndDropFilesInput;
