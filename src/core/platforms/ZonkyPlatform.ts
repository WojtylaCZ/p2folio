import { FileTypes } from '../../common/enums';

import { SupportedPlatformTypes } from './models';
import { Platform } from './Platform';

export class ZonkyPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.ZONKY;

  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.includes(ZonkyPlatform.platformFilenameSubstring) &&
      fullFilename.endsWith(ZonkyPlatform.platformFileType)
    );
  }

  protected static readonly platformFilenameSubstring = 'transakce-';
  protected static readonly platformFileType = FileTypes.XLSX;

  protected rawFile: ArrayBuffer;

  constructor(rawFile: ArrayBuffer) {
    super();
    this.rawFile = rawFile;
  }
}
