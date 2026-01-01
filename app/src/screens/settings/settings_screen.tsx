/* eslint-disable react-native/no-raw-text */
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, DefaultTheme, Divider, List, Switch, Text } from 'react-native-paper';

import { IconButton } from '../../components/buttons';
import { useSettings } from '../../context/settings';
import colors from '../../styles/colors';
import container from '../../styles/container';
import text from '../../styles/text';

const SettingsScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { settings, updateSetting } = useSettings();

  const [darkMode, setDarkMode] = useState(false);

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
  // style theme for paper components
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.text, // default purple
      onPrimary: colors.background,
      outline: colors.text,
      onSurface: colors.text,
    },
  };
  return (
    <View style={dynamicStyles.screenPadding}>
      <View style={dynamicStyles.topContainer}>
        <IconButton iconName="home" onPress={handleHome} />
        <View style={styles.titleBar}>
          <Text theme={theme} style={styles.sectionTitle}>
            Settings
          </Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.header} theme={theme}>
          Appearance
        </Text>
        <List.Item
          theme={theme}
          title="Content View"
          right={() => (
            <View style={styles.toggleRow}>
              <Button
                theme={theme}
                mode={settings.contentView === 'List' ? 'contained' : 'outlined'}
                compact
                onPress={() => updateSetting('contentView', 'List')}
              >
                List
              </Button>
              <Button
                theme={theme}
                mode={settings.contentView === 'Grid' ? 'contained' : 'outlined'}
                compact
                onPress={() => updateSetting('contentView', 'Grid')}
              >
                Grid
              </Button>
            </View>
          )}
        />
        <List.Item
          theme={theme}
          title="Dark Mode"
          right={() => <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />}
        />
        <Divider style={{ marginVertical: 10 }} />
        <Text style={styles.header} theme={theme}>
          Notifications
        </Text>
        <List.Item
          theme={theme}
          title="Deletion Confirmation"
          right={() => (
            <Switch
              theme={theme}
              value={settings.deletionConfirmation}
              onValueChange={() =>
                updateSetting('deletionConfirmation', !settings.deletionConfirmation)
              }
            />
          )}
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
        {/* <Divider style={{ marginVertical: 10 }} />
        <Text style={styles.header}>Notes Behavior</Text>
        <List.Item
          title="Auto-Save Notes"
          right={() => <Switch value={autoSave} onValueChange={() => setAutoSave(!autoSave)} />}
        />
        <Divider style={{ marginVertical: 10 }} />
        <Text style={styles.header}>Security</Text>
        <List.Item title="Enable PIN" right={() => <Switch value={false} />} />
        <List.Item title="Use Biometrics" right={() => <Switch value={true} />} />
        <View style={{ height: 50 }} /> Spacer */}
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
