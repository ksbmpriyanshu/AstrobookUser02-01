import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Text, View, Dimensions, FlatList } from "react-native";
import MyLoader from "../../components/MyLoader";
import { api_url, colors, get_religion } from "../../config/Constants1";
import RenderHtml from 'react-native-render-html';
import { StyleSheet } from "react-native";
import * as BlogActions from '../../redux/actions/BlogActions'
import { connect } from "react-redux";
import MyHeader from "../../components/MyHeader";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get('screen');

const Religion = ({ dispatch, religionAndSpirtualityData, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {t} = useTranslation()

    useEffect(() => {
        dispatch(BlogActions.getReligionAndSpirtuality())
    }, [dispatch]);


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 5 }} key={index}>
                <Text allowFontScaling={false} style={style.text}>{item.title}</Text>
                <RenderHtml
                    contentWidth={320}
                    source={{
                        html: `<div style="color: black; max-width: 320px;">${item.description}</div>`,
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <MyHeader title={ t('religion1')} navigation={navigation} />
            <MyLoader isVisible={isLoading} />
            {religionAndSpirtualityData && (
                <FlatList
                    data={religionAndSpirtualityData}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </View>
    )


}

const mapStateToProps = state => ({
    religionAndSpirtualityData: state.blogs.religionAndSpirtualityData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Religion);

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: colors.background_theme2,
        padding: 10,
        borderRadius: 10
    },

});