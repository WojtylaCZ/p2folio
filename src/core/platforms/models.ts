import { MintosPlatform } from './MintosPlatform';
import { TwinoPlatform } from './TwinoPlatform';
import { ZonkyPlatform } from './ZonkyPlatform';

export type SupportedPlatform = MintosPlatform | TwinoPlatform | ZonkyPlatform;

export enum SupportedPlatformTypes {
  MINTOS = 'mintos',
  TWINO = 'twino',
  ZONKY = 'zonky'
}
