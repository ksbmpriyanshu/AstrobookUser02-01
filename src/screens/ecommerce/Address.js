import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { Colors, Fonts } from '../../assets/style';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Address = ({ navigation, dispatch, addressData }) => {

    useEffect(() => {
        dispatch(EcommerceActions.getaddresscart());
    }, [dispatch]);

    console.log(addressData)

    const addNewAddress = () => {
        // Logic to add a new address (e.g., open a modal or navigate to a form screen)
        navigation.navigate('Addaddress')
    };

    const renderAddressItem = ({ item }) => (
        <View style={{paddingHorizontal:SCREEN_WIDTH*0.02}}>
        <TouchableOpacity
        style={{flexDirection:'row',justifyContent:"space-between",borderBottomWidth:1.5,paddingHorizontal:SCREEN_WIDTH*0.025,paddingVertical:SCREEN_HEIGHT*0.02,borderBottomColor:colors.black_color5}}
            onPress={() => {
                dispatch(EcommerceActions.setaddressCart(item));
                navigation.navigate('cart');
            }}>
            <View style={{gap:SCREEN_HEIGHT*0.002}}>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(2),color:colors.black_color6}}>{item.name}</Text>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(1.5),color:colors.black_color6}}>{item.house}{`,`} {item.area}, {'\n'}{item.city}, {item.state}, {item.pincode}</Text>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(1.5),color:colors.black_color6}}>+91 {item.phone}</Text>
            </View>

            <View style={{justifyContent:"space-between"}}>
                <View style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.15,  alignItems: "center", justifyContent: "center", borderRadius: 5, backgroundColor: "black" }}>
                    <Text style={{ ...Fonts.black12RobotoRegular, color: "white" }}>Edit</Text>
                </View>
                <View style={{alignSelf:"flex-end"}}>
                <BouncyCheckbox
                style={{left:SCREEN_WIDTH*0.02}}
                    size={20}
                    fillColor="gray"
                    unFillColor="#FFFFFF"

                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 ,borderColor:"gray" }}


                />
                </View>
            </View>
        </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'light-content'} />
            <MyHeader title={'Address'} navigation={navigation} />

            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.05, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <TouchableOpacity
                    onPress={addNewAddress}
                    style={{ height: SCREEN_HEIGHT * 0.08, alignItems: "center", justifyContent: "center", backgroundColor: colors.black_color2, borderRadius: 10, elevation: 0 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Add New Address</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={addressData?.data}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>No addresses found</Text>
                )}
            />
            {/* Button to add new address
            <TouchableOpacity style={styles.addButton} onPress={addNewAddress}>
                <Icon name="add" size={30} color="white" />
            </TouchableOpacity> */}
        </View>
    )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    addressData: state.ecommerce.addressData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    addressItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addressDetails: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#aaa',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        backgroundColor: Colors.primaryDark,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        top: SCREEN_HEIGHT * 0.9
    },
})