import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';

import { SupportedPlatform, SupportedPlatformTypes } from '../libs/core/platforms/models';

import PlatformView from './PlatformView';
import PortfolioView from './PortfolioView';

export type PortfolioPlatformsProps = {
  portfolioPlatforms: SupportedPlatform[];
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabEnabled: {
      fontSize: '96%',
      fontWeight: 'bold',
      textTransform: 'none',
    },
    tabDisabled: {
      textTransform: 'none',
    },
  })
);

const PlatformsTabMenuView = (props: PortfolioPlatformsProps) => {
  const [tabIndexValue, setTabIndexValue] = useState(0);
  const onTabChange = (event: React.ChangeEvent<{}>, newTabIndexValue: number) => {
    setTabIndexValue(newTabIndexValue);
  };

  useEffect(() => {
    const tabs = ['Portfolio', SupportedPlatformTypes.ZONKY, SupportedPlatformTypes.MINTOS, SupportedPlatformTypes.TWINO];

    let focus = 0;
    for (const platform of props.portfolioPlatforms) {
      focus = tabs.indexOf(platform.platform);
    }
    setTabIndexValue(focus);
  }, [props.portfolioPlatforms.length, props.portfolioPlatforms]);

  const classes = useStyles();

  const platformViews: any = {};

  for (const platform of props.portfolioPlatforms) {
    platformViews[platform.platform] = <PlatformView platformData={platform} />;
  }

  const availablePlatforms = Object.keys(platformViews);

  const zonkyEnabled = availablePlatforms.includes(SupportedPlatformTypes.ZONKY);
  const mintosEnabled = availablePlatforms.includes(SupportedPlatformTypes.MINTOS);
  const twinoEnabled = availablePlatforms.includes(SupportedPlatformTypes.TWINO);

  return (
    <div>
      <Paper square={true}>
        <Tabs value={tabIndexValue} onChange={onTabChange} aria-label="simple tabs example" variant="fullWidth">
          <Tab className={classes.tabEnabled} label="Souhrn celého portfolia" {...a11yProps(0)} />
          <Tab
            className={zonkyEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Detail Zonky.cz (CZK)"
            {...a11yProps(1)}
            disabled={!zonkyEnabled}
          />
          <Tab
            className={mintosEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Detail Mintos.com (EUR)"
            {...a11yProps(2)}
            disabled={!mintosEnabled}
          />
          <Tab
            className={twinoEnabled ? classes.tabEnabled : classes.tabDisabled}
            label="Detail Twino.eu (EUR)"
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
