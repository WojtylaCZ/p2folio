import fs from 'fs';
import path from 'path';

import * as zonkyResult from '../../../../examples/transakce-zonky.json';
import { ZonkyPlatform } from '../ZonkyPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/transakce-zonky.xlsx`));

  const platformData = new ZonkyPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioResult().deposit.toUnit()).toEqual(zonkyResult.portfolioResult.deposit);
  expect(platformData.getPortfolioResult().extraReceived.toUnit()).toEqual(zonkyResult.portfolioResult.extraReceived);
  expect(platformData.getPortfolioResult().feesPaid.toUnit()).toEqual(zonkyResult.portfolioResult.feesPaid);
  expect(platformData.getPortfolioResult().interestReceived.toUnit()).toEqual(zonkyResult.portfolioResult.interestReceived);
  expect(platformData.getPortfolioResult().principalReceived.toUnit()).toEqual(zonkyResult.portfolioResult.principalReceived);
  expect(platformData.getPortfolioResult().withdrawal.toUnit()).toEqual(zonkyResult.portfolioResult.withdrawal);

  expect(platformData.getPlatformResult().deposit.deposit!.toUnit()).toEqual(zonkyResult.platformResult.deposit.deposit);
  expect(platformData.getPlatformResult().extraReceived).toEqual(zonkyResult.platformResult.extraReceived);
  expect(platformData.getPlatformResult().feesPaid.plaformFeePaid.toUnit()).toEqual(
    zonkyResult.platformResult.feesPaid.plaformFeePaid
  );
  expect(platformData.getPlatformResult().feesPaid.secondaryMarketFeePaid.toUnit()).toEqual(
    zonkyResult.platformResult.feesPaid.secondaryMarketFeePaid
  );
  expect(platformData.getPlatformResult().interestReceived.interestReceived!.toUnit()).toEqual(
    zonkyResult.platformResult.interestReceived.interestReceived
  );
  expect(platformData.getPlatformResult().interestReceived.penaltyReceived!.toUnit()).toEqual(
    zonkyResult.platformResult.interestReceived.penaltyReceived
  );
  expect(platformData.getPlatformResult().principalReceived.principalReceived!.toUnit()).toEqual(
    zonkyResult.platformResult.principalReceived.principalReceived
  );
  expect(platformData.getPlatformResult().withdrawal.withdrawal!.toUnit()).toEqual(
    zonkyResult.platformResult.withdrawal.withdrawal
  );
});
