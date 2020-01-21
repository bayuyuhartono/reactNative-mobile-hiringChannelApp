import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PictureBox = props => {
  const {imageUrl, serverUrl, email, navigation, profileTag} = props;
  return (
    <>
      <ImageBackground
        source={{
          uri: 'http://3.92.63.204:3030/' + imageUrl,
        }}
        style={[styles.box]}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.backWard}>
          <Text style={styles.emailFont}>
            {!profileTag && (
              <Icon
                name="angle-left"
                size={35}
                color="grey"
                solid
                onPress={() => navigation.goBack()}
              />
            )}
            {profileTag && (
              <Icon
                name="camera"
                size={35}
                color="grey"
                solid
                onPress={() => navigation.navigate('UpdateAva')}
              />
            )}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.emailContain}>
            <Text style={styles.emailFont}>{email}</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default PictureBox;

const styles = StyleSheet.create({
  box: {
    height: 400,
    backgroundColor: '#009688',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  backWard: {
    justifyContent: 'flex-start',
    marginTop: 15,
    height: 40,
  },
  container: {
    height: 240,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emailContain: {
    backgroundColor: '#009688',
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: -120,
  },
  emailFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 4,
  },
});
