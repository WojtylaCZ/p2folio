import Dinero from 'dinero.js';
import moment from 'moment';
import xlsx from 'xlsx';

import { Currency, FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { IGeneralDeposit, IGeneralWithdrawal, ITransaction, SupportedPlatformTypes } from './models';
import { Platform } from './Platform';
import { getNewTransactionFactory } from './utils';

enum MintosASFileColumnHeadersDefs {
  TransactionId = 'TransactionId',
  Date = 'Date',
  Details = 'Details',
  Turnover = 'Turnover',
  Balance = 'Balance',
  Currency = 'Currency'
}

export interface IMintosDeposit extends IGeneralDeposit {
  incomingCurrencyExchange?: Dinero.Dinero;
}

export interface IMintosExtraReceived {
  referalReceived?: Dinero.Dinero;
  cashbackReceived?: Dinero.Dinero;
}

export interface IMintosFeesPaid {
  currencyExchangeFeePaid?: Dinero.Dinero;
  secondaryMarketFeePaid?: Dinero.Dinero;
}

export interface IMintosInterestReceived {
  interestReceived?: Dinero.Dinero;
  penaltyReceived?: Dinero.Dinero;
}

export interface IMintosWithdrawal extends IGeneralWithdrawal {
  outgoingCurrencyExchange?: Dinero.Dinero;
}

export class MintosPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.MINTOS;
  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.includes(MintosPlatform.platformFilenameSubstring) && fullFilename.endsWith(MintosPlatform.platformFileType)
    );
  }
  private static readonly platformFilenameSubstring = 'account-statement';
  private static readonly platformFileType = FileTypes.XLSX;
  private static readonly ASFileColumnHeaders = [
    MintosASFileColumnHeadersDefs.TransactionId,
    MintosASFileColumnHeadersDefs.Date,
    MintosASFileColumnHeadersDefs.Details,
    MintosASFileColumnHeadersDefs.Turnover,
    MintosASFileColumnHeadersDefs.Balance,
    MintosASFileColumnHeadersDefs.Currency
  ];

  public currency = Currency.EUR;

  public parseASFile(rawFile: ArrayBuffer) {
    const firstSheet = getFirstWorkSheetFromRawFile(rawFile);

    const transactionLog: any[] = xlsx.utils.sheet_to_json(firstSheet, {
      header: MintosPlatform.ASFileColumnHeaders,
      raw: false,
      blankrows: false,
      defval: 0.0,
      range: 1
    });
    this.transactionLog = transactionLog;
  }

  protected *getTransaction(): IterableIterator<
    ITransaction<IMintosExtraReceived, {}, IMintosFeesPaid, IMintosDeposit, IMintosWithdrawal>
  > {
    for (const transactionRecord of this.transactionLog) {
      const processingDate = moment(transactionRecord[MintosASFileColumnHeadersDefs.Date], 'YYYY-MM-DD HH:mm:ss');
      const transaction = getNewTransactionFactory(processingDate);

      const currency = transactionRecord[MintosASFileColumnHeadersDefs.Currency];
      const rawAmount = parseFloat(transactionRecord[MintosASFileColumnHeadersDefs.Turnover]).toString();

      const amount = this.getAmount(rawAmount, currency);

      switch (transactionRecord[MintosASFileColumnHeadersDefs.Details]) {
        case 'Refer a friend bonus':
          transaction.result.extraReceived.referalReceived = amount;
          break;
        case 'Cashback bonus':
          transaction.result.extraReceived.cashbackReceived = amount;
          break;
        case 'Incoming client payment':
          transaction.result.deposit.deposit = amount;
          break;
        case 'FX commission':
          transaction.result.feesPaid.currencyExchangeFeePaid = amount;
          break;
      }

      if (transactionRecord[MintosASFileColumnHeadersDefs.Details].toLowerCase().indexOf('interest income') >= 0) {
        transaction.result.interestReceived.interestReceived = amount;
      } else if (transactionRecord[MintosASFileColumnHeadersDefs.Details].startsWith('Secondary market fee')) {
        transaction.result.feesPaid.secondaryMarketFeePaid = amount;
      } else if (transactionRecord[MintosASFileColumnHeadersDefs.Details].startsWith('Late payment fee income')) {
        transaction.result.interestReceived.penaltyReceived = amount;
      } else if (transactionRecord[MintosASFileColumnHeadersDefs.Details].startsWith('Incoming currency exchange transaction')) {
        transaction.result.deposit.incomingCurrencyExchange = amount;
      } else if (transactionRecord[MintosASFileColumnHeadersDefs.Details].startsWith('Outgoing currency exchange transaction')) {
        transaction.result.withdrawal.outgoingCurrencyExchange = amount;
      } else if (
        transactionRecord[MintosASFileColumnHeadersDefs.Details].startsWith('Discount/premium for secondary market transaction')
      ) {
        // TODO
      }

      yield transaction;
    }
  }

  protected getNewBaseResultFactory() {
    return {
      deposit: {
        deposit: Dinero({ currency: this.currency }),
        incomingCurrencyExchange: Dinero({ currency: this.currency })
      },
      extraReceived: {
        cashbackReceived: Dinero({ currency: this.currency }),
        referalReceived: Dinero({ currency: this.currency })
      },
      feesPaid: {
        currencyExchangeFeePaid: Dinero({ currency: this.currency }),
        secondaryMarketFeePaid: Dinero({ currency: this.currency })
      },
      interestReceived: {
        interestReceived: Dinero({ currency: this.currency }),
        penaltyReceived: Dinero({ currency: this.currency })
      },
      principalReceived: {},
      withdrawal: {
        withdrawal: Dinero({ currency: this.currency }),
        outgoingCurrencyExchange: Dinero({ currency: this.currency })
      }
    };
  }

  private getAmount(rawAmount: string, currency: Currency): Dinero.Dinero {
    let amountPrecision = 0;
    if (rawAmount.indexOf('.') >= 0) {
      amountPrecision = rawAmount.length - (rawAmount.indexOf('.') + 1);
    }
    const intAmount = Math.abs(parseInt(rawAmount.replace(/\./g, ''), 10));
    return Dinero({
      amount: intAmount,
      precision: amountPrecision,
      currency
    });
  }
}
