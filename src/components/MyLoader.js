import { View, Text, Modal, ActivityIndicator, Animated, Easing } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../config/Constants1';

const MyLoader = props => {

  const fadeAnim = new Animated.Value(0); // Initial value for opacity

  useEffect(() => {
    const animate = () => {
      Animated.timing(
        fadeAnim, // The animated value to drive
        {
          toValue: 1, // Target value
          duration: 1000, // Animation duration in milliseconds
          easing: Easing.ease, // Easing function (optional)
          useNativeDriver: true, // Use the native driver for performance
        }
      ).start(); // Start the animation
    };

    animate();

    // You can also add more animations or any other logic here

    return () => {
      // Clean up any resources (if needed)
    };
  }, [fadeAnim]);


  return (
    <Modal visible={props.isVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background_theme2 + '10',
        }}>
          <View style={{backgroundColor:'white',borderRadius:1000,padding:10}}>
          <ActivityIndicator size="large" color={'black'} />
          </View>
        
      </View>
    </Modal>
  );
};

export default MyLoader;
