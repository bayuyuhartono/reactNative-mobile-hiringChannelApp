import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {SERVER_URL} from 'react-native-dotenv';
import {FlatGrid} from 'react-native-super-grid';
import {SearchBar, Button, PricingCard} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import _ from 'lodash';

import Showcase from '../components/Showcase';

import {connect} from 'react-redux';
import {
  fetchEngineers,
  moreEngineers,
} from '../public/redux/actions/EngineerList';

class EngineersList extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  constructor() {
    super();

    this.state = {
      searchBy: 'name',
      searchKey: '',
      sortBy: 'name',
      order: 'ASC',
      page: '1',
      limit: '6',
    };

    // this.onSearch = _.debounce(this.onSearch, 2000);
  }

  onSearch = e => {
    this.setState({searchKey: e});
    let url = `${SERVER_URL}/api/v1/engineer?searchBy=${
      this.state.searchBy
    }&keyword=${e}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${
      this.state.page
    }&limit=${this.state.limit}`;
    this.props.fetchEngineers(url);
  };

  loadMoreData = () => {
    let url = `${SERVER_URL}/api/v1/engineer?searchBy=${
      this.state.searchBy
    }&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${
      this.state.order
    }&page=2&limit=${this.state.limit}`;
    this.props.fetchEngineers(url);
  };

  componentDidMount() {
    let url = `${SERVER_URL}/api/v1/engineer?searchBy=${
      this.state.searchBy
    }&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${
      this.state.order
    }&page=${this.state.page}&limit=${this.state.limit}`;
    this.props.fetchEngineers(url);
  }

  loadMoreData = () => {
    let url = SERVER_URL + this.props.propsData.nextPage;
    this.props.moreEngineers(url);
  };

  renderFooter() {
    if (!this.props.propsData.isLoading && this.props.propsData.isEmpty) {
      return (
        <PricingCard
          color="tomato"
          title="Sorry, we couldn't find any data for"
          price={this.state.searchKey}
          button={{title: 'Back', icon: 'flight-takeoff'}}
          onButtonPress={() => this.onSearch('')}
        />
      );
    } else {
      if (this.props.propsData.isLoading) {
        return <ActivityIndicator size="large" color="#009688" />;
      } else {
        return (
          //Footer View with Load More button
          <Button
            title="Load More..."
            onPress={this.loadMoreData}
            buttonStyle={styles.loadMoreBtn}
          />
        );
      }
    }
  }

  render() {
    const {searchKey} = this.state;
    return (
      <>
        <FlatGrid
          itemDimension={500}
          items={this.props.propsData.engineers}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={20}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View style={styles.headContainer}>
              <View style={styles.colBackward}>
                <Text>
                  <Icon
                    name="angle-left"
                    size={35}
                    color="grey"
                    solid
                    onPress={() => {
                      let url = `${SERVER_URL}/api/v1/engineer?searchBy=name&keyword=&sortBy=name&order=asc&page=1&limit=6`;
                      this.props.fetchEngineers(url);
                      this.props.navigation.goBack();
                    }}
                  />
                </Text>
              </View>
              <View style={styles.colSearchBar}>
                <SearchBar
                  placeholder="Search Here..."
                  onChangeText={text => {
                    this.onSearch(text);
                  }}
                  value={searchKey}
                  platform="ios"
                  containerStyle={styles.searchbar}
                  round={true}
                />
              </View>
            </View>
          }
          renderItem={({item, index}) => (
            <Showcase
              item={item}
              serverUrl={SERVER_URL}
              heightProps={{height: 300}}
            />
          )}
          ListFooterComponent={this.renderFooter.bind(this)}
          //Adding Load More button as footer component
        />
        {/* )} */}
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
    backgroundColor: 'white',
  },
  colBackward: {
    marginTop: 20,
    width: '8%',
  },
  colSearchBar: {
    flex: 1,
  },
  searchbar: {
    backgroundColor: 'white',
  },
  gridView: {
    marginTop: -20,
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
    backgroundColor: '#009688',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 40,
    marginTop: -20,
  },
});

const mapStateToProps = state => ({
  propsData: state.engineers,
});

const mapDispatchToProps = dispatch => ({
  fetchEngineers: url => dispatch(fetchEngineers(url)),
  moreEngineers: url => dispatch(moreEngineers(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineersList);
