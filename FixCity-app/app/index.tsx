// import React, { useState, useEffect } from 'react';

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHistory } from 'react-router-native';

const HelloWorld = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/map/page.tsx');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World! Voilà c'est tout!</Text>
      <Button title="Go to Other Page" onPress={handleButtonClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Couleur de fond optionnelle
  },
  text: {
    fontSize: 20,
    color: '#000000', // Couleur du texte
  },
});

export default HelloWorld;
