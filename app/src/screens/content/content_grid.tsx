import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { Content } from './content';

export default function ContentGrid(props: any): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ ...styles.contentWrapper, paddingBottom: height * 0.2 }}
    >
      {props.items.map((item: string, index: number) => (
        <Content name={item} key={index} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
  },

  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
});
