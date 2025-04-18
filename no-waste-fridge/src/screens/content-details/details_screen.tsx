import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { BackButton } from '../../components/buttons';
import text from '../../styles/text';
import container from '../../styles/container';

const DetailsScreen = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{...container.main, paddingVertical: height*0.05}}>
      <View style={{height: '30%', backgroundColor: 'pink', flexDirection: 'row', display: 'flex'}}>
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
      <View style={{backgroundColor: "yellow"}}>
        <Text style={styles.title}>Content Title</Text>
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

})