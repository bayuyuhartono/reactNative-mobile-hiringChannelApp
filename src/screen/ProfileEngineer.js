import React from 'react';
import PictureBox from '../components/PictureBox';
import {SERVER_URL} from 'react-native-dotenv';
import {View, Text, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import {withNavigation} from 'react-navigation';

import DescriptionCard from '../components/DescriptionCard';

const ProfileEngineer = props => {
  const {allProps, navigation} = props;
  return (
    <>
      <PictureBox
        imageUrl={allProps.showcase}
        serverUrl={SERVER_URL}
        email={allProps.email}
        navigation={navigation}
        profileTag={true}
      />
      <View style={styles.container}>
        <View style={styles.titleName}>
          <View style={styles.colName}>
            <Text style={styles.nameTag}>{allProps.name}</Text>
          </View>
          <View style={styles.colButton}>
            <Button
              title="Update"
              color="#009688"
              onPress={() => navigation.navigate('EngineerEdit')}
            />
          </View>
        </View>
        <Text style={styles.skill}>{allProps.skill}</Text>
        <View style={styles.identity}>
          <Text style={styles.iconId}>
            <Icon name="address-card" size={25} color="#009688" solid />
          </Text>
          <Text style={styles.textId}>{allProps.location}</Text>
        </View>
        <View style={styles.identity}>
          <Text style={styles.iconId}>
            <Icon name="calendar-alt" size={25} color="#009688" solid />
          </Text>
          <Text style={styles.textId}>
            <Moment element={Text} format="MMMM / DD / YYYY">
              {allProps.dateOfBirth}
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
              value={allProps.expectedSallary}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp.'}
            />
          </Text>
        </View>
        <View style={styles.containDesc}>
          <DescriptionCard description={allProps.description} />
        </View>
      </View>
    </>
  );
};

export default withNavigation(ProfileEngineer);

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
  titleName: {
    flex: 1,
    flexDirection: 'row',
  },
  colName: {
    width: '70%',
  },
  colButton: {
    marginLeft: 15,
    width: '25%',
    alignItems: 'flex-end',
  },
  bottomButton: {
    marginTop: 10,
  },
});
