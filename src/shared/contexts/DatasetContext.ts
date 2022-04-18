import React from 'react';

import { Dataset } from '../../page/Body';

export type DatasetContext = {
  dataset: Dataset;
};

export default React.createContext<DatasetContext>({
  dataset: {} as Dataset
});
