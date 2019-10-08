import moment from 'moment';
import xlsx from 'xlsx';

import { Currency, FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { ITransaction, SupportedPlatformTypes } from './models';
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

  protected *getTransaction(): IterableIterator<ITransaction<{}, {}, {}>> {
    for (const transactionRecord of this.transactionLog) {
      const processingDate = moment(transactionRecord[MintosASFileColumnHeadersDefs.Date], 'YYYY-MM-DD HH:mm:ss');
      const transaction = getNewTransactionFactory(processingDate);

      yield transaction;
    }
  }

  protected getNewBaseResultFactory() {
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
