import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { deleteNote } from '../../backend/db/notes/delete';
import { IconButton } from '../../components/buttons';
import DateTimePickerCombiField from '../../components/date_time_picker_combi_field';
import { useDatabase } from '../../context/db';
import container from '../../styles/container';
import text from '../../styles/text';

const DetailsScreen = ({ route }: any) => {
  const { note } = route.params || {};
  const { db } = useDatabase();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const handleBack = () => {
    console.log('route params!', route.params);
    navigation.goBack();
  };
  const handleDelete = async () => {
    if (!note) return;
    console.log('Sure you want to delete?');
    await deleteNote(db, note.id);
    console.log('deleted');
    navigation.goBack();
  };
  const handleClone = () => console.log('Go to cloning edit page?');
  const handleReset = () => console.log('Set dates to now');

  return (
    <View style={{ ...container.main, paddingVertical: height * 0.05 }}>
      <View style={styles.imageIconsContainer}>
        <View style={styles.left} testID="content_details_back_button">
          <IconButton iconName="arrow-back" onPress={handleBack} />
        </View>
        <View style={styles.middle}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require('../../assets/images/default-food.png')}
            style={styles.image}
            resizeMode="contain"
            id="content_details_image"
            testID="content_details_image"
          />
        </View>
        <View style={styles.right}>
          {note && <IconButton iconName="delete" onPress={handleDelete} />}
          {note && <IconButton iconName="content-copy" onPress={handleClone} />}
          {note && <IconButton iconName="restore" onPress={handleReset} />}
        </View>
      </View>
      <View>
        <TextInput
          style={styles.title}
          value={note?.title}
          placeholder="Title"
          id="content_details_title_field"
          testID="content_details_title_field"
        />
        <TextInput
          placeholder="Description"
          value={note?.description}
          id="content_details_description_field"
          testID="content_details_description_field"
        />
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={styles.detailsContainer}>
        <DateTimePickerCombiField
          name="Opening date"
          value={note?.opening_date}
          testId="content_details_opening_date_input_field"
          id="content_details_opening_date_input_field"
        />
        <DateTimePickerCombiField
          name="Expiration date"
          value={note?.expiration_date}
          id="content_details_expiration_date_input_field"
          testId="content_details_expiration_date_input_field"
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  title: { ...text.title },
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
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
