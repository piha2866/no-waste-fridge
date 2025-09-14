import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { deleteNote } from '../../backend/db/notes/delete';
import { insertNote } from '../../backend/db/notes/insert';
import { updateNote } from '../../backend/db/notes/update';
import { IconButton } from '../../components/buttons';
import DateTimePickerCombiField from '../../components/date_time_picker_combi_field';
import { useDatabase } from '../../context/db';
import container from '../../styles/container';
import text from '../../styles/text';
import { NewNote, Note } from '../../types/note/note';
import { openCamera } from '../../utils/camera';
import { calcNewExpirationDate } from '../../utils/date_formatting';
import { isNote } from '../../utils/typeguards';

const emptyNote: NewNote = {
  title: '',
  description: '',
  expirationDate: new Date(),
  openingDate: new Date(),
};

const DetailsScreen = ({ route }: any) => {
  const { db } = useDatabase();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const { note: passedNote } = route.params || {};
  const [note, setNote] = useState<Note | NewNote>(passedNote || emptyNote);
  const [temporaryNote, setTemporaryNote] = useState<boolean>(note.id ? false : true);

  const [prevNote, setPrevNote] = useState<Note | false>(false);

  const saveNote = async (note: Note | NewNote): Promise<void> => {
    setTemporaryNote(false);
    const savedNote = isNote(note)
      ? await updateNote(db, note as Note)
      : await insertNote(db, note);
    if (!note.id) {
      console.log('set after save');
      setNote(savedNote);
    }
  };

  const handleOpeningDateChange = async (date: Date) => {
    console.log('opening date change', date);
    setNote((prev) => ({ ...prev, openingDate: date }));
    if (date > note.expirationDate) {
      const newExpirationDate = calcNewExpirationDate(note.openingDate, note.expirationDate, date);
      void handleExpirationDateChange(newExpirationDate);
    }
  };

  const handleExpirationDateChange = async (date: Date) => {
    console.log('expiration', date);
    setNote((prev) => ({ ...prev, expirationDate: date }));
  };

  const [imageLocation, setImageLocation] = useState<string | undefined>(note.imageLocation);

  useEffect(() => {
    console.log('note changed, temporary note:', temporaryNote);
    if (temporaryNote) return;
    console.log('saving', note);
    void saveNote(note);
  }, [note]);

  const handleHome = () => {
    navigation.goBack();
  };
  const goToPreviousNote = () => {
    if (prevNote) {
      setNote(prevNote);
      setPrevNote(false);
    }
  };
  const handleDelete = async () => {
    if (!isNote(note)) return;
    await deleteNote(db, note.id);
    navigation.goBack();
  };

  const handleClone = () => {
    const newOpeningDate = new Date();
    const newExpirationDate = calcNewExpirationDate(note.openingDate, note.expirationDate);
    const clonedNote: NewNote = {
      title: note.title,
      description: note.description,
      openingDate: newOpeningDate,
      expirationDate: newExpirationDate,
    };
    setPrevNote(note as Note);
    setNote({ ...clonedNote });
  };
  const handleReset = () => {
    const newOpeningDate = new Date();
    const newExpirationDate = calcNewExpirationDate(note.openingDate, note.expirationDate);
    const newNote: Note = {
      ...(note as Note),
      openingDate: newOpeningDate,
      expirationDate: newExpirationDate,
    };
    setPrevNote(note as Note);
    setNote(newNote);
  };

  const addPhoto = async () => {
    void openCamera(setImageLocation);
  };

  return (
    <View style={{ ...container.main, paddingVertical: height * 0.05 }}>
      <View style={styles.imageIconsContainer}>
        <View style={styles.left} testID="content_details_back_button">
          <IconButton iconName="home" onPress={handleHome} />
          {prevNote && <IconButton iconName="arrow-back" onPress={goToPreviousNote} />}
        </View>
        <View style={styles.middle}>
          <TouchableOpacity style={styles.imageButton} onPress={addPhoto}>
            <Image
              source={
                imageLocation
                  ? { uri: `file://${imageLocation}` }
                  : // eslint-disable-next-line @typescript-eslint/no-require-imports
                    require('../../assets/images/default-food.png')
              }
              style={styles.image}
              resizeMode="contain"
              id="content_details_image"
              testID="content_details_image"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          {!isNote(note) && (
            <IconButton
              iconName="done"
              onPress={() => {
                if (note !== emptyNote) void saveNote(note);
                handleHome();
              }}
            />
          )}
          {isNote(note) && <IconButton iconName="delete" onPress={handleDelete} />}
          {isNote(note) && <IconButton iconName="content-copy" onPress={handleClone} />}
          {isNote(note) && <IconButton iconName="restore" onPress={handleReset} />}
        </View>
      </View>
      <View>
        <TextInput
          style={styles.title}
          value={note.title}
          placeholder="Title"
          id="content_details_title_field"
          testID="content_details_title_field"
          onChangeText={(text: string) => setNote((prev) => ({ ...prev, title: text }))}
          multiline={true}
        />
        <TextInput
          placeholder="Description"
          value={note.description}
          id="content_details_description_field"
          testID="content_details_description_field"
          onChangeText={(text: string) => setNote((prev) => ({ ...prev, description: text }))}
          multiline={true}
        />
      </View>
      <View style={{ flexGrow: 1 }} />
      <View style={styles.detailsContainer}>
        <DateTimePickerCombiField
          name="Opening date"
          date={note.openingDate}
          testId="content_details_opening_date"
          id="content_details_opening_date"
          setDate={handleOpeningDateChange}
        />
        <DateTimePickerCombiField
          name="Expiration date"
          date={note.expirationDate}
          id="content_details_expiration_date"
          testId="content_details_expiration_date"
          setDate={handleExpirationDateChange}
          minDate={note.openingDate}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  title: { ...text.title },
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
  image: {
    flex: 1,
    minHeight: 100,
    minWidth: 100,
  },
  imageButton: { flex: 1, width: '100%' },
});
