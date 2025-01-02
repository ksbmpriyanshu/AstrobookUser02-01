import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Banner from './components/Banner'
import { showNumber } from '../../utils/services'
import * as AstromallActions from '../../redux/actions/astromallActions'

const PoojaDetails = ({ navigation, route, dispatch }) => {
    const poojaData = route?.params
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={'Details'} navigation={navigation}/>
                <FlatList
                    ListHeaderComponent={<>
                        {poojaData && <Banner data={poojaData?.poojaId?.bannerImages} />}
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(AstromallActions.orederAstrologerPooja({data: poojaData?._id, amount: poojaData?.price}))} style={{ backgroundColor: Colors.primaryDark, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Book Now</Text>
            </TouchableOpacity>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.poojaId?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaId?.poojaName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium }}>{showNumber(poojaData?.price)}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.poojaId?.type}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails)