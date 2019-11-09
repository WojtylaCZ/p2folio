import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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
  uploadEnabled: boolean;
};

class App extends React.Component<{}, AppState> {
  public state = { newRawFiles: [], portfolioPlatforms: [], uploadEnabled: true };

  public handleUploadedRawFile(rawFile: ArrayBuffer, filename: string) {
    this.setState(prevState => ({
      newRawFiles: [...prevState.newRawFiles, { filename, rawFile }],
      uploadEnabled: false
    }));
  }

  public componentDidUpdate() {
    setTimeout(this.processNewRawFile, 900);
  }

  public render() {
    let statementsInfo;
    if (this.state.newRawFiles.length > 0) {
      statementsInfo = 'Soubory se zpracovávají... (může to trvat déle, vyčkejte)';
    } else {
      statementsInfo = `Úspěšné zpracovaných výpisů z platforem: ${this.state.portfolioPlatforms.length}`;
    }

    return (
      <div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/WojtylaCZ/p2folio"
            className="github-corner"
            aria-label="View source on GitHub"
          >
            <svg
              width={80}
              height={80}
              viewBox="0 0 250 250"
              style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0, zIndex: 1 }}
              aria-hidden="true"
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: '130px 106px' }}
                className="octo-arm"
              />
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                className="octo-body"
              />
            </svg>
          </a>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}'
            }}
          />
        </div>

        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">P2folio - testovací beta verze</Typography>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <p>
            <b>P2folio sjednocuje data z různých P2P platforem pro kompaktní statistiky a přehled celého portfolia.</b>
          </p>
          <p>
            Ocením jakékoliv komentáře, návrhy nebo hlášení chyb. Třeba v této&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/groups/1813432205553867">
              facebookové skupině pro P2P investory
            </a>
            &nbsp;nebo na{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/WojtylaCZ/p2folio">
              GitHubu
            </a>
            .
          </p>

          <p>Statistiky ze získají z výpisů z účtu z jednotlivých platforem. Jak je získat:</p>

          <ul id="upload_tutorials">
            <li>
              {' '}
              <a href="https://www.zonky.cz" target="_blank" rel="noopener noreferrer">
                {' '}
                Zonky.cz
              </a>{' '}
              - pro zobrazení dat z platformy se přihlaste do svého účtu, klikněte na záložky "X Kč máte k investování" nebo
              "Zobrazit peněženku" a na této stránce dole vyberte možnost "Exportovat výpisy z účtu". Stáhněte daný soubor dle
              intrukcí a nahrajte je sem.
            </li>
            <li>
              <a href="https://www.mintos.com" target="_blank" rel="noopener noreferrer">
                {' '}
                Mintos.com
              </a>{' '}
              - otevřete záložku "Account Statement" ve vašem účtě a vyberte měnu EUR (zatím jediná podporovaná). Pro "Start Date"
              zvolete nějaké datum dávno v minulosti - například (např. 11.12.2013) a klikněte na "Search". Pod tabulkou s
              celkovým přehledem je tlačítko "Download Selected List". Stáhněte daný soubor a naimportujte jej sem.
            </li>
            <li>
              {' '}
              <a href="https://www.twino.eu" target="_blank" rel="noopener noreferrer">
                {' '}
                Twino.eu
              </a>{' '}
              - přihlaste do svého účtu, klikněte na záložku "My Investment" a následně na záložku "Account Statement". Pro "Start
              Date" filtr zadejte nějaký den dávno v minulosti (např. 11.12.2013) a vyčkejte až se nahrají data. Klikně na
              tlačítko "Download". Stáhněte daný soubor a nahrajte jej sem.
            </li>
            <li> Jakou další platformu?</li>
          </ul>
        </div>

        <p>
          <b>
            Data jsou zpracována pouze ve vašem prohlížeči. Nikam se neodesílají, služba nemá žádnou další část.
            <br />
            Pokud stránku aktualizujete, všechna data jsou ztracena.
          </b>
        </p>

        <div className="paper">
          <Paper square={true}>
            <Grid container={true}>
              <Grid item={true} xs={6}>
                <UploadFilesInput
                  uploadEnabled={this.state.uploadEnabled}
                  onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)}
                />
              </Grid>
              <Grid item={true} xs={6}>
                <DragAndDropFilesInput
                  uploadEnabled={this.state.uploadEnabled}
                  onRawFileUploaded={(rawfile, filename) => this.handleUploadedRawFile(rawfile, filename)}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Paper id="statements_info" square={true}>
                  <b>{statementsInfo} </b>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="paper" style={{ paddingTop: '30px' }}>
          <PlatformsTabMenuView portfolioPlatforms={this.state.portfolioPlatforms} />
        </div>

        <div className="paper" style={{ paddingTop: '30px' }}>
          <Paper id="footer" square={true} style={{ padding: '5px' }}>
            2019 @ Vojtech Uhlir
          </Paper>
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

        platformData.parseASFile(rawFile);
        platformData.processTransactions();

        this.setState(prevState => ({
          newRawFiles: prevState.newRawFiles.slice(1, prevState.newRawFiles.length),
          portfolioPlatforms: [...prevState.portfolioPlatforms, platformData],
          uploadEnabled: true
        }));
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export default App;
