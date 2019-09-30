import { FileTypes } from '../../common/enums';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

export class MintosPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.MINTOS;
  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.includes(MintosPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(MintosPlatform.platformFileType)
    );
  }
  protected static readonly platformFilenameSubstring = 'account-statement';
  protected static readonly platformFileType = FileTypes.XLSX;

  protected rawFile: ArrayBuffer;

  constructor(rawFile: ArrayBuffer) {
    super();
    this.rawFile = rawFile;
  }
}
