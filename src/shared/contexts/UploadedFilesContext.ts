import React from 'react';

import { UploadedFile } from '../../page/Body';

export type UploadedFilesContext = {
  uploadedFiles: UploadedFile[];
  addUploadedFile: (uploadedFile: UploadedFile) => void;
};

export default React.createContext<UploadedFilesContext>({
  uploadedFiles: [],
  addUploadedFile: (uploadedFile: UploadedFile) => {} // tslint:disable-line
});
