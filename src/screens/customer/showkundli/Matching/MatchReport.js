import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts } from '../../../../config/Constants1';
import MyLoader from '../../../../components/MyLoader';
import { StyleSheet } from 'react-native';
import { getmanglikReport } from '../../../config/apiService';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState, useRef } from 'react';
import axios from 'axios';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('screen');

const MatchReport = props => {

    useEffect(() => {
        props.navigation.setOptions({
            tabBarLabel: 'Match Report',
        });
    }, []);

    const { t } = useTranslation();
    
    
    const [isLoading, setIsLoading] = useState(false);
 


    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyLoader isVisible={isLoading} />
            
        </View>
    );
};

export default MatchReport;

const styles = StyleSheet.create({
    itmeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    itemText: {
        flex: 0.5,
        fontSize: 14,
        color: colors.black_color8,
        fontFamily: fonts.medium,
    },
    containerBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background_theme3,
        borderRadius: 10,
        shadowColor: colors.black_color5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 15,
    },
    childContainerBox: {
        flex: 1,
        padding: 10,
    },
    heading: {
        fontSize: 16,
        color: colors.black_color,
        fontFamily: fonts.semi_bold,
        marginBottom: 15,
    },
    asht: {
        width: '40%'
    },
    description: {
        fontSize: 13,
        color: colors.black_color,
        fontFamily: fonts.medium,
    },
    circle: {
        flex: 0,
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 1000,
        borderWidth: 8,
        borderColor: colors.green_color2,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle1: {
        flex: 0,
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 1000,
        borderWidth: 8,
        borderColor: colors.grey_color,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontSize: 22,
        color: colors.green_color2,
        fontFamily: fonts.bold,
    },
});
