import React, {Component} from 'react';
import PictureBox from '../components/PictureBox';
import {SERVER_URL} from 'react-native-dotenv';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import DescriptionCard from '../components/DescriptionCard';

export default class EngineerSingle extends Component {
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
              imageUrl={item.showcase}
              serverUrl={SERVER_URL}
              email={item.email}
              navigation={navigation}
            />
            <View style={styles.container}>
              <Text style={styles.nameTag}>{item.name}</Text>
              <Text style={styles.skill}>{item.skill}</Text>
              <View style={styles.identity}>
                <Text style={styles.iconId}>
                  <Icon name="address-card" size={25} color="#009688" solid />
                </Text>
                <Text style={styles.textId}>{item.location}</Text>
              </View>
              <View style={styles.identity}>
                <Text style={styles.iconId}>
                  <Icon name="calendar-alt" size={25} color="#009688" solid />
                </Text>
                <Text style={styles.textId}>
                  <Moment element={Text} format="MMMM / DD / YYYY">
                    {item.dateOfBirth}
                  </Moment>
                </Text>
              </View>
              <View style={styles.identity}>
                <Text style={styles.iconId}>
                  <Icon name="money-bill-alt" size={25} color="#009688" solid />
                </Text>
                <Text style={styles.textId}>
                  <NumberFormat
                    renderText={value => <Text>{value}</Text>}
                    value={item.expectedSallary}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </Text>
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
