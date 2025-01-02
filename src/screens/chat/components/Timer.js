import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CountDown from './CountDown';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { connect } from 'react-redux';

const Timer = ({requestedData}) => {
  return ( 
    <View style={{backgroundColor:"#E0C987",display:"flex",flexDirection:"row",alignItems:"row",justifyContent:"space-around",}}>
      <Text style={{...Fonts.primaryHelvetica,color:"#000",fontSize:11,}}>
          Rate : ₹ {requestedData?.chatPrice}/min
        </Text>
        <Text style={{...Fonts.primaryHelvetica,color:"#000",fontSize:11,}}>
            <CountDown />
          </Text>
      
      
    </View>
  );
};


export default Timer;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    elevation: 8,
  },
});
