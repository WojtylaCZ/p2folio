import Dinero from 'dinero.js';
import moment from 'moment';
import xlsx from 'xlsx';

import { Currency, FileTypes } from '../../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../../common/utils';

import { IGeneralDeposit, IGeneralWithdrawal, ITransaction, SupportedPlatformTypes } from './models';
import { Platform } from './Platform';
import { getNewTransactionFactory } from './utils';

enum TwinoASFileColumnHeadersDefs {
  Date = 'Processing Date',
  TransactionId = 'Transaction ID',
  TransactionType = 'Type',
  PaymentType = 'Description',
  LoanId = 'Loan Number',
  ProcessingAmount = 'Amount, EUR',
}

export interface ITwinoInterestReceived {
  interestReceived?: Dinero.Dinero;
  penaltyReceived?: Dinero.Dinero;
}

export class TwinoPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.TWINO;

  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.startsWith(TwinoPlatform.platformFilenameSubstring) && fullFilename.endsWith(TwinoPlatform.platformFileType)
    );
  }

  private static readonly platformFilenameSubstring = 'account_statement';
  private static readonly platformFileType = FileTypes.XLSX;
  private static readonly dataColumnHeader = [
    TwinoASFileColumnHeadersDefs.Date,
    TwinoASFileColumnHeadersDefs.TransactionId,
    TwinoASFileColumnHeadersDefs.TransactionType,
    TwinoASFileColumnHeadersDefs.PaymentType,
    TwinoASFileColumnHeadersDefs.LoanId,
    TwinoASFileColumnHeadersDefs.ProcessingAmount,
  ];

  public readonly platform = TwinoPlatform.platform;
  public currency = Currency.EUR;

  public parseASFile(rawFile: ArrayBuffer) {
    const firstSheet = getFirstWorkSheetFromRawFile(rawFile);

    const transactionLog: any[] = xlsx.utils.sheet_to_json(firstSheet, {
      header: TwinoPlatform.dataColumnHeader,
      raw: false,
      blankrows: false,
      defval: 0.0,
      range: 3,
    });
    this.transactionLog = transactionLog.reverse();
  }

  protected *getTransaction(): IterableIterator<
    ITransaction<{}, ITwinoInterestReceived, {}, IGeneralDeposit, IGeneralWithdrawal>
  > {
    for (const transactionRecord of this.transactionLog) {
      const processingDate = moment(transactionRecord[TwinoASFileColumnHeadersDefs.Date], 'MM/DD/YY HH:mm');
      const transaction = getNewTransactionFactory(processingDate);

      const dataAmount = transactionRecord[TwinoASFileColumnHeadersDefs.ProcessingAmount];

      let amountPrecision = 0;
      if (dataAmount.indexOf('.') >= 0) {
        amountPrecision = dataAmount.length - (dataAmount.indexOf('.') + 1);
      }
      const intAmount = parseInt(transactionRecord[TwinoASFileColumnHeadersDefs.ProcessingAmount].replace(/\./g, ''), 10);

      switch (transactionRecord[TwinoASFileColumnHeadersDefs.TransactionType]) {
        case 'FUNDING':
          if (intAmount > 0) {
            transaction.result.deposit.deposit = Dinero({
              amount: Math.abs(intAmount),
              precision: amountPrecision,
              currency: this.currency,
            });
          } else if (intAmount < 0) {
            transaction.result.withdrawal.withdrawal = Dinero({
              amount: Math.abs(intAmount),
              precision: amountPrecision,
              currency: this.currency,
            });
          }
          break;
      }

      switch (transactionRecord[TwinoASFileColumnHeadersDefs.PaymentType]) {
        case 'PENALTY':
          transaction.result.interestReceived.penaltyReceived = Dinero({
            amount: Math.abs(intAmount),
            precision: amountPrecision,
            currency: this.currency,
          });
          break;
        case 'INTEREST':
          transaction.result.interestReceived.interestReceived = Dinero({
            amount: intAmount,
            precision: amountPrecision,
            currency: this.currency,
          });
          break;
      }

      yield transaction;
    }
  }

  protected getNewBaseResultFactory() {
    return {
      deposit: {
        deposit: Dinero({ currency: this.currency }),
      },
      extraReceived: {},
      feesPaid: {},
      interestReceived: {
        interestReceived: Dinero({ currency: this.currency }),
        penaltyReceived: Dinero({ currency: this.currency }),
      },
      principalReceived: {},
      withdrawal: {
        withdrawal: Dinero({ currency: this.currency }),
      },
    };
  }
}
