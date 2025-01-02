import {View, Text, StatusBar, Platform} from 'react-native';
import React, { useEffect } from 'react';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { colors } from '../config/Constants1';

const MyStatusBar = ({backgroundColor, barStyle}) => {
  const insets = useSafeAreaInsets();
  useEffect(()=>{},[barStyle])
  return (
    <View
      style={{
        height: insets.top,
        flex: 0,
        backgroundColor: colors.background_theme2,
      }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle} 
      />
    </View>
  );
};
export default MyStatusBar;
