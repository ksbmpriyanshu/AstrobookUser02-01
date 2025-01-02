import { StyleSheet, Text, View, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style'; AntDesign
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AstroBookHeader from '../components/AstroBookHeader';
import * as HomeActions from '../redux/actions/HomeActions';
import React, { useEffect } from 'react'
import { colors } from '../config/Constants1';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { base_url,img_url } from '../config/constants';

const AstrologyBlog = ({ dispatch, myblogdata }) => {
    console.log("myblogdata", myblogdata)
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(HomeActions.getBlogList())
    }, [dispatch])
    const renderItem = ({ item }) => {
        return (


            <TouchableOpacity
                onPress={() => navigation.navigate('BlogDescription', { blogData: item })}
                style={{ borderWidth: 1, width: SCREEN_WIDTH * 0.95, borderRadius: 10, alignItems: "center", borderColor: '#DFDFDF', elevation1: 10, marginVertical: SCREEN_HEIGHT * 0.01, overflow: "hidden" }}>

                <View style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.2, alignItems: "center", justifyContent: "center" }}>
                    <ImageBackground
                        style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                       source={{ uri: img_url +  item?.image}}>
                        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.005, alignItems: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.025 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "white", width: SCREEN_WIDTH * 0.16, justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.02, borderRadius: 10, backgroundColor: colors.white_color }}>
                                <Entypo name='eye' color={colors.black_color9} size={15} />
                                <Text style={{ ...Fonts.black14InterMedium, fontSize: 8 }}>{item?.viewsCount}</Text>
                            </View>
                        </View>
                    </ImageBackground>

                </View>

                <View style={{ paddingTop: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.95, paddingHorizontal: SCREEN_WIDTH * 0.02, justifyContent: "center" }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 13, color: colors.black_color9, }}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: "row", width: SCREEN_WIDTH * 0.95, justifyContent: "space-between", alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.005 }}>
                    <Text style={{ ...Fonts.primaryHelvetica, fontSize: 12, color: colors.black_color6 }}>{item?.created_by}</Text>
                    <Text style={{ ...Fonts.primaryHelvetica, fontSize: 12, color: colors.black_color6 }}> {new Date(item?.createdAt).toLocaleDateString()}</Text>
                </View>

            </TouchableOpacity>



        )
    }
    return (

        <View style={{ flex: 1, }}>
            <AstroBookHeader title={'AstroBlog'} showSearch={false} showShare={false} />

            <View style={{ backgroundColor: colors.white_color, paddingHorizontal: SCREEN_WIDTH * 0.025, marginTop: SCREEN_HEIGHT * 0.012, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <FlatList

                    data={myblogdata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  style={{marginBottom:40}}
                />
                
            </View>

            <View style={{paddingVertical:50}}></View>


        </View>
    )
}

const mapStateToProps = state => ({
    myblogdata: state.home.myblogdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologyBlog);
const styles = StyleSheet.create({})