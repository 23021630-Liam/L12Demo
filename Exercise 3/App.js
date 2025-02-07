import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function App() {
    const [shakeDetected, setShakeDetected] = useState(false);
    const subscription = useRef(null);

    useEffect(() => {
        subscription.current = Accelerometer.addListener(({ x, y, z }) => {
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            if (acceleration > 1.8) {
                handleShake();
            }
        });

        Accelerometer.setUpdateInterval(100);

        return () => {
            if (subscription.current) {
                subscription.current.remove();
            }
        };
    }, []);

    const handleShake = async () => {
        if (!shakeDetected) {
            setShakeDetected(true);
            await playSound();
            setTimeout(() => {
                setShakeDetected(false);
            }, 500);
        }
    };

    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/shake.wav')
            );
            await sound.playAsync();
            sound.unloadAsync();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    return (
        <View style={styles.container}>
            {shakeDetected ? (
                <Text style={styles.shakeText}>SHAKE</Text>
            ) : (
                <Text style={styles.instructionText}>Shake your phone!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shakeText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'red',
    },
    instructionText: {
        fontSize: 20,
        color: 'white',
    },
});
