import { View, Text, FlatList, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { TouchableOpacity } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { showNumber } from '../../utils/services'
import { colors, getFontSize } from '../../config/Constants1'
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { connect } from 'react-redux'
import { base_url, img_url } from '../../config/constants'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
const Products = ({ navigation, route, productsData, dispatch }) => {
    console.log(productsData,"anuj")
    const { _id, categoryName } = route?.params

    useEffect(() => {
        dispatch(EcommerceActions.getProducts(_id))
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark, }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle={'light-content'} />
            <MyHeader title={categoryName ?? 'Astro Mall'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ alignItems: "center", borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.02, }}>
                    <Image
                        style={{ height: SCREEN_HEIGHT * 0.19, width: SCREEN_WIDTH * 0.95, borderRadius: 10 }}
                        source={require('../../assets/images/mallbanner.png')} />
                </TouchableOpacity>
                <FlatList ListHeaderComponent={<>
                    {productsData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                />
            </View>
        </View>
    )

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('productDetails', { productData: item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', }}
                            colors={['rgba(0, 0, 0, 0.18)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                        >
                            <View style={{ paddingTop: SCREEN_HEIGHT * 0.012, }}>
                                <ImageBackground
                                    style={{ height: SCREEN_HEIGHT * 0.022, justifyContent: "center", paddingHorizontal: SCREEN_WIDTH * 0.015 }}
                                    source={require('../../assets/images/vectorllll.png')}>
                                    <Text style={{ ...Fonts.primaryHelvetica, fontSize: 9, color: colors.white_color }}>Mahadev special Rudhraksh</Text>
                                </ImageBackground>

                            </View>
                           
                            <View style={{  height:SCREEN_HEIGHT*0.18,justifyContent:"flex-end"}}>
                                <View style={{  paddingHorizontal: SCREEN_WIDTH * 0.012 }}>
                                    <Text style={{ ...Fonts.primaryHelvetica, color: colors.white_color, fontSize: responsiveFontSize(1.7) }}>{item?.productName}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",  paddingHorizontal: SCREEN_WIDTH * 0.015 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02,}}>
                                        <Text style={{ ...Fonts.primaryHelvetica, color: colors.white_color, fontSize: responsiveFontSize(1.7) }}>₹{item?.price}</Text>
                                        <Text style={{ ...Fonts.primaryHelvetica, color: colors.white_color, fontSize: responsiveFontSize(1.7), textDecorationLine: "line-through", textDecorationColor: "red" }}>₹{item?.mrp}</Text>
                                    </View>
                                    <View style={{ borderWidth: 1, width: SCREEN_WIDTH * 0.15, height: SCREEN_HEIGHT * 0.03, alignItems: "center", justifyContent: "center", borderRadius: 10, borderColor: colors.white_color }}>
                                        <Text style={{ ...Fonts.primaryHelvetica, color: colors.white_color, fontSize: responsiveFontSize(1.3) }}>Book</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.6) }}>{item?.productName}</Text>
                            <Text style={{ ...Fonts.white11InterMedium }}>{showNumber(item?.price)} <Text style={{ textDecorationLine: 'line-through', color: '#f28d77' }}>{showNumber(item?.mrp)}</Text></Text> */}
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={productsData} numColumns={2} renderItem={renderItem} />
        )
    }
}

const mapStateToProps = state => ({
    productsData: state.ecommerce.productsData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Products)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.45,
        height: SCREEN_WIDTH * 0.45,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',

        marginLeft: SCREEN_WIDTH * 0.03,
        marginVertical: SCREEN_HEIGHT * 0.01,


        elevation: 5
    }
})