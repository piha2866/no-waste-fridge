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

import { deleteNote } from '../../backend/db/notes/delete';
import { insertNote } from '../../backend/db/notes/insert';
import { updateNote } from '../../backend/db/notes/update';
import { IconButton } from '../../components/buttons';
import DateTimePickerCombiField from '../../components/date_time_picker_combi_field';
import { useDatabase } from '../../context/db';
import container from '../../styles/container';
import text from '../../styles/text';
import { NewNote, Note } from '../../types/note/note';
import { calcNewExpirationDate } from '../../utils/date_formatting';
import { isNote } from '../../utils/typeguards';

const emptyNote: NewNote = {
  title: '',
  description: '',
  expirationDate: String(new Date()),
  openingDate: String(new Date()),
};

const DetailsScreen = ({ route }: any) => {
  const { db } = useDatabase();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const { note: passedNote } = route.params || {};
  const [note, setNote] = useState<Note | NewNote>(passedNote || emptyNote);

  const [prevNote, setPrevNote] = useState<Note | false>(false);

  const saveNote = async (note: Note | NewNote): Promise<void> => {
    const savedNote = isNote(note)
      ? await updateNote(db, note as Note)
      : await insertNote(db, note);

    setNote(savedNote);
  };

  const [title, setTitle] = useState<string>(note.title);
  const handleTitleChange = async (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newNote: Note | NewNote = { ...note, title };
    void saveNote(newNote);
  };

  const [description, setDescription] = useState<string>(note.description);
  const handleDescriptionChange = async (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newNote: Note | NewNote = { ...note, description };
    void saveNote(newNote);
  };

  const [openingDate, setOpeningDate] = useState<Date>(new Date(note.openingDate));
  const handleOpeningDateChange = async (date: Date) => {
    const newNote: Note | NewNote = { ...note, openingDate: `${date}` };
    void saveNote(newNote);
    if (date > expirationDate) {
      const newExpirationDate = calcNewExpirationDate(openingDate, expirationDate, date);
      await handleExpirationDateChange(newExpirationDate);
    }
    setOpeningDate(date);
  };
  const [expirationDate, setExpirationDate] = useState<Date>(new Date(note.expirationDate));
  const handleExpirationDateChange = async (date: Date) => {
    setExpirationDate(date);
    const newNote: Note | NewNote = { ...note, expirationDate: `${date}` };
    void saveNote(newNote);
  };

  const handleHome = () => {
    navigation.goBack();
  };
  const goToPreviousNote = () => {
    if (prevNote) {
      setNote(prevNote);
      setOpeningDate(new Date(prevNote.openingDate));
      setExpirationDate(new Date(prevNote.expirationDate));
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
    const newExpirationDate = calcNewExpirationDate(openingDate, expirationDate);
    const clonedNote: NewNote = {
      title: note.title,
      description: note.description,
      openingDate: String(newOpeningDate),
      expirationDate: String(newExpirationDate),
    };
    setPrevNote(note as Note);
    setNote({ ...clonedNote });
    setOpeningDate(newOpeningDate);
    setExpirationDate(newExpirationDate);
  };
  const handleReset = () => {
    const newOpeningDate = new Date();
    const newExpirationDate = calcNewExpirationDate(openingDate, expirationDate);
    const newNote: Note = {
      ...(note as Note),
      openingDate: String(newOpeningDate),
      expirationDate: String(newExpirationDate),
    };
    setPrevNote(note as Note);
    setNote(newNote);
    setOpeningDate(newOpeningDate);
    setExpirationDate(newExpirationDate);
  };

  return (
    <View style={{ ...container.main, paddingVertical: height * 0.05 }}>
      <View style={styles.imageIconsContainer}>
        <View style={styles.left} testID="content_details_back_button">
          <IconButton iconName="home" onPress={handleHome} />
          {prevNote && <IconButton iconName="arrow-back" onPress={goToPreviousNote} />}
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
