import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyLoader from '../components/MyLoader';
import { useState } from 'react';
import { connect } from 'react-redux';
import { colors } from '../config/Constants1';
import MyHeader from '../components/MyHeader';
import TodayPanchange from '../screens/kundli/Panchang/TodayPanchange';
import YesterdayPachange from '../screens/kundli/Panchang/YesterdayPachange';
import TommorowPanchang from '../screens/kundli/Panchang/TommorowPanchang';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const Panchange = props => {
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            header: () => (
                <MyHeader
                    title="Panchang"
                    navigation={props.navigation}
                    statusBar={{
                        backgroundColor: colors.background_theme2,
                        barStyle: 'light-content',
                    }}
                />
            ),
        });
    }, []);

    

    return (
        <View style={{ flex: 1 }}>
            <MyLoader isVisible={isLoading} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.pink,
                }}
            >
                <Tab.Navigator                    
                    initialRouteName='Today'
                >
                    <Tab.Screen name="Yesterday" component={YesterdayPachange} />
                    <Tab.Screen name="Today" component={TodayPanchange} />
                    <Tab.Screen name="Tomorrow" component={TommorowPanchang} />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Panchange);
