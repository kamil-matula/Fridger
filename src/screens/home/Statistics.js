import React from 'react';

import { View } from 'react-native';

import { AppBar, StatsCard, Separator, ScrollViewLayout } from 'components';
// TODO: Use different icons without attributions (these are from flaticon) or add attributions
import { sad, happy, money } from 'assets/icons/stats';
import { makeStyles } from 'utils';

const Statistics = () => {
  const styles = useStyles();

  // TODO: Use stats from API, not mocked data
  return (
    <View style={styles.container}>
      <AppBar isDrawer />

      <ScrollViewLayout>
        {/* Cards */}
        <View style={styles.container2}>
          <StatsCard
            title='Food eaten'
            icon={happy}
            last7data={['120 kg', '500 ml']}
            last30data={['600 kg', '12100 ml', '30 pieces']}
          />
          <Separator />
          <StatsCard
            title='Food wasted'
            icon={sad}
            last7data={['50 kg']}
            last30data={['120 kg', '100 ml']}
          />
          <Separator />
          <StatsCard
            title='Money spent'
            icon={money}
            last7data={['500 PLN']}
            last30data={['1500 PLN']}
          />
        </View>
      </ScrollViewLayout>

      {/* Space for bottom nav bar */}
      <Separator height={54} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default Statistics;
