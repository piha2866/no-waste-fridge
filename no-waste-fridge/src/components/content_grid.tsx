import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Content } from './content';
import styles from 

export default function ContentGrid(props: any): React.JSX.Element{
    const { width, height } = useWindowDimensions();
    return (
      <View style={styles.gridContainer}>
        {props.items.map((item: string) => (
          <Content name={item}/>
        ))}
      </View>
    );
  }

const styles = StyleSheet.create({
    gridContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
    },
});