import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Currency } from '../common/enums';
import App from '../componentsV1/App';
import { LoginPage } from '../libs/authentication/Login.page';
import { SignUpPage } from '../libs/authentication/SignUp.page';
import { MintosPlatform } from '../libs/core/platforms/MintosPlatform';
import {
  IOneMonthPortfolioResult,
  IPortfolioResult,
  SupportedPlatform,
  SupportedPlatformTypes,
} from '../libs/core/platforms/models';
import { Platform } from '../libs/core/platforms/Platform';
import { TwinoPlatform } from '../libs/core/platforms/TwinoPlatform';
import {
  createZeroPortfolioResult,
  detectPlatform,
  sumTwoPortfolioResultsWithOptionalForexConversion,
} from '../libs/core/platforms/utils';
import { ZonkyPlatform } from '../libs/core/platforms/ZonkyPlatform';
import { ForexPage } from '../libs/forex/Forex.page';
import { PlatformPage } from '../libs/platform/Platform.page';
import { Portfolio } from '../libs/portfolio/Portfolio.page';
import AddNewRawFileContext from '../shared/contexts/AddNewRawFileContext';
import Dataset from '../shared/contexts/DatasetContext';

export type NewRawFile = {
  name: string;
  data: ArrayBuffer;
};

export type Dataset = {
  portfolio: {
    currency: Currency;
    monthlyResults: IOneMonthPortfolioResult[];
    result: IPortfolioResult;
  };
  platforms: Map<SupportedPlatformTypes, Map<Currency, Platform>>;
  numberOfPlatforms: number;
};

export const Body = () => {
  const [dataset, setDataset] = useState({
    portfolio: {
      currency: Currency.EUR,
      result: createZeroPortfolioResult(Currency.EUR),
    },
    platforms: new Map([
      [SupportedPlatformTypes.MINTOS, new Map()],
      [SupportedPlatformTypes.TWINO, new Map()],
      [SupportedPlatformTypes.ZONKY, new Map()],
    ]),
    numberOfPlatforms: 0,
  } as Dataset);

  useEffect(() => {
    console.log(dataset);
  });

  const addNewRawFile = (file: NewRawFile) => {
    const { name, data } = file;

    const platformType = detectPlatform(name);
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

    platformData.parseASFile(data);
    platformData.processTransactions();

    let newPortfolioCurrency = platformData.currency;
    const newPortfolioResult = createZeroPortfolioResult(platformData.currency);
    sumTwoPortfolioResultsWithOptionalForexConversion(
      platformData.getPortfolioResult(),
      newPortfolioResult,
      0,
      platformData.currency
    );

    if (dataset.numberOfPlatforms > 0) {
      sumTwoPortfolioResultsWithOptionalForexConversion(
        dataset.portfolio.result,
        newPortfolioResult,
        0,
        dataset.portfolio.currency
      );
      newPortfolioCurrency = dataset.portfolio.currency;
    }

    setDataset((prevData: Dataset) => {
      prevData.portfolio.currency = newPortfolioCurrency;
      prevData.portfolio.result = newPortfolioResult;
      prevData.platforms.get(platformData.platform)!.set(platformData.currency, platformData);
      prevData.numberOfPlatforms = prevData.numberOfPlatforms + 1;
      return { ...prevData };
    });
  };

  const datasetValue = { dataset };
  const addNewRawFileValue = { addNewRawFile };
  return (
    <Dataset.Provider value={datasetValue}>
      <AddNewRawFileContext.Provider value={addNewRawFileValue}>
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
      </AddNewRawFileContext.Provider>
    </Dataset.Provider>
  );
};
