import fs from 'fs';
import path from 'path';

import * as zonkyResult from '../../../../examples/transakce-zonky.json';
import { ZonkyPlatform } from '../ZonkyPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/transakce-zonky.xlsx`));

  const platformData = new ZonkyPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioTotals().deposit.toUnit()).toEqual(zonkyResult.portfolioTotals.deposit);
  expect(platformData.getPortfolioTotals().extraReceived.toUnit()).toEqual(zonkyResult.portfolioTotals.extraReceived);
  expect(platformData.getPortfolioTotals().feesPaid.toUnit()).toEqual(zonkyResult.portfolioTotals.feesPaid);
  expect(platformData.getPortfolioTotals().interestReceived.toUnit()).toEqual(zonkyResult.portfolioTotals.interestReceived);
  expect(platformData.getPortfolioTotals().principalReceived.toUnit()).toEqual(zonkyResult.portfolioTotals.principalReceived);
  expect(platformData.getPortfolioTotals().withdrawal.toUnit()).toEqual(zonkyResult.portfolioTotals.withdrawal);

  expect(platformData.getPlatformTotals().deposit.deposit!.toUnit()).toEqual(zonkyResult.platformTotals.deposit.deposit);
  expect(platformData.getPlatformTotals().extraReceived).toEqual(zonkyResult.platformTotals.extraReceived);
  expect(platformData.getPlatformTotals().feesPaid.plaformFeePaid.toUnit()).toEqual(
    zonkyResult.platformTotals.feesPaid.plaformFeePaid
  );
  expect(platformData.getPlatformTotals().feesPaid.secondaryMarketFeePaid.toUnit()).toEqual(
    zonkyResult.platformTotals.feesPaid.secondaryMarketFeePaid
  );
  expect(platformData.getPlatformTotals().interestReceived.interestReceived!.toUnit()).toEqual(
    zonkyResult.platformTotals.interestReceived.interestReceived
  );
  expect(platformData.getPlatformTotals().interestReceived.penaltyReceived!.toUnit()).toEqual(
    zonkyResult.platformTotals.interestReceived.penaltyReceived
  );
  expect(platformData.getPlatformTotals().principalReceived.principalReceived!.toUnit()).toEqual(
    zonkyResult.platformTotals.principalReceived.principalReceived
  );
  expect(platformData.getPlatformTotals().withdrawal.withdrawal!.toUnit()).toEqual(
    zonkyResult.platformTotals.withdrawal.withdrawal
  );
});
