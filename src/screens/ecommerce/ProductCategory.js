import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { TouchableOpacity } from 'react-native'
import { SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { showNumber } from '../../utils/services'
import { colors, fonts, getFontSize } from '../../config/Constants1'
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { connect } from 'react-redux'
import { img_url } from '../../config/constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../NavigationService'

const ProductCategory = ({ navigation, productCategoryData, dispatch,cartData }) => {
    console.log(cartData?.cart?.length,'ccdatad')

    useEffect(() => {
        dispatch(EcommerceActions.getProductCategory())
        dispatch(EcommerceActions.getCartData());
    }, [dispatch])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark ,borderWidth:1 }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            {/* <MyHeader title={'Astro Mall'} navigation={navigation} /> */}
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{}}>
                
                </View>
                <FlatList ListHeaderComponent={<>
                    {productCategoryData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                />
            </View>
        </View>
    )

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('products', { ...item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', justifyContent: 'flex-end', padding: Sizes.fixPadding }}
                            colors={['rgba(0, 0, 0, 0.18)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                        >
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(2), textAlign: 'center' }}>{item?.categoryName}</Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={productCategoryData} numColumns={2} renderItem={renderItem} />
        )
    }
    function header() {
        return(
            <View style={{backgroundColor:Colors.primaryLight,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:Sizes.fixPadding * 0.7}}>
                   <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 0,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back"
            color={colors.white_color}
            size={getFontSize(2.5)}
          />
        </TouchableOpacity>
                <Text style={{   fontSize: getFontSize(1.7),
              color: colors.white_color,
              fontFamily: fonts.medium,}}>Astro Mall</Text>
               <TouchableOpacity
          onPress={() => {navigation.navigate('cart')}}
          style={{
            flex: 0,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="cart-outline"
            color={colors.white_color}
            size={27}
          />
          {/* <View style={{height:SCREEN_WIDTH * 0.04,width:SCREEN_WIDTH*0.04,borderWidth:1,borderRadius:100,justifyContent:'center',alignItems:'center',position:'absolute',right: Sizes.fixPadding,bottom:Sizes.fixPadding * 1.2,backgroundColor:Colors.primaryLight,borderColor:Colors.white}}>
            <Text style={{color:Colors.white,fontSize:8}}>{cartData?.cart?.length}</Text>
          </View> */}
        </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    productCategoryData: state.ecommerce.productCategoryData,
    cartData: state.ecommerce.cartData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.6,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        marginLeft: SCREEN_WIDTH * 0.065,
        elevation: 5
    }
})