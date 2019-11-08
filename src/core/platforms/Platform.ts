import Dinero from 'dinero.js';
import moment from 'moment';

import { Currency } from '../../common/enums';

import { IBaseResult, IMonthlyResults, IPortfolioResult, ITransaction, SupportedPlatformTypes } from './models';

export abstract class Platform {
  public abstract currency: Currency;
  public abstract readonly platform: SupportedPlatformTypes;

  public monthlyResults: Array<IMonthlyResults<any, any, any, any, any>> = [];

  protected transactionLog: any[] = [];

  private platformResult?: IBaseResult<any, any, any, any, any>;
  private portfolioResult?: IPortfolioResult;

  public processTransactions() {
    let processingMonth = moment(0);

    for (const transaction of this.getTransaction()) {
      const dateTransaction = transaction.processingDate;

      if (dateTransaction.isAfter(processingMonth, 'month')) {
        const dateArray = dateTransaction.toArray();
        const newMonthMoment = moment(`${dateArray[0]}-${dateArray[1] + 1}-01`, 'YYYY-MM-DD');

        this.monthlyResults.unshift({
          month: newMonthMoment,
          result: this.getNewBaseResultFactory()
        });
        processingMonth = newMonthMoment;
      }

      for (const [transactionType, value] of Object.entries<any>(transaction.result)) {
        for (const [key, result] of Object.entries<Dinero.Dinero>(value)) {
          // @ts-ignore TODO
          this.monthlyResults[0].result[transactionType][key] = this.monthlyResults[0].result[transactionType][key].add(result);
        }
      }
    }
  }

  public getPlatformResult(): IBaseResult<any, any, any, any, any> {
    if (!this.platformResult) {
      const totals = this.getNewBaseResultFactory();
      for (const month of this.monthlyResults) {
        for (const [transactionType, value] of Object.entries<any>(month.result)) {
          for (const [key, result] of Object.entries<Dinero.Dinero>(value)) {
            // @ts-ignore
            totals[transactionType][key] = totals[transactionType][key].add(result);
          }
        }
      }
      this.platformResult = totals;
    }
    return this.platformResult;
  }

  public getPortfolioResult(): IPortfolioResult {
    if (!this.portfolioResult) {
      const totals: IPortfolioResult = {
        deposit: Dinero({ currency: this.currency }),
        extraReceived: Dinero({ currency: this.currency }),
        feesPaid: Dinero({ currency: this.currency }),
        interestReceived: Dinero({ currency: this.currency }),
        principalReceived: Dinero({ currency: this.currency }),
        withdrawal: Dinero({ currency: this.currency })
      };

      const platformResult = this.getPlatformResult();

      for (const [transactionType, value] of Object.entries(platformResult)) {
        for (const [, amount] of Object.entries<Dinero.Dinero>(value)) {
          // @ts-ignore
          totals[transactionType] = totals[transactionType].add(amount);
        }
      }

      this.portfolioResult = totals;
    }

    return this.portfolioResult;
  }

  protected abstract parseASFile(rawFile: ArrayBuffer): void;
  protected abstract getTransaction(): IterableIterator<ITransaction<any, any, any, any, any>>;
  protected abstract getNewBaseResultFactory(): IBaseResult<any, any, any, any, any>;
}
