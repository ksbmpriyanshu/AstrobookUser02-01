import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { showNumber } from '../../utils/services'
import { SCREEN_WIDTH } from '../../config/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { connect } from 'react-redux'
import { img_url } from '../../config/constants'
import { colors } from '../../config/Constants1'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const Cart = ({ navigation, dispatch, cartData,addressSelect }) => {
    console.log(addressSelect,'data')

    useEffect(() => {
        dispatch(EcommerceActions.getCartData())
    }, [dispatch]);

    console.log('Cart data ::: ',cartData);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'dark-content'} />
            <MyHeader title={'Cart'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <FlatList ListHeaderComponent={<>
                    {cartData && cartListInfo()}
                    {addressSelect && addressdetails()}
                </>}
                    contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
                />
                {
                 addressSelect ?  submitInfo() : submitaddress()
                }
            </View>
        </View>
    )

    function addressdetails() {
        return (
            <View>
                <Text style={{color:'black',fontSize:16}}>Address:</Text>
                <Text style={{}}>{addressSelect?.house}, {addressSelect?.area}, {'\n'} {addressSelect?.city}, {addressSelect?.state} ,{addressSelect?.pincode}</Text>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(1.7),color:"gray"}}>Phone Number: {addressSelect?.phone}</Text>
            </View>
        )
    }

    function submitaddress() {
        return (
            <TouchableOpacity 
            onPress={() => navigation.navigate('Address')}
            style={{alignItems: 'center', backgroundColor: colors.astrobook1,paddingVertical: Sizes.fixPadding * 2}}>
                <Text style={{color:'black',fontSize:17,fontWeight:'bold'}}>Add Address</Text>
            </TouchableOpacity>
        )
    }

    function submitInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:colors.astrobook1, justifyContent: 'space-between', paddingVertical: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixPadding }}>
                <View>
                    <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.black }}>Total: {showNumber(cartData?.totalPrice)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(EcommerceActions.orderCart())} style={{ width: '40%', borderRadius: Sizes.fixPadding, backgroundColor: Colors.white, paddingVertical: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.black16RobotoMedium, textAlign: 'center' }}>Pay</Text>
                </TouchableOpacity>
            </View>

        )
    }

    function cartListInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: img_url + item?.productId?.image }} style={styles.image} />
                        </View>

                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.primaryLight18RighteousRegular }}>{item?.productId?.productName}</Text>
                            <Text style={{ ...Fonts.black14InterMedium, color: Colors.greenDark }}>{showNumber(item?.productId?.price)}  <Text style={{ textDecorationLine: 'line-through', color: Colors.red_a }}>{showNumber(item?.productId?.mrp)}</Text></Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.black16RobotoRegular, color: item?.status == 'IN_STOCK' ? '#007f5f' : '#ee6055' }}>{item?.status == 'IN_STOCK' ? 'In Stock' : "Out Of Stock"}</Text>
                        <View style={styles.boxContainer}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(EcommerceActions.updateCartQuantity({ cartItemId: item?._id, type: 'REMOVE' }))} style={[styles.box, { backgroundColor: '#e63946' }]}>
                                <Ionicons name='remove-outline' color={Colors.white} size={20} />
                            </TouchableOpacity>
                            <Text>{item?.quantity}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(EcommerceActions.updateCartQuantity({ cartItemId: item?._id, type: 'ADD' }))} style={styles.box}>
                                <Ionicons name='add-outline' color={Colors.white} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )
        }
        return (
            <View>
                <FlatList data={cartData?.cart} renderItem={renderItem} initialNumToRender={5} />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    cartData: state.ecommerce.cartData,
    addressSelect: state.ecommerce.addressSelect,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.white,
        marginBottom: Sizes.fixPadding * 1.5,
        borderRadius: Sizes.fixPadding,
        elevation: 8,
        shadowColor: Colors.grayB,
        padding: Sizes.fixPadding
    },
    childContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_WIDTH * 0.16,
        borderRadius: Sizes.fixPadding * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteDark,
        elevation: 5,
        shadowColor: Colors.grayB
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: Sizes.fixPadding * 1.8
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        margin: Sizes.fixPadding
    },
    box: {
        backgroundColor: '#2b9348',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    }
})