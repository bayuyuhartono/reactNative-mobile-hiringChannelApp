import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {withNavigation} from 'react-navigation';

const Logo = props => {
  const {item, serverUrl, navigation} = props;
  return (
    <TouchableOpacity
      key={item.name}
      onPress={() =>
        navigation.navigate('CompanySingle', {
          allProps: item,
        })
      }>
      <ImageBackground
        source={{
          uri: 'http://3.92.63.204:3030/' + item.logo,
        }}
        style={[styles.itemContainer]}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <Text style={styles.fontName}>{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default withNavigation(Logo);

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    height: 170,
  },
  imageStyle: {
    borderRadius: 15,
  },
  fontName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
