import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar, Text } from 'react-native-paper';

const UserInfo = ({ text, subtext, avatarURI }) => {
    const theme = useTheme();

    return (
        <View style={styles(theme).container}>
        <Avatar.Image
          source={avatarURI}
          size={64}
        />
        <View style={styles(theme).nameAndNickColumn}>
          <Text style={styles(theme).name}>{text}</Text>
          <Text style={styles(theme).nick}>{subtext}</Text>
        </View>
      </View>
    );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 16,
    },
    nameAndNickColumn: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 16,
    },
    name: {
      fontSize: 24,
      color: theme.colors.text,
    },
    nick: {
      fontSize: 18,
      color: theme.colors.silverMetallic,
    },
  });


  export default UserInfo;