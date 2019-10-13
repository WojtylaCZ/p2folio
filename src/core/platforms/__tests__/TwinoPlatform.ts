import fs from 'fs';
import path from 'path';

import * as mintosResult from '../../../../examples/account_statement-twino.json';
import { TwinoPlatform } from '../TwinoPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/account_statement-twino.xlsx`));

  const platformData = new TwinoPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioTotals().deposit.toUnit()).toEqual(mintosResult.portfolioTotals.deposit);
  expect(platformData.getPortfolioTotals().extraReceived.toUnit()).toEqual(mintosResult.portfolioTotals.extraReceived);
  expect(platformData.getPortfolioTotals().feesPaid.toUnit()).toEqual(mintosResult.portfolioTotals.feesPaid);
  expect(platformData.getPortfolioTotals().interestReceived.toUnit()).toEqual(mintosResult.portfolioTotals.interestReceived);
  expect(platformData.getPortfolioTotals().principalReceived.toUnit()).toEqual(mintosResult.portfolioTotals.principalReceived);
  expect(platformData.getPortfolioTotals().withdrawal.toUnit()).toEqual(mintosResult.portfolioTotals.withdrawal);

  expect(platformData.getPlatformTotals().deposit.deposit.toUnit()).toEqual(mintosResult.platformTotals.deposit.deposit);
  expect(platformData.getPlatformTotals().extraReceived).toEqual(mintosResult.platformTotals.extraReceived);
  expect(platformData.getPlatformTotals().feesPaid).toEqual(mintosResult.platformTotals.feesPaid);
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
});
