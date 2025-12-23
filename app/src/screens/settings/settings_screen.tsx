import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Button, Divider, List, Switch } from 'react-native-paper';

import { IconButton } from '../../components/buttons';
import container from '../../styles/container';
import text from '../../styles/text';

const SettingsScreen = ({ route }: any) => {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [securityMode, setSecurityMode] = useState<'PIN' | 'Biometrics'>('PIN');
  const handleHome = () => {
    navigation.goBack();
  };
  const { width, height } = useWindowDimensions();
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        screenPadding: {
          ...container.main,
          paddingVertical: height * 0.05,
        },
        topContainer: {
          height: height * 0.1,
          minHeight: 70,
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
    [height],
  );
  return (
    <View style={dynamicStyles.screenPadding}>
      <View style={dynamicStyles.topContainer}>
        <IconButton iconName="home" onPress={handleHome} />
        <View style={styles.titleBar}>
          <Text style={styles.sectionTitle}> Settings</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Appearance</Text>
        <List.Item
          title="Content View"
          right={() => (
            <View style={styles.toggleRow}>
              <Button
                mode={securityMode === 'PIN' ? 'contained' : 'outlined'}
                compact
                onPress={() => setSecurityMode('PIN')}
              >
                PIN
              </Button>
              <Button
                mode={securityMode === 'Biometrics' ? 'contained' : 'outlined'}
                compact
                onPress={() => setSecurityMode('Biometrics')}
              >
                Biometrics
              </Button>
            </View>
          )}
        />
        <List.Item
          title="Dark Mode"
          right={() => <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />}
        />
        {/* <List.Item
          title="Font Size"
          description={`${fontSize}`}
          right={() => (
            <Slider
              style={{ width: 150 }}
              minimumValue={12}
              maximumValue={24}
              step={1}
              value={fontSize}
              onValueChange={setFontSize}
            />
          )}
        /> */}
        <Divider style={{ marginVertical: 10 }} />
        <Text style={styles.header}>Notes Behavior</Text>
        <List.Item
          title="Auto-Save Notes"
          right={() => <Switch value={autoSave} onValueChange={() => setAutoSave(!autoSave)} />}
        />
        <Divider style={{ marginVertical: 10 }} />
        <Text style={styles.header}>Security</Text>
        <List.Item title="Enable PIN" right={() => <Switch value={false} />} />
        <List.Item title="Use Biometrics" right={() => <Switch value={true} />} />
        <View style={{ height: 50 }} /> {/* Spacer */}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...text.title,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8, // space between buttons
  },
});
