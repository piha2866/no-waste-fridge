import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, TextInput } from 'react-native';
import { BackButton, IconButton } from '../../components/buttons';
import text from '../../styles/text';
import container from '../../styles/container';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  const handleDelete = () => console.log('Sure you want to delete?');
  const handleClone = () => console.log('Go to cloning edit page?');
  const handleReset = () => console.log('Set dates to now');
  return (
    <View style={{ ...container.main, paddingVertical: height * 0.05 }}>
      <View style={styles.imageIconsContainer}>
        <View style={styles.left}>
          <IconButton iconName="arrow-back" onPress={handleBack} />
        </View>
        <View style={styles.middle}>
          <Image
            source={require('../../assets/images/default-food.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.right}>
          <IconButton iconName="delete" onPress={handleDelete} />
          <IconButton iconName="content-copy" onPress={handleClone} />
          <IconButton iconName="restore" onPress={handleReset} />
        </View>
      </View>
      <View>
        <TextInput style={styles.title} placeholder="Title" />
        <TextInput placeholder="Description" />
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={styles.detailsContaienr}>
        <View style={styles.dateView}>
          <Text style={styles.standard}>Opening date</Text>
          <TextInput placeholder="DD.MM.YYYY" />
        </View>

        <View style={styles.dateView}>
          <Text style={styles.standard}>Expiration date</Text>
          <TextInput placeholder="DD.MM.YYYY" />
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  title: { ...text.title },
  standard: { ...text.standard },
  image: {
    flex: 1,
  },
  left: {
    width: 75,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  right: {
    width: 75,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
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
    flexDirection: 'row',
    display: 'flex',
  },
  detailsContaienr: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
