import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import { SupportedPlatform, SupportedPlatformTypes } from '../core/platforms/models';

import PlatformView from './PlatformView';

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

const PlatformsTabMenuView = (props: PortfolioPlatformsProps) => {
  const [tabIndexValue, setTabIndexValue] = useState(0);
  const onTabChange = (event: React.ChangeEvent<{}>, newTabIndexValue: number) => {
    setTabIndexValue(newTabIndexValue);
  };

  const platformViews: any = {};

  props.portfolioPlatforms.forEach((platform: SupportedPlatform) => {
    platformViews[platform.platform] = <PlatformView platformData={platform} />;
  });
  const availablePlatforms = Object.keys(platformViews);

  return (
    <div>
      <Paper square={true}>
        <Tabs value={tabIndexValue} onChange={onTabChange} aria-label="simple tabs example" variant="fullWidth">
          <Tab label="Portfolio" {...a11yProps(0)} disabled={true} />
          <Tab label="Zonky.cz (CZK)" {...a11yProps(1)} disabled={!availablePlatforms.includes(SupportedPlatformTypes.ZONKY)} />
          <Tab
            label="Mintos.com (EUR)"
            {...a11yProps(2)}
            disabled={!availablePlatforms.includes(SupportedPlatformTypes.MINTOS)}
          />
          <Tab label="Twino.eu (EUR)" {...a11yProps(3)} disabled={!availablePlatforms.includes(SupportedPlatformTypes.TWINO)} />
        </Tabs>
      </Paper>

      <div style={{ paddingTop: '8px' }}>
        <Paper square={true}>
          <TabPanel value={tabIndexValue} index={0}>
            Nahrajte výpisy z účtu k zobrazení statistik z jednotlivých platforem.
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
