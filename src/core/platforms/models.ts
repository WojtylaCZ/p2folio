import { Moment } from 'moment';

import {
  IMintosDeposit,
  IMintosExtraReceived,
  IMintosFeesPaid,
  IMintosInterestReceived,
  IMintosWithdrawal,
  MintosPlatform
} from './MintosPlatform';
import { TwinoPlatform } from './TwinoPlatform';
import { IZonkyFeesPaid, IZonkyInterestReceived, ZonkyPlatform } from './ZonkyPlatform';

export type SupportedPlatform = MintosPlatform | TwinoPlatform | ZonkyPlatform;

export enum SupportedPlatformTypes {
  MINTOS = 'mintos',
  TWINO = 'twino',
  ZONKY = 'zonky'
}

export interface IPortfolioResult {
  deposit: Dinero.Dinero;
  withdrawal: Dinero.Dinero;
  principalReceived: Dinero.Dinero;
  interestReceived: Dinero.Dinero;
  extraReceived: Dinero.Dinero;
  feesPaid: Dinero.Dinero;
}

export interface IGeneralDeposit {
  deposit?: Dinero.Dinero;
}

export interface IGeneralWithdrawal {
  withdrawal?: Dinero.Dinero;
}

export interface IBaseResult<ExtraReceived, InterestReceived, FeePaid, Deposit, Withdrawal> {
  deposit: Deposit;
  withdrawal: Withdrawal;
  principalReceived: {
    principalReceived?: Dinero.Dinero;
  };
  interestReceived: InterestReceived;
  extraReceived: ExtraReceived;
  feesPaid: FeePaid;
}

export interface IMonthlyResults<ExtraReceived, InterestReceived, FeePaid, Deposit, Withdrawal> {
  month: Moment;
  result: IBaseResult<ExtraReceived, InterestReceived, FeePaid, Deposit, Withdrawal>;
}

export interface ITransaction<ExtraReceived, InterestReceived, FeePaid, Deposit, Withdrawal> {
  processingDate: Moment;
  result: IBaseResult<ExtraReceived, InterestReceived, FeePaid, Deposit, Withdrawal>;
}

export type IDepositOptions = IGeneralDeposit | IMintosDeposit;
export type IExtraReceivedOptions = IMintosExtraReceived | {};
export type IFeePaidOptions = IMintosFeesPaid | IZonkyFeesPaid;
export type IInterestReceivedOptions = IMintosInterestReceived | IZonkyInterestReceived;

export type IWithdrawalOptions = IGeneralWithdrawal | IMintosWithdrawal;
