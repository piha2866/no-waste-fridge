import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  useWindowDimensions,
  View,
} from 'react-native';

import { calcNewExpirationDate } from '../../../utils/date_formatting';
import { deleteNote } from '../../backend/db/notes/delete';
import { insertNote } from '../../backend/db/notes/insert';
import { updateNote } from '../../backend/db/notes/update';
import { Note } from '../../backend/db/types';
import { IconButton } from '../../components/buttons';
import DateTimePickerCombiField from '../../components/date_time_picker_combi_field';
import { useDatabase } from '../../context/db';
import container from '../../styles/container';
import text from '../../styles/text';

const DetailsScreen = ({ route }: any) => {
  const { db } = useDatabase();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const { note: passedNote } = route.params || {};
  const [note, setNote] = useState<Note>(passedNote || emptyNote);

  const [title, setTitle] = useState<string>(note.title);
  const handleTitleChange = async (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newNote: Note = { ...note, title };
    const savedNote = note.id ? await updateNote(db, newNote) : await insertNote(db, newNote);
    setNote(savedNote);
  };

  const [description, setDescription] = useState<string>(note.description);
  const handleDescriptionChange = async (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newNote: Note = { ...note, description };
    const savedNote = note.id ? await updateNote(db, newNote) : await insertNote(db, newNote);
    setNote(savedNote);
  };

  const [openingDate, setOpeningDate] = useState<Date>(new Date(note.opening_date));
  const handleOpeningDateChange = async (date: Date) => {
    const newNote: Note = { ...note, opening_date: `${date}` };
    const savedNote = note.id ? await updateNote(db, newNote) : await insertNote(db, newNote);
    setNote(savedNote);
    if (date > expirationDate) {
      console.log('new opedate', date.toISOString());
      const newExpirationDate = calcNewExpirationDate(openingDate, expirationDate, date);
      console.log('new exp date', newExpirationDate.toISOString());
      await handleExpirationDateChange(newExpirationDate);
    }
    setOpeningDate(date);
  };
  const [expirationDate, setExpirationDate] = useState<Date>(new Date(note.expiration_date));
  const handleExpirationDateChange = async (date: Date) => {
    setExpirationDate(date);
    const newNote: Note = { ...note, expiration_date: `${date}` };
    const savedNote = note.id ? await updateNote(db, newNote) : await insertNote(db, newNote);
    setNote(savedNote);
  };

  const handleBack = () => {
    console.log('route params!', route.params);
    navigation.goBack();
  };
  const handleDelete = async () => {
    if (!note.id) return;
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
          {note.id && <IconButton iconName="delete" onPress={handleDelete} />}
          {note.id && <IconButton iconName="content-copy" onPress={handleClone} />}
          {note.id && <IconButton iconName="restore" onPress={handleReset} />}
        </View>
      </View>
      <View>
        <TextInput
          style={styles.title}
          value={title}
          placeholder="Title"
          id="content_details_title_field"
          testID="content_details_title_field"
          onChangeText={setTitle}
          onBlur={(t) => handleTitleChange(t)}
        />
        <TextInput
          placeholder="Description"
          value={description}
          id="content_details_description_field"
          testID="content_details_description_field"
          onChangeText={setDescription}
          onBlur={(t) => handleDescriptionChange(t)}
        />
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={styles.detailsContainer}>
        <DateTimePickerCombiField
          name="Opening date"
          date={openingDate}
          testId="content_details_opening_date"
          id="content_details_opening_date"
          setDate={handleOpeningDateChange}
        />
        <DateTimePickerCombiField
          name="Expiration date"
          date={expirationDate}
          id="content_details_expiration_date"
          testId="content_details_expiration_date"
          setDate={handleExpirationDateChange}
          minDate={openingDate}
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
