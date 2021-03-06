import React, {Component} from 'react';
import {StyleSheet, Text, Button, View, Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
} from 'native-base';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {fetchProfile, updateAccount} from '../public/redux/actions/Profile';

class CompanyEdit extends Component {
  static navigationOptions = {
    title: 'Update Data',
  };

  constructor() {
    super();
    this.state = {
      skill: '',
      dateOfBirth: '',
      age: '',
      location: '',
      expectedSallary: '',
      name: '',
      description: '',
      showcase: null,
      errors: [],
    };
  }

  handleEditCompany = async () => {
    if (!this.state.name) {
      return Alert.alert('Alert', 'Name is required');
    }
    if (!this.state.location) {
      return Alert.alert('Alert', 'Location is required');
    }
    if (!this.state.description) {
      return Alert.alert('Alert', 'Description is required');
    }
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('location', this.state.location);

    try {
      let url = `http://3.92.63.204:3030/api/v1/${await AsyncStorage.getItem(
        '@hiringWho',
      )}/${await AsyncStorage.getItem('@hiringId')}`;
      this.props.updateAccount(url, formData);
    } catch (e) {
      // error reading value
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.profile.length) {
      this.setState({
        name: nextProps.propsData.profile[0].name,
        location: nextProps.propsData.profile[0].location,
        description: nextProps.propsData.profile[0].description,
      });
    }
    if (nextProps.propsData.updated) {
      this.getData();
      this.props.navigation.navigate('Me');
      Alert.alert('Alert', 'Profil has been updated');
    }
    if (nextProps.propsData.isError) {
      Alert.alert('Alert', 'Error');
    }
  }

  getData = async () => {
    try {
      let url = `http://3.92.63.204:3030/api/v1/${await AsyncStorage.getItem(
        '@hiringWho',
      )}/${await AsyncStorage.getItem('@hiringId')}`;
      this.props.fetchProfile(url);
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Container style={{height: 400}}>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Location</Label>
                  <Input
                    value={this.state.location}
                    onChangeText={location => this.setState({location})}
                  />
                </Item>
                <Text style={styles.description}>Description :</Text>
                <Container style={{marginTop: 3}}>
                  <Content padder>
                    <Form>
                      <Textarea
                        value={this.state.description}
                        rowSpan={5}
                        bordered
                        placeholder="Description"
                        onChangeText={description =>
                          this.setState({description})
                        }
                      />
                    </Form>
                  </Content>
                </Container>
              </Form>
            </Content>
            <View style={styles.bottomButton}>
              <Button
                title="Save"
                color="#009688"
                onPress={this.handleEditCompany}
              />
            </View>
          </Container>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  propsData: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
  updateAccount: (url, formData) => dispatch(updateAccount(url, formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyEdit);

const styles = StyleSheet.create({
  description: {
    fontSize: 17,
    marginTop: 13,
    marginLeft: 15,
    marginBottom: -5,
  },
  bottomButton: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30,
  },
});
