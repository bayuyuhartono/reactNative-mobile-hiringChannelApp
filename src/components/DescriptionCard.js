import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReadMore from 'react-native-read-more-text';

const handleTextReady = () => {
  console.log('ready!');
};

const DescriptionCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ReadMore numberOfLines={3} onReady={handleTextReady}>
          <Text style={styles.cardText}>{props.description}</Text>
        </ReadMore>
      </View>
    </View>
  );
};

export default DescriptionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    marginTop: 15,
  },
  cardText: {
    fontSize: 15,
  },
});
