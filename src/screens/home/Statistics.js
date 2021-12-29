import React from 'react';

import { ScrollView, View } from 'react-native';

import { ActivityIndicator, AppBar, StatsCard, Separator } from 'components';
import { sad, happy, money } from 'assets/icons/stats';
import { makeStyles } from 'utils';
import { useStatisticsQuery } from 'services/fridger/statistics';

const Statistics = () => {
  const styles = useStyles();

  // Queries:
  const statistics = useStatisticsQuery();

  // Helper functions:
  const retrieveMoneySpent = (json) => [`${json?.money_spent || 0.0} PLN`];
  const retrieveFoodEatenOrWasted = (json, state) => {
    const eatenOrWasted = json?.food_stats[state];
    if (!eatenOrWasted) return ['-'];

    const tmp = [];
    if (parseFloat(eatenOrWasted.kilograms) > 0)
      tmp.push(`${parseFloat(eatenOrWasted.kilograms).toFixed(2)} kg`);
    if (parseFloat(eatenOrWasted.liters) > 0)
      tmp.push(`${parseFloat(eatenOrWasted.liters).toFixed(2)} l`);
    if (parseFloat(eatenOrWasted.pieces) > 0)
      tmp.push(`${parseFloat(eatenOrWasted.pieces).toFixed(2)} pieces`);

    if (tmp.length === 0) tmp.push('-');
    return tmp;
  };

  return (
    <View style={styles.container}>
      <AppBar isDrawer />

      {statistics.isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {/* Cards */}
          <View style={styles.innerContainer}>
            <StatsCard
              title='Food eaten'
              icon={happy}
              last1data={retrieveFoodEatenOrWasted(
                statistics.data.last_24_hours,
                'eaten'
              )}
              last7data={retrieveFoodEatenOrWasted(
                statistics.data.last_7_days,
                'eaten'
              )}
              last30data={retrieveFoodEatenOrWasted(
                statistics.data.last_30_days,
                'eaten'
              )}
            />
            <Separator />
            <StatsCard
              title='Food wasted'
              icon={sad}
              last1data={retrieveFoodEatenOrWasted(
                statistics.data.last_24_hours,
                'wasted'
              )}
              last7data={retrieveFoodEatenOrWasted(
                statistics.data.last_7_days,
                'wasted'
              )}
              last30data={retrieveFoodEatenOrWasted(
                statistics.data.last_30_days,
                'wasted'
              )}
            />
            <Separator />
            <StatsCard
              title='Money spent'
              icon={money}
              last1data={retrieveMoneySpent(statistics.data.last_24_hours)}
              last7data={retrieveMoneySpent(statistics.data.last_7_days)}
              last30data={retrieveMoneySpent(statistics.data.last_30_days)}
            />
          </View>
        </ScrollView>
      )}

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
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
}));

export default Statistics;
