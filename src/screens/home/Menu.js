import React from 'react';

import { View } from 'react-native';

import { AppBar, StatsCard } from 'components';
import { makeStyles } from 'utils';

const Menu = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer />
      <View style={styles.container2}>
        <StatsCard
          title='Food eaten'
          last7data={['120 kg', '500 ml']}
          last30data={['600 kg', '12100 ml', '30 pieces']}
        />
        <StatsCard
          title='Food wasted'
          last7data={['50 kg']}
          last30data={['120 kg', '100 ml']}
        />
        <StatsCard
          title='Money spent'
          last7data={['500 PLN']}
          last30data={['1500 PLN']}
        />
      </View>
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
    paddingHorizontal: 16,
  },
}));

export default Menu;
