import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, Dimensions, FlatList } from "react-native";
import MyLoader from "../../components/MyLoader";
import { api_url, colors, get_magazine } from "../../config/Constants1";
import RenderHtml from 'react-native-render-html';
import * as BlogActions from '../../redux/actions/BlogActions'
import { connect } from "react-redux";
import MyHeader from "../../components/MyHeader";

const { width, height } = Dimensions.get('screen');

const Magazine = ({ magazineData, disptach, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        disptach(BlogActions.getMagazineData())
    }, [disptach]);



    const renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 5 }} key={index}>
                <Text allowFontScaling={false} style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: colors.background_theme2,
                    padding: 10,
                    borderRadius: 10
                }}>{item.title}</Text>
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
            <MyHeader title={'Magazine'} />
            <MyLoader isVisible={isLoading} />
            {magazineData && (
                <FlatList
                    data={magazineData}
                    renderItem={renderItem}
                    initialNumToRender={5}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </View>
    )


}

const mapStateToProps = (state) => ({
    magazineData: state.blogs.magazineData
})

const mapDispatchToProps = (disptach) => ({ disptach })

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);