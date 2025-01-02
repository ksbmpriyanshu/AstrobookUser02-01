import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import { showNumber } from '../../utils/services'
import * as AstromallActions from '../../redux/actions/astromallActions'
import { colors } from '../../config/Constants1'
import { img_url } from '../../config/constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'

const PoojaDetails = ({ navigation, route, dispatch }) => {
    const poojaData = route?.params
    console.log(poojaData)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={'Puja Details'} navigation={navigation}/>
                <FlatList
                    ListHeaderComponent={<>
                      {Poojaimage()}
                        {productInfo()}
                        {descriptionInfo()}
                    </>}
                />
                {submitInfo()}
            </View>
        </View>
    )

    function submitInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8}
            //  onPress={() => dispatch(AstromallActions.orederAstrologerPooja({data: poojaData?._id, amount: poojaData?.price}))}
              style={{ backgroundColor: colors.background_theme2, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Book Now</Text>
            </TouchableOpacity>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaId?.poojaName}</Text>
                {/* <Text style={{ ...Fonts.black16RobotoMedium }}>{showNumber(poojaData?.price)}</Text> */}
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.type}</Text>
            </View>
        )
    }
    function Poojaimage() {
        return(
            <View style={{}}>
               <Image source={{uri: img_url + poojaData?.image}} style={{height: SCREEN_HEIGHT * 0.35,width:SCREEN_WIDTH}}/> 
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails)