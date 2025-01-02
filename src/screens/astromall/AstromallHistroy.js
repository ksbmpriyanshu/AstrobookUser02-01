import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../config/Screen'
import { Sizes, Fonts, Colors } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import { img_url } from '../../config/constants'
import LinearGradient from 'react-native-linear-gradient'
import { getFontSize } from '../../config/Constants1'
import moment from 'moment'
import { showNumber } from '../../utils/services'

const AstromallHistroy = ({ dispatch, navigation, astromallHistroyData }) => {
    console.log('chii', astromallHistroyData);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <FlatList ListHeaderComponent={<>
                    {astromallHistroyData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                />
            </View>
        </View>
    )

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('bookedPoojaDetails', { ...item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.poojaId?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', justifyContent: 'flex-end', padding: Sizes.fixPadding }}
                            colors={['rgba(0, 0, 0, 0.18)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                        >
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.poojaName}</Text>
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{moment(item?.date).format('DD MMM YYYY')} {moment(item?.time).format('hh:mm A')}</Text>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.type}</Text>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{showNumber(item?.price)}</Text>
                            </View>

                            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: Colors.primaryDark, paddingVertical: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixPadding, borderBottomLeftRadius: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.white12RobotoRegular, textTransform: 'capitalize' }}>{item?.status}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (

            <>
            
            {/* <FlatList data={astromallHistroyData} renderItem={renderItem} initialNumToRender={10} /> */}
            </>
        )
    }
}

const mapStateToProps = state => ({
    astromallHistroyData: state.astromall.astromallHistroyData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstromallHistroy)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.5,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        elevation: 5,
        alignSelf: 'center',
    }
})