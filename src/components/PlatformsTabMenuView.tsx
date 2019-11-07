import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { SupportedPlatform, SupportedPlatformTypes } from '../core/platforms/models';

import PlatformView from './PlatformView';
import PortfolioView from './PortfolioView';

export type PortfolioPlatformsProps = {
  portfolioPlatforms: (SupportedPlatform)[];
};

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={4}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabEnabled: {
      fontSize: '96%',
      fontWeight: 'bold',
      textTransform: 'none'
    },
    tabDisabled: {
      textTransform: 'none'
    }
  })
);

const PlatformsTabMenuView = (props: PortfolioPlatformsProps) => {
  const [tabIndexValue, setTabIndexValue] = useState(0);
  const onTabChange = (event: React.ChangeEvent<{}>, newTabIndexValue: number) => {
    setTabIndexValue(newTabIndexValue);
  };

  const classes = useStyles();

  const platformViews: any = {};

  props.portfolioPlatforms.forEach((platform: SupportedPlatform) => {
    platformViews[platform.platform] = <PlatformView platformData={platform} />;
  });
  const availablePlatforms = Object.keys(platformViews);

  const zonkyEnabled = availablePlatforms.includes(SupportedPlatformTypes.ZONKY);
  const mintosEnabled = availablePlatforms.includes(SupportedPlatformTypes.MINTOS);
  const twinoEnabled = availablePlatforms.includes(SupportedPlatformTypes.TWINO);

  return (
    <div>
      <Paper square={true}>
        <Tabs value={tabIndexValue} onChange={onTabChange} aria-label="simple tabs example" variant="fullWidth">
          <Tab className={classes.tabEnabled} label="Portfolio" {...a11yProps(0)} />
          <Tab
            className={zonkyEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Zonky.cz (CZK)"
            {...a11yProps(1)}
            disabled={!zonkyEnabled}
          />
          <Tab
            className={mintosEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Mintos.com (EUR)"
            {...a11yProps(2)}
            disabled={!mintosEnabled}
          />
          <Tab
            className={twinoEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Twino.eu (EUR)"
            {...a11yProps(3)}
            disabled={!twinoEnabled}
          />
        </Tabs>
      </Paper>

      <div style={{ paddingTop: '8px' }}>
        <Paper square={true}>
          <TabPanel value={tabIndexValue} index={0}>
            <PortfolioView portfolioPlatforms={props.portfolioPlatforms} />
          </TabPanel>
          <TabPanel value={tabIndexValue} index={1}>
            {platformViews[SupportedPlatformTypes.ZONKY]}
          </TabPanel>
          <TabPanel value={tabIndexValue} index={2}>
            {platformViews[SupportedPlatformTypes.MINTOS]}
          </TabPanel>
          <TabPanel value={tabIndexValue} index={3}>
            {platformViews[SupportedPlatformTypes.TWINO]}
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default PlatformsTabMenuView;
