import React, { ContextType, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../componentsV1/App';
import { LoginPage } from '../libs/authentication/Login.page';
import { SignUpPage } from '../libs/authentication/SignUp.page';
import { ForexPage } from '../libs/forex/Forex.page';
import { PlatformPage } from '../libs/platform/Platform.page';
import { Portfolio } from '../libs/portfolio/Portfolio.page';
import UploadedFilesContext from '../shared/contexts/UploadedFilesContext';

export type UploadedFile = {
  name: string;
  rawData: ArrayBuffer;
};

export const Body = () => {
  const [uploadedFiles, setUploadedFiles] = useState([] as UploadedFile[]);

  const addUploadedFile = (file: UploadedFile) => {
    setUploadedFiles((prevFiles: UploadedFile[]) => [...prevFiles, { name: file.name, rawData: file.rawData }]);
  };

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  return (
    <UploadedFilesContext.Provider value={{ uploadedFiles, addUploadedFile }}>
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <Switch>
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/signup" component={SignUpPage} exact={true} />
          <Route path="/forex" component={ForexPage} exact={true} />
          <Route path="/platforms/:platformId" component={PlatformPage} />
          <Route path="/v1" component={App} />
          <Route path="/" component={Portfolio} />
        </Switch>
      </div>
    </UploadedFilesContext.Provider>
  );
};
