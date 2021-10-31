import React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserInfo = ({
  title,
  subtitle,
  avatarURI,
  onClick,
  variant = 'small',
  icon1 = null,
  onPressIcon1 = null,
  iconTint1,
  icon2 = null,
  onPressIcon2 = null,
  iconTint2,
}) => {
  const styles = useStyles({ variant, iconTint1, iconTint2 });

  return (
    <View style={styles.container}>
      <TouchableRipple style={{ flex: 1 }} onPress={onClick}>
        <View style={styles.dataContainer}>
          <Image style={styles.avatar} source={{ uri: avatarURI }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableRipple>
      <View style={styles.iconsContainer}>
        {icon1 && (
          <TouchableOpacity onPress={onPressIcon1}>
            <Image style={styles.icon1} source={icon1} />
          </TouchableOpacity>
        )}
        {icon1 && icon2 && <View style={styles.separatorHorizontal16} />}
        {icon2 && (
          <TouchableOpacity onPress={onPressIcon2}>
            <Image style={styles.icon2} source={icon2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

UserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatarURI: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['small', 'big']),
  icon1: PropTypes.number,
  onPressIcon1: PropTypes.func,
  icon2: PropTypes.number,
  onPressIcon2: PropTypes.func,
};

const useStyles = makeStyles((theme, { variant, iconTint1, iconTint2 }) => {
  const obj = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    textContainer: {
      marginLeft: 16,
    },
    iconsContainer: {
      flexDirection: 'row',
      padding: 16,
    },
    title: {
      color: theme.colors.text,
    },
    subtitle: {
      color: theme.colors.silverMetallic,
    },
    avatar: {
      borderRadius: 32,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.silverMetallic,
    },
    icon1: {
      height: 24,
      width: 24,
      tintColor: iconTint1,
    },
    icon2: {
      height: 24,
      width: 24,
      tintColor: iconTint2,
    },
    separatorHorizontal16: {
      marginHorizontal: 8,
    },
  };
  if (variant === 'small') {
    obj.avatar.width = 32;
    obj.avatar.height = 32;
    obj.title.fontSize = 14;
    obj.subtitle.fontSize = 12;
  }
  if (variant === 'big') {
    obj.avatar.width = 64;
    obj.avatar.height = 64;
    obj.title.fontSize = 24;
    obj.subtitle.fontSize = 18;
  }
  return obj;
});

export default UserInfo;
