import moment from 'moment';

import { IBaseResult, IMonthlyResults, ITransaction } from './models';

export abstract class Platform {
  public monthlyResults: Array<IMonthlyResults<any, any, any>> = [];

  protected transactionLog: any[] = [];

  public processTransactions() {
    let processingMonth = moment(0);

    for (const transaction of this.getTransaction()) {
      const dateTransaction = transaction.processingDate;

      if (dateTransaction.isAfter(processingMonth, 'month')) {
        const dateArray = dateTransaction.toArray();
        const newMonthMoment = moment(
          `${dateArray[0]}-${dateArray[1] + 1}-01`,
          'YYYY-MM-DD'
        );

        this.monthlyResults.unshift({
          month: newMonthMoment,
          result: this.getNewMonthResultFactory()
        });
        processingMonth = newMonthMoment;
      }
    }

    console.log(this.monthlyResults);
  }

  protected abstract parseASFile(rawFile: ArrayBuffer): void;
  protected abstract getTransaction(): IterableIterator<
    ITransaction<any, any, any>
  >;
  protected abstract getNewMonthResultFactory(): IBaseResult<any, any, any>;
}
