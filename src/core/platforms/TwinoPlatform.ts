import { FileTypes } from '../../common/enums';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

export class TwinoPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.TWINO;

  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.startsWith(TwinoPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(TwinoPlatform.platformFileType)
    );
  }

  protected static readonly platformFilenameSubstring = 'account_statement';
  protected static readonly platformFileType = FileTypes.XLSX;

  protected rawFile: ArrayBuffer;

  constructor(rawFile: ArrayBuffer) {
    super();
    this.rawFile = rawFile;
  }
}
