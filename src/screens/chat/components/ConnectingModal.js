import React from 'react';
import { View, Text, Modal, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../config/Constants1';
import { SCREEN_WIDTH,SCREEN_HEIGHT } from '../../../config/Screen';
import { mainlogo } from '../../../assets/images/Images';
import { Fonts, Sizes } from '../../../assets/style';


const ConnectingModal = ({ visible, onClose,astroData }) => {
  console.log(astroData,'asrr')
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>AstroBook</Text>
          <Image source={mainlogo}
        style={{ width: SCREEN_WIDTH*0.5, height: SCREEN_WIDTH*0.5,resizeMode:"contain"}} />
        <Text style={styles.modalText}>{astroData != 'online' ? 'Astrologer is Busy' : 'Waiting for Astrologer to Connect'}</Text>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '70%',
    backgroundColor: colors.background_theme2,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText:{
    textAlign: 'center',
    fontSize:25,
    color:'white',
    ...Fonts.primaryHelvetica,
  },
});

export default ConnectingModal;