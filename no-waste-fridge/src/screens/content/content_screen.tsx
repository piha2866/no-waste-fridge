import React from 'react';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import ContentGrid from './content_grid';
import ContentCreationButton from './content_creation_button';
import colors from '../../styles/colors';

const ContentScreen = ({ }) => {
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
};

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

export default ContentScreen;