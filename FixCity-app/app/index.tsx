import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HelloWorld = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World! Voilà c'est tout!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>INSCRIPTION</Text>
      </TouchableOpacity>
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
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#127CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelloWorld;
