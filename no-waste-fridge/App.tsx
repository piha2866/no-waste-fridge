import React from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import ContentGrid from './src/screens/content/content_grid';
import ContentCreationButton from './src/screens/content/content_creation_button';
import colors from './src/styles/colors';

export default function App(): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{...styles.mainContainer, paddingVertical: height*0.05}}> 
      <View style={styles.contentGridContainer}>
        <Text style={{...styles.sectionTitle, paddingVertical: height*0.05}}>Your fridges content</Text>
        <ContentGrid items={["Test13 uzfzt 6657 hjthcvjk","Test13 uzfzt 6657 hjthcvjk", "Test2", "Test3", "Test2", "Test3", "Test2", "Test3", "Test2", "Test13 uzfzt 6657 hjthcvjk", "Test2", "Test3", "Test2", "Test3", "Test2", "Test3", "Test2","Test2", "Test3", "Test2", "Test3", "Test2", "Test3", "Test2","Test13 uzfzt 6657 hjthcvjk", "Test2", "Test3", "Test2", "Test3", "Test2", "Test3", "Test2"].sort()} />
      </View>
      <ContentCreationButton/>
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  contentGridContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: '5%',
  }
});
