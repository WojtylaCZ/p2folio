import xlsx from 'xlsx';

import { FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

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
      fullFilename.startsWith(TwinoPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(TwinoPlatform.platformFileType)
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

  public processASFile(rawFile: ArrayBuffer) {
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
}
