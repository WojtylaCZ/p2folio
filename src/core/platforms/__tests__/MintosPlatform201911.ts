import fs from 'fs';
import path from 'path';

import * as mintosResult from '../../../../examples/mintos-20191106-account-statement.json';
import { MintosPlatform } from '../MintosPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/mintos-20191106-account-statement.xlsx`));

  const platformData = new MintosPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioTotals().deposit.toUnit()).toEqual(mintosResult.portfolioTotals.deposit);
  expect(platformData.getPortfolioTotals().extraReceived.toUnit()).toEqual(mintosResult.portfolioTotals.extraReceived);
  expect(platformData.getPortfolioTotals().feesPaid.toUnit()).toEqual(mintosResult.portfolioTotals.feesPaid);
  expect(platformData.getPortfolioTotals().interestReceived.toUnit()).toEqual(mintosResult.portfolioTotals.interestReceived);
  expect(platformData.getPortfolioTotals().principalReceived.toUnit()).toEqual(mintosResult.portfolioTotals.principalReceived);
  expect(platformData.getPortfolioTotals().withdrawal.toUnit()).toEqual(mintosResult.portfolioTotals.withdrawal);

  expect(platformData.getPlatformTotals().deposit.deposit.toUnit()).toEqual(mintosResult.platformTotals.deposit.deposit);
  expect(platformData.getPlatformTotals().deposit.incomingCurrencyExchange.toUnit()).toEqual(
    mintosResult.platformTotals.deposit.incomingCurrencyExchange
  );
  expect(platformData.getPlatformTotals().extraReceived.cashbackReceived.toUnit()).toEqual(
    mintosResult.platformTotals.extraReceived.cashbackReceived
  );
  expect(platformData.getPlatformTotals().extraReceived.referalReceived.toUnit()).toEqual(
    mintosResult.platformTotals.extraReceived.referalReceived
  );
  expect(platformData.getPlatformTotals().feesPaid.currencyExchangeFeePaid.toUnit()).toEqual(
    mintosResult.platformTotals.feesPaid.currencyExchangeFeePaid
  );
  expect(platformData.getPlatformTotals().feesPaid.secondaryMarketFeePaid.toUnit()).toEqual(
    mintosResult.platformTotals.feesPaid.secondaryMarketFeePaid
  );
  expect(platformData.getPlatformTotals().interestReceived.interestReceived!.toUnit()).toEqual(
    mintosResult.platformTotals.interestReceived.interestReceived
  );
  expect(platformData.getPlatformTotals().interestReceived.penaltyReceived!.toUnit()).toEqual(
    mintosResult.platformTotals.interestReceived.penaltyReceived
  );
  expect(platformData.getPlatformTotals().principalReceived).toEqual(mintosResult.platformTotals.principalReceived);
  expect(platformData.getPlatformTotals().withdrawal.withdrawal!.toUnit()).toEqual(
    mintosResult.platformTotals.withdrawal.withdrawal
  );
  expect(platformData.getPlatformTotals().withdrawal.outgoingCurrencyExchange!.toUnit()).toEqual(
    mintosResult.platformTotals.withdrawal.outgoingCurrencyExchange
  );
});
