import React from 'react';

import { Text, View, Image } from 'react-native';

import { Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';
import pidgeon from '../../../assets/images/pidgeon.png';

const SignUpFeedback = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hurrah!</Text>
        <Text style={styles.text}>You have created an account.{'\n'}Please confirm your email.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={pidgeon} />
      </View>
      <Button label='Next' variant='contained' />
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
    marginVertical: 64,
  },
  header: {
    fontSize: 36,
    color: theme.colors.text,
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: null,
    resizeMode: 'contain',
    flex: 1,
  },
}));

export default SignUpFeedback;
