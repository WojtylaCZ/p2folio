import React from 'react';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { SupportedPlatform, SupportedPlatformTypes } from '../core/platforms/models';
import { TwinoPlatform } from '../core/platforms/TwinoPlatform';
import { detectPlatform } from '../core/platforms/utils';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import DragAndDropFilesInput from './DragAndDropFilesInput';
import UploadFilesInput from './UploadFilesInput';

export type RawFileUploadedProps = {
  onRawFileUploaded: (rawFile: ArrayBuffer, filename: string) => void;
};

type AppState = {
  portfolioPlatformDataArray: (SupportedPlatform)[];
};

class App extends React.Component<{}, AppState> {
  public state = { portfolioPlatformDataArray: [] };

  public handleUploadedRawFile(rawFile: ArrayBuffer, filename: string) {
    try {
      const platformType = detectPlatform(filename);
      let platformData: SupportedPlatform;

      switch (platformType) {
        case SupportedPlatformTypes.MINTOS:
          platformData = new MintosPlatform();
          break;
        case SupportedPlatformTypes.TWINO:
          platformData = new TwinoPlatform();
          break;
        case SupportedPlatformTypes.ZONKY:
          platformData = new ZonkyPlatform();
          break;
        default:
          throw Error('unknown platform');
      }

      platformData.parseASFile(rawFile);
      platformData.processTransactions();

      this.setState(prevState => ({
        portfolioPlatformDataArray: [...prevState.portfolioPlatformDataArray, platformData]
      }));
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    return (
      <div>
        <UploadFilesInput onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)} />
        <DragAndDropFilesInput onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)} />
        Account statements: {this.state.portfolioPlatformDataArray ? this.state.portfolioPlatformDataArray.length : '0'}
      </div>
    );
  }
}

export default App;
