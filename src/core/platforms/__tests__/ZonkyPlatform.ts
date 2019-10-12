import fs from 'fs';
import path from 'path';

import * as zonkyResult from '../../../../examples/transakce-zonky.json';
import { ZonkyPlatform } from '../ZonkyPlatform';

it('sums numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/transakce-zonky.xlsx`));

  const platformData = new ZonkyPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioTotals().deposit.toRoundedUnit(2)).toEqual(zonkyResult.portfolioTotals.deposit);
  expect(platformData.getPortfolioTotals().extraReceived.toRoundedUnit(2)).toEqual(zonkyResult.portfolioTotals.extraReceived);
  expect(platformData.getPortfolioTotals().feesPaid.toRoundedUnit(2)).toEqual(zonkyResult.portfolioTotals.feesPaid);
  expect(platformData.getPortfolioTotals().interestReceived.toRoundedUnit(2)).toEqual(
    zonkyResult.portfolioTotals.interestReceived
  );
  expect(platformData.getPortfolioTotals().principalReceived.toRoundedUnit(2)).toEqual(
    zonkyResult.portfolioTotals.principalReceived
  );
  expect(platformData.getPortfolioTotals().withdrawal.toRoundedUnit(2)).toEqual(zonkyResult.portfolioTotals.withdrawal);

  expect(platformData.getPlatformTotals().deposit.deposit!.toRoundedUnit(2)).toEqual(zonkyResult.platformTotals.deposit.deposit);
  expect(platformData.getPlatformTotals().extraReceived).toEqual(zonkyResult.platformTotals.extraReceived);
  expect(platformData.getPlatformTotals().feesPaid.plaformFeePaid.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.feesPaid.plaformFeePaid
  );
  expect(platformData.getPlatformTotals().feesPaid.secondaryMarketFeePaid.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.feesPaid.secondaryMarketFeePaid
  );
  expect(platformData.getPlatformTotals().interestReceived.interestReceived!.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.interestReceived.interestReceived
  );
  expect(platformData.getPlatformTotals().interestReceived.penaltyReceived!.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.interestReceived.penaltyReceived
  );
  expect(platformData.getPlatformTotals().principalReceived.principalReceived!.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.principalReceived.principalReceived
  );
  expect(platformData.getPlatformTotals().withdrawal.withdrawal!.toRoundedUnit(2)).toEqual(
    zonkyResult.platformTotals.withdrawal.withdrawal
  );
});
