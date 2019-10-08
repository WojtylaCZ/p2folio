import React from 'react';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { SupportedPlatform, SupportedPlatformTypes } from '../core/platforms/models';
import { TwinoPlatform } from '../core/platforms/TwinoPlatform';
import { detectPlatform } from '../core/platforms/utils';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import DragAndDropFilesInput from './DragAndDropFilesInput';
import PlatformListView from './PlatformListView';
import UploadFilesInput from './UploadFilesInput';

export type RawFileUploadedProps = {
  onRawFileUploaded: (rawFile: ArrayBuffer, filename: string) => void;
};

type AppState = {
  portfolioPlatforms: (SupportedPlatform)[];
};

class App extends React.Component<{}, AppState> {
  public state = { portfolioPlatforms: [] };

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
        portfolioPlatforms: [...prevState.portfolioPlatforms, platformData]
      }));
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    return (
      <div>
        <div>
          <UploadFilesInput onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)} />
          <DragAndDropFilesInput onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)} />
          Account statements: {this.state.portfolioPlatforms ? this.state.portfolioPlatforms.length : '0'}
        </div>
        <div>
          <PlatformListView portfolioPlatforms={this.state.portfolioPlatforms} />
        </div>
      </div>
    );
  }
}

export default App;
