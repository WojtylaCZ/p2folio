import React from 'react';
import ReactGA from 'react-ga';

import { loadSelectedFile } from '../common/utils';

import { FileUploadInputProps } from './App';
import './UploadFilesInput.css';

class UploadFilesInput extends React.Component<FileUploadInputProps> {
  public onLoadHandler(event: any, filename: string) {
    ReactGA.event({
      category: 'FileUpload',
      action: 'Choose file',
    });
    this.props.onRawFileUploaded(event.target.result, filename);
  }

  public onFileInputChange(event: any) {
    const files = event.target.files;

    this.onLoadHandler = this.onLoadHandler.bind(this);
    for (const file of files) {
      loadSelectedFile(file, this.onLoadHandler);
    }
  }

  public render() {
    return (
      <div id="choose_file">
        <input
          type="file"
          disabled={!this.props.uploadEnabled}
          multiple={true}
          onChange={(e) => {
            this.onFileInputChange(e);
          }}
        />
      </div>
    );
  }
}

export default UploadFilesInput;
