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
          <ul>
            <li> Pro Zonky, stahnete vypis z penezenky a naimportujte jej sem.</li>
            <li>
              For Mintos, go to Account Statement tab in your account, for Start Date filter put there some day very long time ago
              (eg.g 11.12.2013), hit Search. Below a first table, there is button Download Selected List. Download the file and
              import that file here.
            </li>
          </ul>
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
