import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Content } from './src/components/content';


// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

export default function App(): React.JSX.Element {
  return (
    <View style={styles.mainContainer
    }> 
      <View style={styles.contentGridContainer}>
        <Text style={styles.sectionTitle}>Your fridges content</Text>
        <View style={styles.contentWrapper}>
          <Content name={"Test"} />
          <Content name={"Test1"} />
          <Content name={"Test2"} />
          <Content name={"Test"} />
          <Content name={"Test1"} />
          <Content name={"Test2"} />
          <Content name={"Test"} />
          <Content name={"Test1"} />
          <Content name={"Test2"} />
          <Content name={"Test"} />
          <Content name={"Test1"} />
          <Content name={"Test2"} />
          <Content name={"Test"} />
          <Content name={"Test1"} />
          <Content name={"Test2"} />
        </View>
      </View>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit testing <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentGridContainer: {
    padding: '5%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#1E3A32",
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mainContainer: {
    backgroundColor: "#E9F5EC",
    flex: 1,
    paddingTop: 50,
  },
  contentWrapper: {
    marginTop: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});
