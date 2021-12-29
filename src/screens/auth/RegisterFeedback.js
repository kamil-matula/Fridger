import React from 'react';

import { Text, View, Image } from 'react-native';

import { Button } from 'components';
import { makeStyles } from 'utils/makeStyles';
import { mail } from 'assets/icons';

const RegisterFeedback = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hurrah!</Text>
        <Text style={styles.text}>
          You have created an account.{'\n'}Please confirm your email.
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={mail} />
      </View>
      <Button
        label='OK'
        variant='contained'
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    marginTop: 64,
  },
  header: {
    fontSize: 36,
    color: theme.colors.white,
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: theme.colors.white,
    textAlign: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64,
  },
  icon: {
    width: 256,
    height: 256,
    tintColor: theme.colors.white,
  },
}));

export default RegisterFeedback;
