import React from 'react';

import { loadSelectedFile } from '../common/utils';

import { RawFileUploadedProps } from './App';

class UploadFilesInput extends React.Component<RawFileUploadedProps> {
  public onLoadHandler(event: any, filename: string) {
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
      <div className="ui segment">
        <input
          type="file"
          multiple={true}
          onChange={e => {
            this.onFileInputChange(e);
          }}
        />
      </div>
    );
  }
}

export default UploadFilesInput;
