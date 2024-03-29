import Dinero from 'dinero.js';
import moment from 'moment';
import xlsx from 'xlsx';

import { Currency, FileTypes } from '../../../common/enums';
import { getFirstWorkSheetFromRawFile } from '../../../common/utils';

import { IGeneralDeposit, IGeneralWithdrawal, ITransaction, SupportedPlatformTypes } from './models';
import { Platform } from './Platform';
import { getNewTransactionFactory } from './utils';

enum ZonkyASFileColumnHeadersDefs {
  Date = 'Datum',
  Direction = 'Příjem / Výdaj',
  TransactionType = 'Typ transakce',
  ProcessingAmount = 'Částka',
  InterestReceived = 'Jistina',
  PrincipalReceived = 'Úrok'
}

export interface IZonkyFeesPaid {
  plaformFeePaid?: Dinero.Dinero;
  secondaryMarketFeePaid?: Dinero.Dinero;
}
export interface IZonkyInterestReceived {
  interestReceived?: Dinero.Dinero;
  penaltyReceived?: Dinero.Dinero;
}

export class ZonkyPlatform extends Platform {
  public static readonly platform = SupportedPlatformTypes.ZONKY;

  public static isPlatformFileValid(fullFilename: string): boolean {
    return (
      fullFilename.includes(ZonkyPlatform.platformFilenameSubstring) && fullFilename.endsWith(ZonkyPlatform.platformFileType)
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

  public readonly platform = ZonkyPlatform.platform;
  public currency = Currency.CZK;

  public parseASFile(rawFile: ArrayBuffer) {
    const firstSheet = getFirstWorkSheetFromRawFile(rawFile);

    const transactionLog: any[] = xlsx.utils.sheet_to_json(firstSheet, {
      header: ZonkyPlatform.ASFileColumnHeaders,
      raw: false,
      blankrows: false,
      defval: 0.0,
      range: 4
    });

    let headerNotFound = true;
    for (let rowNumber = 0; rowNumber < transactionLog.length; rowNumber++) {
      if (transactionLog[rowNumber][ZonkyASFileColumnHeadersDefs.Date] === ZonkyASFileColumnHeadersDefs.Date) {
        transactionLog.splice(0, rowNumber + 1);
        headerNotFound = false;
        break;
      }
    }
    if (headerNotFound) {
      throw Error('Data header not found');
    }
    this.transactionLog = transactionLog;
  }

  public *getTransaction(): IterableIterator<
    ITransaction<{}, IZonkyInterestReceived, IZonkyFeesPaid, IGeneralDeposit, IGeneralWithdrawal>
  > {
    for (const transactionRecord of this.transactionLog) {
      const processingDate = moment(transactionRecord[ZonkyASFileColumnHeadersDefs.Date], 'DD.MM.YYYY');
      const transaction = getNewTransactionFactory(processingDate);

      const amount = this.getAmount(transactionRecord[ZonkyASFileColumnHeadersDefs.ProcessingAmount].toString(), Currency.CZK);

      switch (transactionRecord[ZonkyASFileColumnHeadersDefs.TransactionType]) {
        case 'Poplatek za investování':
          transaction.result.feesPaid.plaformFeePaid = amount;
          break;
        case 'Nabití vaší peněženky':
          transaction.result.deposit.deposit = amount;
          break;
        case 'Výběr z peněženky na váš účet':
          transaction.result.withdrawal.withdrawal = amount;
          break;
        case 'Poplatek za prodej na sekundárním trhu':
          transaction.result.feesPaid.secondaryMarketFeePaid = amount;
          break;
        case 'Prodej na sekundárním trhu':
          transaction.result.principalReceived.principalReceived = amount;
          break;
        case 'Vrácení platby':
          transaction.result.interestReceived.interestReceived = this.getInterestReceived(
            transactionRecord[ZonkyASFileColumnHeadersDefs.InterestReceived].toString(),
            Currency.CZK
          ).multiply(-1);
          transaction.result.principalReceived.principalReceived = this.getPrincipalReceived(
            transactionRecord[ZonkyASFileColumnHeadersDefs.PrincipalReceived].toString(),
            Currency.CZK
          ).multiply(-1);
          break;

        case 'Splátka půjčky':
          transaction.result.interestReceived.interestReceived = this.getInterestReceived(
            transactionRecord[ZonkyASFileColumnHeadersDefs.InterestReceived].toString(),
            Currency.CZK
          );
          transaction.result.principalReceived.principalReceived = this.getPrincipalReceived(
            transactionRecord[ZonkyASFileColumnHeadersDefs.PrincipalReceived].toString(),
            Currency.CZK
          );

          const penalty = amount.subtract(
            transaction.result.principalReceived.principalReceived.add(transaction.result.interestReceived.interestReceived)
          );
          if (!penalty.isZero()) {
            transaction.result.interestReceived.penaltyReceived = penalty;
          }

          break;
      }
      yield transaction;
    }
  }

  protected getNewBaseResultFactory() {
    return {
      deposit: { deposit: Dinero({ currency: this.currency }) },
      extraReceived: {},
      feesPaid: {
        plaformFeePaid: Dinero({ currency: this.currency }),
        secondaryMarketFeePaid: Dinero({ currency: this.currency })
      },
      interestReceived: {
        interestReceived: Dinero({ currency: this.currency }),
        penaltyReceived: Dinero({ currency: this.currency })
      },
      principalReceived: {
        principalReceived: Dinero({ currency: this.currency })
      },
      withdrawal: { withdrawal: Dinero({ currency: this.currency }) }
    };
  }

  private getAmount(rawAmount: string, currency: Currency): Dinero.Dinero {
    const amountPrecision = rawAmount.length - (rawAmount.indexOf('.') + 1);
    const intAmount = Math.abs(parseInt(rawAmount.replace(/,/g, '').replace(/\./g, ''), 10));
    return Dinero({
      amount: intAmount,
      precision: amountPrecision,
      currency
    });
  }

  private getPrincipalReceived(rawPrincipalReceived: string, currency: Currency): Dinero.Dinero {
    const principalReceivedPrecision = rawPrincipalReceived.length - (rawPrincipalReceived.indexOf('.') + 1);
    const principalReceivedInt = Math.abs(parseInt(rawPrincipalReceived.replace(/,/g, '').replace(/\./g, ''), 10));
    return Dinero({
      amount: principalReceivedInt,
      precision: principalReceivedPrecision,
      currency
    });
  }

  private getInterestReceived(rawInterestReceived: string, currency: Currency): Dinero.Dinero {
    const principalReceivedPrecision = rawInterestReceived.length - (rawInterestReceived.indexOf('.') + 1);
    const principalReceivedInt = Math.abs(parseInt(rawInterestReceived.replace(/,/g, '').replace(/\./g, ''), 10));
    return Dinero({
      amount: principalReceivedInt,
      precision: principalReceivedPrecision,
      currency
    });
  }
}
