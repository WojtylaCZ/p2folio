import { Moment } from 'moment';

import { MintosPlatform } from './MintosPlatform';
import { TwinoPlatform } from './TwinoPlatform';
import { ZonkyPlatform } from './ZonkyPlatform';

export type SupportedPlatform = MintosPlatform | TwinoPlatform | ZonkyPlatform;

export enum SupportedPlatformTypes {
  MINTOS = 'mintos',
  TWINO = 'twino',
  ZONKY = 'zonky'
}

export interface IBaseResult<ExtraReceived, InterestReceived, FeePaid> {
  deposit: {
    deposit?: Dinero.Dinero;
  };
  withdrawal: {
    withdrawal?: Dinero.Dinero;
  };
  principalReceived: {
    principalReceived?: Dinero.Dinero;
  };
  interestReceived: InterestReceived;
  extraReceived: ExtraReceived;
  feesPaid: FeePaid;
}

export interface IMonthlyResults<ExtraReceived, InterestReceived, FeePaid> {
  month: Moment;
  result: IBaseResult<ExtraReceived, InterestReceived, FeePaid>;
}

export interface ITransaction<ExtraReceived, InterestReceived, FeePaid> {
  processingDate: Moment;
  result: IBaseResult<ExtraReceived, InterestReceived, FeePaid>;
}
