import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync();
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
let stories = require('./temp_stories.json');

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded: true,
    });
  }

  componentDidMount() {
    this.loadFontsAsync();
  }
  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image
              source={require('../assets/story_image_1.png')}
              style={{
                width: Dimensions.get('window').width - 60,
                height: 250,
                resizeMode: 'contain',
                marginLeft: 10,
              }}></Image>
            <View style={styles.titleContainer}>
              {' '}
              <Text style={styles.storyTitleText}>
                {' '}
                {this.props.story.title}{' '}
              </Text>{' '}
              <Text style={styles.storyAuthorText}>
                {' '}
                {this.props.story.author}{' '}
              </Text>{' '}
              <Text style={styles.descriptionText}>
                {' '}
                {this.props.story.description}{' '}
              </Text>{' '}
            </View>{' '}
            <View style={styles.actionContainer}>
              {' '}
              <View style={styles.likeButton}>
                {' '}
                <Ionicons
                  name={'heart'}
                  size={RFValue(30)}
                  color={'white'}
                />{' '}
                <Text style={styles.likeText}>12k</Text>{' '}
              </View>{' '}
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: { paddingLeft: RFValue(20), justifyContent: 'center' },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
