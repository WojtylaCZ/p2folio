import xlsx from 'xlsx';

import { FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

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
      fullFilename.includes(MintosPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(MintosPlatform.platformFileType)
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

  public processASFile(rawFile: ArrayBuffer) {
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
}
