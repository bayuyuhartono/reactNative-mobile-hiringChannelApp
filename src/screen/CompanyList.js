import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import {SERVER_URL} from 'react-native-dotenv';
import {FlatGrid} from 'react-native-super-grid';
import {SearchBar, PricingCard} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Logo from '../components/Logo';

import {connect} from 'react-redux';
import {fetchCompanys} from '../public/redux/actions/CompanyList';

export class CompanyList extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  constructor() {
    super();

    this.state = {
      keyword: '',
      searchBy: 'name',
      searchKey: '',
    };
  }

  onSearch = e => {
    this.setState({keyword: e, searchKey: e});
    let url = `${SERVER_URL}/api/v1/company?searchBy=${
      this.state.searchBy
    }&keyword=${e}`;
    this.props.fetchCompanys(url);
  };

  componentDidMount() {
    let url = `${SERVER_URL}/api/v1/company`;
    this.props.fetchCompanys(url);
  }

  render() {
    const {keyword} = this.state;
    return (
      <>
        <View style={styles.headContainer}>
          <View style={styles.colBackward}>
            <Text>
              <Icon
                name="angle-left"
                size={35}
                color="grey"
                solid
                onPress={() => this.props.navigation.goBack()}
              />
            </Text>
          </View>
          <View style={styles.colSearchBar}>
            <SearchBar
              placeholder="Search Here..."
              onChangeText={text => {
                this.onSearch(text);
              }}
              value={keyword}
              platform="ios"
              containerStyle={styles.searchbar}
              round={true}
            />
          </View>
        </View>
        {this.props.propsData.isLoading && (
          <ActivityIndicator size="large" color="#009688" />
        )}
        {!this.props.propsData.isLoading && this.props.propsData.isEmpty && (
          <PricingCard
            color="tomato"
            title="Sorry, we couldn't find any data for"
            price={keyword}
            button={{title: 'Back', icon: 'flight-takeoff'}}
            onButtonPress={() => this.onSearch('')}
          />
        )}
        {!this.props.propsData.isLoading && !this.props.propsData.isEmpty && (
          <FlatGrid
            itemDimension={130}
            items={this.props.propsData.companys}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={20}
            renderItem={({item, index}) => (
              <Logo item={item} serverUrl={SERVER_URL} />
            )}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: -430,
  },
  colBackward: {
    marginTop: 20,
    width: '8%',
  },
  colSearchBar: {
    width: '92%',
  },
  searchbar: {
    backgroundColor: 'white',
  },
  gridView: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 25,
  },
});

const mapStateToProps = state => ({
  propsData: state.companys,
});

const mapDispatchToProps = dispatch => ({
  fetchCompanys: url => dispatch(fetchCompanys(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyList);
