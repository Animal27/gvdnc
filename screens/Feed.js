import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, Platform } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "./StoryCard"


SplashScreen.preventAutoHideAsync();
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
let stories = require('./temp_stories.json');

export default class Feed extends Component {
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
  renderItem = ({
    item:story
  }) => {
    return  <StoryCard
    story = {story}
    />
  }
  keyExtractor = (
    item, index
  ) => index.toString()
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <View style = {styles.appTitle}>
          <View style = {styles.appIcon}>
          <Image source = {require("../assets/logo.png")} style = {{
            width:60, height:60, resizeMode: "contain", marginLeft:10
          }}>
          </Image>
          </View>
          <View style = {styles.appTitleTextConatiner}>
          <Text style = {styles.appTitleText}> 
          Story Telling App
          </Text>
          </View>
          </View>
          <View style = {styles.cardContainer}>
          <FlatList keyExtractor = {this.keyExtractor}
          data = {stories}
          renderItem = {this.renderItem}
          />
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#15193c' },
  androidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: { flex: 0.07, flexDirection: 'row' },
  appIcon: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
  iconImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  appTitleTextContainer: { flex: 0.7, justifyContent: 'center' },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  cardContainer: { flex: 0.93 },
});
