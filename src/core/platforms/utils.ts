import { MintosPlatform } from './MintosPlatform';
import { SupportedPlatformTypes } from './models';
import { TwinoPlatform } from './TwinoPlatform';
import { ZonkyPlatform } from './ZonkyPlatform';

export function detectPlatform(filename: string): SupportedPlatformTypes {
  if (MintosPlatform.isPlatformFileValid(filename)) {
    return MintosPlatform.platform;
  } else if (TwinoPlatform.isPlatformFileValid(filename)) {
    return TwinoPlatform.platform;
  } else if (ZonkyPlatform.isPlatformFileValid(filename)) {
    return ZonkyPlatform.platform;
  } else {
    throw new Error('unknown file');
  }
}
