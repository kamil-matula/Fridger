import React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const UserInfo = ({
  title,
  subtitle,
  subtitleTint,
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
  const styles = useStyles({ subtitleTint, variant, iconTint1, iconTint2 });

  return (
    <TouchableRipple onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Image style={styles.avatar} source={{ uri: avatarURI }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <View style={styles.iconsContainer}>
          {icon1 && (
            <View style={{ borderRadius: 20, overflow: 'hidden' }}>
              <TouchableRipple onPress={onPressIcon1}>
                <Image style={styles.icon1} source={icon1} />
              </TouchableRipple>
            </View>
          )}
          {icon1 && icon2 && <View style={styles.separatorHorizontal16} />}
          {icon2 && (
            <View style={{ borderRadius: 20, overflow: 'hidden' }}>
              <TouchableRipple onPress={onPressIcon2}>
                <Image style={styles.icon2} source={icon2} />
              </TouchableRipple>
            </View>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
};

UserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subtitleTint: PropTypes.string,
  avatarURI: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['small', 'big']),
  icon1: PropTypes.number,
  iconTint1: PropTypes.string,
  onPressIcon1: PropTypes.func,
  icon2: PropTypes.number,
  iconTint2: PropTypes.string,
  onPressIcon2: PropTypes.func,
};

const useStyles = makeStyles(
  (theme, { subtitleTint, variant, iconTint1, iconTint2 }) => {
    // Common styles:
    const obj = {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        color: theme.colors.white,
      },
      subtitle: {
        color: subtitleTint || theme.colors.silverMetallic,
      },
      avatar: {
        borderRadius: 32,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.silverMetallic,
      },
      icon1: {
        height: 24,
        width: 24,
        margin: 8,
        tintColor: iconTint1,
      },
      icon2: {
        height: 24,
        width: 24,
        margin: 8,
        tintColor: iconTint2,
      },
      separatorHorizontal16: {
        marginHorizontal: 8,
      },
    };

    // Different sizings:
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
  }
);

export default UserInfo;
