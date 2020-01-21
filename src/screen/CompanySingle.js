import React, {Component} from 'react';
import PictureBox from '../components/PictureBox';
import {SERVER_URL} from 'react-native-dotenv';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import DescriptionCard from '../components/DescriptionCard';

export default class CompanySingle extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('allProps', {});
    return (
      <>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <PictureBox
              imageUrl={item.logo}
              serverUrl={SERVER_URL}
              email={item.email}
              navigation={navigation}
            />
            <View style={styles.container}>
              <Text style={styles.nameTag}>{item.name}</Text>
              <View style={styles.identity}>
                <Text style={styles.iconId}>
                  <Icon name="address-card" size={25} color="#009688" solid />
                </Text>
                <Text style={styles.textId}>{item.location}</Text>
              </View>
              <View style={styles.containDesc}>
                <DescriptionCard description={item.description} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  nameTag: {
    fontSize: 25,
  },
  skill: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  identity: {
    marginTop: 15,
    flexDirection: 'row',
  },
  iconId: {
    marginRight: 10,
    width: 30,
    alignItems: 'center',
  },
  textId: {
    fontSize: 16,
  },
  containDesc: {
    marginTop: 5,
  },
});
