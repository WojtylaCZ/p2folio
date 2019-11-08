import fs from 'fs';
import path from 'path';

import * as mintosResult from '../../../../examples/mintos-20191106-account-statement.json';
import { MintosPlatform } from '../MintosPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/mintos-20191106-account-statement.xlsx`));

  const platformData = new MintosPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioResult().deposit.toUnit()).toEqual(mintosResult.portfolioResult.deposit);
  expect(platformData.getPortfolioResult().extraReceived.toUnit()).toEqual(mintosResult.portfolioResult.extraReceived);
  expect(platformData.getPortfolioResult().feesPaid.toUnit()).toEqual(mintosResult.portfolioResult.feesPaid);
  expect(platformData.getPortfolioResult().interestReceived.toUnit()).toEqual(mintosResult.portfolioResult.interestReceived);
  expect(platformData.getPortfolioResult().principalReceived.toUnit()).toEqual(mintosResult.portfolioResult.principalReceived);
  expect(platformData.getPortfolioResult().withdrawal.toUnit()).toEqual(mintosResult.portfolioResult.withdrawal);

  expect(platformData.getPlatformResult().deposit.deposit.toUnit()).toEqual(mintosResult.platformResult.deposit.deposit);
  expect(platformData.getPlatformResult().deposit.incomingCurrencyExchange.toUnit()).toEqual(
    mintosResult.platformResult.deposit.incomingCurrencyExchange
  );
  expect(platformData.getPlatformResult().extraReceived.cashbackReceived.toUnit()).toEqual(
    mintosResult.platformResult.extraReceived.cashbackReceived
  );
  expect(platformData.getPlatformResult().extraReceived.referalReceived.toUnit()).toEqual(
    mintosResult.platformResult.extraReceived.referalReceived
  );
  expect(platformData.getPlatformResult().feesPaid.currencyExchangeFeePaid.toUnit()).toEqual(
    mintosResult.platformResult.feesPaid.currencyExchangeFeePaid
  );
  expect(platformData.getPlatformResult().feesPaid.secondaryMarketFeePaid.toUnit()).toEqual(
    mintosResult.platformResult.feesPaid.secondaryMarketFeePaid
  );
  expect(platformData.getPlatformResult().interestReceived.interestReceived!.toUnit()).toEqual(
    mintosResult.platformResult.interestReceived.interestReceived
  );
  expect(platformData.getPlatformResult().interestReceived.penaltyReceived!.toUnit()).toEqual(
    mintosResult.platformResult.interestReceived.penaltyReceived
  );
  expect(platformData.getPlatformResult().principalReceived).toEqual(mintosResult.platformResult.principalReceived);
  expect(platformData.getPlatformResult().withdrawal.withdrawal!.toUnit()).toEqual(
    mintosResult.platformResult.withdrawal.withdrawal
  );
  expect(platformData.getPlatformResult().withdrawal.outgoingCurrencyExchange!.toUnit()).toEqual(
    mintosResult.platformResult.withdrawal.outgoingCurrencyExchange
  );
});
