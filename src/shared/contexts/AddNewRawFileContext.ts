import React from 'react';

import { NewRawFile } from '../../page/Body';

export type AddNewRawFileContext = {
  addNewRawFile: (file: NewRawFile) => void;
};

export default React.createContext<AddNewRawFileContext>({
  addNewRawFile: (file: NewRawFile) => {} // tslint:disable-line
});
