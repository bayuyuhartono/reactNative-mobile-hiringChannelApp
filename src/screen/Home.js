import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {SERVER_URL} from 'react-native-dotenv';

import Showcase from '../components/Showcase';
import Logo from '../components/Logo';

import {connect} from 'react-redux';
import {
  fetchEngineersHome,
  fetchCompanysHome,
} from '../public/redux/actions/Home';

class Home extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };

  componentDidMount() {
    let url = `${SERVER_URL}/api/v1/company`;
    this.props.fetchCompanysHome(url);
    url = `${SERVER_URL}/api/v1/engineer?&sortBy=name&order=ASC&page=1&limit=4`;
    this.props.fetchEngineersHome(url);
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <ImageBackground
            source={require('../public/image/headerImage.png')}
            style={[styles.box]}
            imageStyle={styles.imageStyle}
            resizeMode="cover">
            <View style={styles.containerHead}>
              <View style={styles.headTextContain}>
                <Text style={styles.headTextFont}>
                  Find Software Developers
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.titleBar}>
            <View style={styles.titleCol}>
              <Text style={styles.titleText}>Featured Developer</Text>
            </View>
            <View style={styles.viewCol}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EngineersList')}>
                <Text style={styles.moreText}>View More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatGrid
              itemDimension={130}
              items={this.props.propsDataHome.engineersHome.slice(0, 4)}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={20}
              renderItem={({item, index}) => (
                <Showcase
                  item={item}
                  serverUrl={SERVER_URL}
                  heightProps={{height: 170}}
                />
              )}
            />
          </View>
          <View style={styles.titleBar}>
            <View style={styles.titleCol}>
              <Text style={styles.titleText}>Featured Company</Text>
            </View>
            <View style={styles.viewCol}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CompanyList')}>
                <Text style={styles.moreText}>View More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatGrid
              itemDimension={130}
              items={this.props.propsDataHome.companysHome.slice(0, 4)}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={20}
              renderItem={({item, index}) => (
                <Logo item={item} serverUrl={SERVER_URL} />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: '100%'},
  gridView: {
    flex: 1,
  },
  titleBar: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: -15,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleCol: {
    width: '70%',
  },
  viewCol: {
    width: '30%',
    alignItems: 'flex-end',
  },
  titleText: {
    fontWeight: 'bold',
  },
  moreText: {
    color: '#009688',
    fontWeight: 'bold',
  },
  box: {
    height: 270,
    backgroundColor: '#009688',
    alignItems: 'flex-start',
  },
  containerHead: {
    marginTop: 20,
    height: 240,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headTextContain: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },
  headTextFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 4,
  },
});

const mapStateToProps = state => ({
  propsDataHome: state.home,
});

const mapDispatchToProps = dispatch => ({
  fetchEngineersHome: url => dispatch(fetchEngineersHome(url)),
  fetchCompanysHome: url => dispatch(fetchCompanysHome(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
