import xlsx from 'xlsx';

import { FileTypes } from '../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../common/utils';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

enum ZonkyASFileColumnHeadersDefs {
  Date = 'ProcessingDate',
  Direction = 'Direction',
  TransactionType = 'TransactionType',
  ProcessingAmount = 'ProcessingAmount',
  InterestReceived = 'InterestReceived',
  PrincipalReceived = 'PrincipalReceived'
}

export class ZonkyPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.ZONKY;

  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.includes(ZonkyPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(ZonkyPlatform.platformFileType)
    );
  }

  private static readonly platformFilenameSubstring = 'transakce-';
  private static readonly platformFileType = FileTypes.XLSX;
  private static readonly ASFileColumnHeaders = [
    ZonkyASFileColumnHeadersDefs.Date,
    ZonkyASFileColumnHeadersDefs.Direction,
    ZonkyASFileColumnHeadersDefs.TransactionType,
    ZonkyASFileColumnHeadersDefs.ProcessingAmount,
    ZonkyASFileColumnHeadersDefs.PrincipalReceived,
    ZonkyASFileColumnHeadersDefs.InterestReceived
  ];

  public processASFile(rawFile: ArrayBuffer) {
    const firstSheet = getFirstWorkSheetFromRawFile(rawFile);

    const transactionLog: any[] = xlsx.utils.sheet_to_json(firstSheet, {
      header: ZonkyPlatform.ASFileColumnHeaders,
      raw: false,
      blankrows: false,
      defval: 0.0,
      range: 9
    });
    this.transactionLog = transactionLog;
  }
}
