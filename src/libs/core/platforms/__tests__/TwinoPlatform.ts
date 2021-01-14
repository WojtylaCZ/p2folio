import fs from 'fs';
import path from 'path';

import * as mintosResult from '../../../../examples/account_statement-twino.json';
import { TwinoPlatform } from '../TwinoPlatform';

it('validates SUM total numbers', () => {
  const rawFile = fs.readFileSync(path.join(__dirname, `../../../../examples/account_statement-twino.xlsx`));

  const platformData = new TwinoPlatform();
  platformData.parseASFile(rawFile);
  platformData.processTransactions();

  expect(platformData.getPortfolioResult().deposit.toUnit()).toEqual(mintosResult.portfolioResult.deposit);
  expect(platformData.getPortfolioResult().extraReceived.toUnit()).toEqual(mintosResult.portfolioResult.extraReceived);
  expect(platformData.getPortfolioResult().feesPaid.toUnit()).toEqual(mintosResult.portfolioResult.feesPaid);
  expect(platformData.getPortfolioResult().interestReceived.toUnit()).toEqual(mintosResult.portfolioResult.interestReceived);
  expect(platformData.getPortfolioResult().principalReceived.toUnit()).toEqual(mintosResult.portfolioResult.principalReceived);
  expect(platformData.getPortfolioResult().withdrawal.toUnit()).toEqual(mintosResult.portfolioResult.withdrawal);

  expect(platformData.getPlatformResult().deposit.deposit.toUnit()).toEqual(mintosResult.platformResult.deposit.deposit);
  expect(platformData.getPlatformResult().extraReceived).toEqual(mintosResult.platformResult.extraReceived);
  expect(platformData.getPlatformResult().feesPaid).toEqual(mintosResult.platformResult.feesPaid);
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
});
