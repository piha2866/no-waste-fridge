import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Content } from './content';

export function ContentGrid(props: any): React.JSX.Element {
    return (
      <FlatList
        data={props.items}
        keyExtractor={(item, index) => String(index)}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
            <Content name={item} />
        )}
      />
    );
  }

const styles = StyleSheet.create({
    gridContainer: {
        padding: 10,
    },
});