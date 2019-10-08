import moment from 'moment';
import xlsx from 'xlsx';

import { FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { ITransaction, SupportedPlatformTypes } from './models';
import { Platform } from './Platform';
import { getNewTransactionFactory } from './utils';

enum TwinoASFileColumnHeadersDefs {
  Date = 'ProcessingDate',
  TransactionId = 'TransactionId',
  TransactionType = 'TransactionType',
  PaymentType = 'PaymentType',
  LoanId = 'LoanId',
  ProcessingAmount = 'ProcessingAmount'
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
    TwinoASFileColumnHeadersDefs.ProcessingAmount
  ];

  public parseASFile(rawFile: ArrayBuffer) {
    const firstSheet = getFirstWorkSheetFromRawFile(rawFile);

    const transactionLog: any[] = xlsx.utils.sheet_to_json(firstSheet, {
      header: TwinoPlatform.dataColumnHeader,
      raw: false,
      blankrows: false,
      defval: 0.0,
      range: 3
    });
    this.transactionLog = transactionLog.reverse();
  }

  protected *getTransaction(): IterableIterator<ITransaction<{}, {}, {}>> {
    for (const transactionRecord of this.transactionLog) {
      const processingDate = moment(transactionRecord[TwinoASFileColumnHeadersDefs.Date], 'MM/DD/YY HH:mm');
      const transaction = getNewTransactionFactory(processingDate);

      yield transaction;
    }
  }

  protected getNewMonthResultFactory() {
    return {
      deposit: {},
      extraReceived: {},
      feesPaid: {},
      interestReceived: {},
      principalReceived: {},
      withdrawal: {}
    };
  }
}
