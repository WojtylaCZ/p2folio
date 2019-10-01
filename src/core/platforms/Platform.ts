export abstract class Platform {
  protected transactionLog: any[] = [];

  protected abstract processASFile(rawFile: ArrayBuffer): void;
}
