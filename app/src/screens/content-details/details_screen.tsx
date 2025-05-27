import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, TextInput } from 'react-native';
import { BackButton } from '../../components/buttons';
import text from '../../styles/text';
import container from '../../styles/container';

const DetailsScreen = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{...container.main, paddingVertical: height*0.05}}>
      <View style={styles.imageIconsContainer}>
        <View style={styles.left}>
          <BackButton/>
        </View>
        <View style={styles.middle}>
          <Image source={require("../../assets/images/default-food.png")}  style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.right}>
          <Text>Right 1</Text>
          <Text>Right 2</Text>
        </View>
      </View>
      <View>
        <TextInput style={styles.title} placeholder='Title'/>
        <TextInput placeholder='Description'/>
      </View>
      <View style={{flexGrow: 1}}/>
      <View style={styles.detailsContaienr}>
          <View
            style={styles.dateView}>
            <Text style={styles.standard}>Opening date</Text>
            <TextInput placeholder='DD.MM.YYYY'/>
          </View>

          <View style={styles.dateView}>
            <Text style={styles.standard}>Expiration date</Text>
            <TextInput placeholder='DD.MM.YYYY'/>
          </View>
        </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  title: {...text.title},
  standard: {...text.standard},
  image: {
    flex:1
  },
  left: {
    width: 75,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#e0f7fa',
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fce4ec',
  },
  right: {
    width: 75,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#f3e5f5',
  },
  dateView: { 
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    flexShrink: 1,
    flexGrow: 1,
  },
  imageIconsContainer: {
    height: '30%', 
    backgroundColor: 'pink', 
    flexDirection: 'row', 
    display: 'flex'},
    detailsContaienr: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
})