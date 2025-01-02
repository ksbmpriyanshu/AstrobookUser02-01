import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pooja from './Pooja';
import Spell from './Spell';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as AstromallActions from '../../redux/actions/astromallActions'
import AstromallHistroy from './AstromallHistroy';
import PoojaList from '../pooja/PoojaList';

const Tab = createMaterialTopTabNavigator();

const AstromallCategory = ({ route ,navigation, dispatch, isLoading }) => {
    const {categoryId} = route?.params
    console.log("::::>>>",)
    useEffect(() => {
        dispatch(AstromallActions.getAstromallData())
    }, [])

    return (
        <PoojaList categoryId ={categoryId}/>
        // <View style={{ flex: 1 }}>
        //     <MyHeader title={'Astro Puja'} navigation={navigation} />
        //     <Tab.Navigator>
        //         <Tab.Screen name='pooja' component={Pooja} />
        //         <Tab.Screen name='spell' component={Spell} />
        //         <Tab.Screen name='astromallHistroy' component={AstromallHistroy} options={{tabBarLabel: 'History'}} />
        //     </Tab.Navigator>
        // </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstromallCategory)