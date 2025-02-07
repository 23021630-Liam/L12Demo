import React,{useState, useEffect} from 'react';
import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';

import {Audio} from 'expo-av'

const styles = StyleSheet.create({
  container: {

  },
});


export default function App() {

    const [mySound, setMySound] = useState();

    async function playSOund() {
        const soundfile = require('.short1.wav');
        const {sound} = await Audio.createAsync(soundfile);
        setMySound(sound);
        await soundfile.playAsync();
    }

    useEffect(() => {
        return mySound
        ? () => {
            console.log('unloading sound')
                mySound.unloadAsync()
            }
            :undefined;
    }, [mySound]);

  return (
    <View>
      <StatusBar />
      <Button title="Play Sound" onPress={
      ()=>{

      }}
      />
    </View>
  );
}


