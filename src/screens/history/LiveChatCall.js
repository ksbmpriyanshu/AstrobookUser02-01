import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LiveHistory from './LiveHistory';
import CallHistory from './CallHistory';
import ChatHistory from './ChatHistory';
import MyHeader from '../../components/MyHeader';
import {connect} from 'react-redux';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import VideoHistory from './VideoHistory';
import {Fonts} from '../../assets/style';

const Tab = createMaterialTopTabNavigator();

const LiveChatCall = ({navigation, dispatch}) => {
  useEffect(() => {
    dispatch(HistoryActions.getCallHistory());
    dispatch(HistoryActions.getChatHistory());
    dispatch(HistoryActions.getLiveVedioCallHistory());
    dispatch(HistoryActions.getVideoCallHistory());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <MyHeader title={'Astrologer Order History'} navigation={navigation} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {
            ...Fonts.primaryHelvetica,
            fontSize: 12,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#E0C987',
            height: 2, 
          },
          tabBarStyle: {
            elevation: 0, 
            shadowOpacity: 0, 
            shadowOffset: {height: 0, width: 0}, 
            shadowRadius: 0,
            height: 50, 
            backgroundColor: '#FFFFFF', 
          },
          tabBarItemStyle: {
            marginHorizontal: 15, 
            paddingHorizontal: 0,
            width: 'auto', 
          },
        })}
      >
        <Tab.Screen
          name="chatHistory"
          component={ChatHistory}
          options={{tabBarLabel: 'Chat'}}
        />
        <Tab.Screen
          name="callHistory"
          component={CallHistory}
          options={{tabBarLabel: 'Call'}}
        />
        <Tab.Screen
          name="liveHistory"
          component={LiveHistory}
          options={{tabBarLabel: 'Live'}}
        />
        <Tab.Screen
          name="VideoHistory"
          component={VideoHistory}
          options={{tabBarLabel: 'Video'}}
        />
      </Tab.Navigator>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(LiveChatCall);
