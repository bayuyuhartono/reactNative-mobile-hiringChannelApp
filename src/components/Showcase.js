import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {withNavigation} from 'react-navigation';

const Showcase = props => {
  const {item, serverUrl, navigation, heightProps} = props;
  return (
    <TouchableOpacity
      key={item.name}
      onPress={() =>
        navigation.navigate('EngineerSingle', {
          allProps: item,
        })
      }>
      <ImageBackground
        source={{
          uri: 'http://3.92.63.204:3030/' + item.showcase,
        }}
        style={[styles.itemContainer, heightProps]}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <Text style={styles.fontName}>{item.name}</Text>
        <Text style={styles.fontSkill}>{item.skill}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default withNavigation(Showcase);

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 15,
  },
  fontName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  fontSkill: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
