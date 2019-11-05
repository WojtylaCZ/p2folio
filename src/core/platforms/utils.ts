import Dinero from 'dinero.js';
import { Moment } from 'moment';

import { Currency } from '../../common/enums';

import { MintosPlatform } from './MintosPlatform';
import { IPortfolioResult, ITransaction, SupportedPlatformTypes } from './models';
import { TwinoPlatform } from './TwinoPlatform';
import { ZonkyPlatform } from './ZonkyPlatform';

export function detectPlatform(filename: string): SupportedPlatformTypes {
  if (MintosPlatform.isPlatformFileValid(filename)) {
    return MintosPlatform.platform;
  } else if (TwinoPlatform.isPlatformFileValid(filename)) {
    return TwinoPlatform.platform;
  } else if (ZonkyPlatform.isPlatformFileValid(filename)) {
    return ZonkyPlatform.platform;
  } else {
    throw new Error('unknown file');
  }
}

export function getNewTransactionFactory(processingDate: Moment): ITransaction<any, any, any, any, any> {
  return {
    processingDate,
    result: {
      deposit: {},
      extraReceived: {},
      feesPaid: {},
      interestReceived: {},
      principalReceived: {},
      withdrawal: {}
    }
  };
}

export function getNewPortfolioResultFactory(currency: Currency): IPortfolioResult {
  return {
    deposit: Dinero({ currency }),
    extraReceived: Dinero({ currency }),
    feesPaid: Dinero({ currency }),
    interestReceived: Dinero({ currency }),
    principalReceived: Dinero({ currency }),
    withdrawal: Dinero({ currency })
  };
}
