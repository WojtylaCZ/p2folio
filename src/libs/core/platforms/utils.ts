import Dinero from 'dinero.js';
import { Moment } from 'moment';

import { Currency } from '../../../common/enums';

import { MintosPlatform } from './MintosPlatform';
import { IOneMonthPortfolioResult, IPortfolioResult, ITransaction, SupportedPlatformTypes } from './models';
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

export function getNewTransactionFactory(processingDate: Moment): ITransaction<any, any, any, any, any> {
  return {
    processingDate,
    result: {
      deposit: {},
      extraReceived: {},
      feesPaid: {},
      interestReceived: {},
      principalReceived: {},
      withdrawal: {},
    },
  };
}

export function getNewPortfolioResultFactory(currency: Currency): IPortfolioResult {
  return {
    deposit: Dinero({ currency }),
    extraReceived: Dinero({ currency }),
    feesPaid: Dinero({ currency }),
    interestReceived: Dinero({ currency }),
    principalReceived: Dinero({ currency }),
    withdrawal: Dinero({ currency }),
  };
}

export function sumTwoPortfolioResultsWithOptionalForexConversion(
  data: IPortfolioResult,
  target: IPortfolioResult,
  forexRate: number,
  targetCurrency: Currency
): void {
  for (const [transactionType, amount] of Object.entries<any>(data)) {
    let value = { ...amount };
    if (forexRate) {
      if (value.getCurrency() !== targetCurrency) {
        const tmp = value.multiply(forexRate);
        value = Dinero({ amount: tmp.getAmount(), currency: Currency.CZK, precision: tmp.getPrecision() });
        // TODO FIX this hack somehow with:
        // const rates = {
        //     rates: {
        //       CZK: 26.7
        //     }
        //   }
        // converted = await amount.convert('CZK', {
        //     endpoint: new Promise(resolve => resolve(rates))
        //   })
      }
    }
    // @ts-ignore
    target[transactionType] = target[transactionType].add(value);
  }
}

export function getPortfolioResultWithOptionalForexConversion(
  portfolioPlatforms: any,
  portfolioCurrency: Currency,
  forexRate: number
): [IPortfolioResult, IOneMonthPortfolioResult[]] {
  const portfolioResult = getNewPortfolioResultFactory(portfolioCurrency);
  const monthlyPortfolioResults: IOneMonthPortfolioResult[] = [];

  for (const platform of portfolioPlatforms) {
    sumTwoPortfolioResultsWithOptionalForexConversion(platform.getPortfolioResult(), portfolioResult, forexRate, Currency.CZK);

    const rowToAdd = platform.getMonthlyPortfolioResults();

    let indexInRowToAdd = 0;
    for (let indexToMontlyResults = 0; indexToMontlyResults < monthlyPortfolioResults.length; indexToMontlyResults++) {
      const resultMonth = monthlyPortfolioResults[indexToMontlyResults];
      if (indexInRowToAdd === rowToAdd.length) {
        break;
      }

      const monthDataToAdd = rowToAdd[indexInRowToAdd];

      /**
       * NOTE: months are in descending order = later in time is ealier in monthly results
       * 11-2019
       * 10-2019
       * 9-2019
       */

      if (monthDataToAdd.month.isSame(resultMonth.month, 'month')) {
        // same month, so sum it
        sumTwoPortfolioResultsWithOptionalForexConversion(
          rowToAdd[indexInRowToAdd].result,
          resultMonth.result,
          forexRate,
          Currency.CZK
        );
        indexInRowToAdd++;
        continue;
      }
      if (monthDataToAdd.month.isAfter(resultMonth.month, 'month')) {
        // isAfter = is later in time, but earlier in the monthly results, so prepend it in the list before resultMonth
        const month = rowToAdd[indexInRowToAdd].month.clone();
        const result = getNewPortfolioResultFactory(portfolioCurrency);

        sumTwoPortfolioResultsWithOptionalForexConversion(rowToAdd[indexInRowToAdd].result, result, forexRate, Currency.CZK);

        monthlyPortfolioResults.splice(indexToMontlyResults, 0, { month, result });
        indexInRowToAdd++;
        continue;
      }
      if (monthDataToAdd.month.isBefore(resultMonth.month, 'month')) {
        // isBefore = is earlier in time, but later in the monthly results, so handle later
      }
    }

    if (indexInRowToAdd !== rowToAdd.length) {
      // there are no existing months to sum with, so just append all
      while (indexInRowToAdd < rowToAdd.length) {
        const month = rowToAdd[indexInRowToAdd].month.clone();
        const result = getNewPortfolioResultFactory(portfolioCurrency);

        sumTwoPortfolioResultsWithOptionalForexConversion(rowToAdd[indexInRowToAdd].result, result, forexRate, Currency.CZK);

        monthlyPortfolioResults.push({ month, result });
        indexInRowToAdd++;
      }
    }
  }

  return [portfolioResult, monthlyPortfolioResults];
}

export function defaultCurrencyForPlatform(platform: SupportedPlatformTypes): Currency {
  switch (platform) {
    case SupportedPlatformTypes.MINTOS:
      return Currency.EUR;
    case SupportedPlatformTypes.TWINO:
      return Currency.EUR;
    case SupportedPlatformTypes.ZONKY:
      return Currency.CZK;
    default:
      return Currency.EUR;
  }
}
