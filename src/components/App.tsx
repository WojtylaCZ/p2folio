import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import ReactGA from 'react-ga';

import { MintosPlatform } from '../core/platforms/MintosPlatform';
import { SupportedPlatform, SupportedPlatformTypes } from '../core/platforms/models';
import { TwinoPlatform } from '../core/platforms/TwinoPlatform';
import { detectPlatform } from '../core/platforms/utils';
import { ZonkyPlatform } from '../core/platforms/ZonkyPlatform';

import './App.css';
import DragAndDropFilesInput from './DragAndDropFilesInput';
import PlatformsTabMenuView from './PlatformsTabMenuView';
import UploadFilesInput from './UploadFilesInput';

export type FileUploadInputProps = {
  onRawFileUploaded: (rawFile: ArrayBuffer, filename: string) => void;
  uploadEnabled: boolean;
};

interface INewRawFile {
  filename: string;
  rawFile: ArrayBuffer;
}

type AppState = {
  newRawFiles: INewRawFile[];
  portfolioPlatforms: (SupportedPlatform)[];
  statementInfo?: string;
  uploadEnabled: boolean;
};

class App extends React.Component<{}, AppState> {
  public state = {
    newRawFiles: [] as INewRawFile[],
    portfolioPlatforms: [] as SupportedPlatform[],
    statementInfo: '',
    uploadEnabled: true
  };

  public handleUploadedRawFile(rawFile: ArrayBuffer, filename: string) {
    this.setState(prevState => ({
      newRawFiles: [...prevState.newRawFiles, { filename, rawFile }],
      uploadEnabled: false,
      // if error occurs while loading multiple files, keep it
      // if there is a new upload, erase the error
      statementInfo: prevState.newRawFiles.length ? prevState.statementInfo : ''
    }));
  }

  public componentDidUpdate() {
    setTimeout(this.processNewRawFile, 900);
  }

  public render() {
    let statementsInfo;
    if (this.state.statementInfo) {
      statementsInfo = this.state.statementInfo;
    } else if (this.state.newRawFiles.length > 0) {
      statementsInfo = 'Soubory se zpracovávají... (může to trvat déle, vyčkejte)';
    } else {
      statementsInfo = `Úspěšné zpracovaných výpisů z platforem: ${this.state.portfolioPlatforms.length}`;
    }

    return (
      <div className="content">
        <div className="paper">
          <Paper square={true}>
            <div className="paper">
              <Grid container={true} justify="space-between" style={{ paddingTop: '10px' }}>
                <Grid item={true} style={{ maxWidth: '750px' }}>
                  Sjednocuje data z různých P2P platforem pro kompaktní statistiky a přehled celého portfolia.
                  <p>
                    P2folio vám zobrazí na výsledky z jednotlivých platforem na měsíční bázi. 📈📉 <br />
                    Zkombinuje výsledky dohromady pro historický vývoj celého portfolia. 🧩 <br />
                  </p>
                  <p>
                    <b>
                      Vaše data jsou v bezpečí jen u vás v prohlížeči. <br />
                      Vše je anonymní, data se nikam se neodesílají, služba nemá žádnou další část. <br />
                      Jakmile stránku aktualizujete, všechna data jsou ztracena. <br />
                    </b>
                  </p>
                  <p>
                    Ocením jakékoliv komentáře, návrhy, chyby. Třeba v této&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/groups/1813432205553867">
                      fb skupině
                    </a>
                    &nbsp;nebo na&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://www.p2pforum.cz/viewtopic.php?f=40&t=376">
                      diskuzním P2P fóru
                    </a>
                    .
                  </p>
                </Grid>
                <Grid item={true} style={{ padding: '5px' }}>
                  <div
                    className="fb-group"
                    data-href="https://www.facebook.com/groups/1813432205553867/"
                    data-width="250"
                    data-show-social-context="true"
                    data-show-metadata="false"
                  />
                </Grid>
              </Grid>
            </div>
          </Paper>
        </div>

        <div className="paper">
          <Paper square={true}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                Statistiky ze získáte z výpisů z účtu z jednotlivých platforem. Jak je získat:
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ul id="upload_tutorials">
                  <li>
                    <a href="https://www.zonky.cz" target="_blank" rel="noopener noreferrer">
                      Zonky.cz
                    </a>
                    - pro zobrazení dat z platformy se přihlaste do svého účtu, klikněte na záložky "X Kč máte k investování" nebo
                    "Zobrazit peněženku" a na této stránce dole vyberte možnost "Exportovat výpisy z účtu". Stáhněte daný soubor
                    dle intrukcí a nahrajte je sem.
                  </li>
                  <li>
                    <a href="https://www.mintos.com" target="_blank" rel="noopener noreferrer">
                      Mintos.com
                    </a>
                    - otevřete záložku "Account Statement" ve vašem účtě a vyberte měnu EUR (zatím jediná podporovaná). Pro "Start
                    Date" zvolte nějaké datum dávno v minulosti - například (např. 11.12.2013) a klikněte na "Search". Pod
                    tabulkou s celkovým přehledem je tlačítko "Download Selected List". Stáhněte daný soubor a naimportujte jej
                    sem.
                  </li>
                  <li>
                    <a href="https://www.twino.eu" target="_blank" rel="noopener noreferrer">
                      Twino.eu
                    </a>
                    - přihlaste do svého účtu, klikněte na záložku "My Investment" a následně na "Account Statement". Pro "Start
                    Date" filtr zadejte nějaký den dávno v minulosti (např. 11.12.2013) a vyčkejte až se nahrají data. Klikně na
                    tlačítko "Download". Stáhněte daný soubor a nahrajte jej sem.
                  </li>
                  <li> Jakou další platformu?</li>
                </ul>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
        </div>

        <div className="paper" style={{ paddingTop: '20px' }}>
          <Paper square={true}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flexGrow: 1 }}>
                <UploadFilesInput
                  uploadEnabled={this.state.uploadEnabled}
                  onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)}
                />
              </div>
              <div style={{ flexGrow: 1 }}>
                <DragAndDropFilesInput
                  uploadEnabled={this.state.uploadEnabled}
                  onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)}
                />
              </div>
            </div>
            <Paper id="statements_info" square={true}>
              <b>{statementsInfo} </b>
            </Paper>
          </Paper>
        </div>

        <div className="paper" style={{ paddingTop: '10px' }}>
          <PlatformsTabMenuView portfolioPlatforms={this.state.portfolioPlatforms} />
        </div>
      </div>
    );
  }

  private processNewRawFile = () => {
    if (this.state.newRawFiles.length > 0) {
      const { filename, rawFile } = this.state.newRawFiles[0];
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

        ReactGA.event({
          category: 'PlatformUsed',
          action: platformData.platform
        });

        const existingDataIndex = this.state.portfolioPlatforms.findIndex(platform => {
          return platform.platform === platformData.platform && platform.currency === platformData.currency;
        });

        platformData.parseASFile(rawFile);
        platformData.processTransactions();

        this.setState(prevState => {
          if (existingDataIndex >= 0) {
            prevState.portfolioPlatforms.splice(existingDataIndex, 1);
          }
          return {
            newRawFiles: prevState.newRawFiles.slice(1, prevState.newRawFiles.length),
            portfolioPlatforms: [...prevState.portfolioPlatforms, platformData],
            uploadEnabled: true
          };
        });
      } catch (e) {
        console.log(e);
        this.setState(prevState => ({
          newRawFiles: prevState.newRawFiles.slice(1),
          statementInfo: 'ERROR: chyba při zpracováni souboru ' + prevState.newRawFiles[0].filename,
          uploadEnabled: true
        }));
      }
    }
  };
}

export default App;
