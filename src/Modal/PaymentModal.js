import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native';
import { colors, getFontSize } from '../config/Constants1';
import { SCREEN_WIDTH } from '../config/Screen';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as PoojaActions from '../redux/actions/PoojaActions'
const PaymentModal = ({isVisible,dispatch,BookPujaData}) => {
    console.log("1111",BookPujaData)
    console.log("qqq0000",BookPujaData)
    // const [BookPujaData, setBookPujaData] = useState({
    //     pujaId: "66fb903189a470d092b3cd3d",
    //     userId: "66e2ba1f42fd9f238df2e507",
    //     date: '2024-10-06T13:16:00.000Z',
    //     time: '2024-10-06T13:16:00.000Z',
    //     mode: "offline"
    // })
    // useEffect(() => {
    //     dispatch(PoojaActions.getBookPooja());
    // })
    function close(){
        console.log("first",PoojaActions.closeModal())
        dispatch(PoojaActions.closeModal())
    }

    function Booked(){
        dispatch(PoojaActions.getBookPooja({ BookPujaData}));
    }
    return (
        <View style={{}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={{ fontSize: getFontSize(2), color: colors.background_theme4 }}>Payment Gateway Testing</Text>
                            {/* <Text style={{color:"green",textAlign:"center"}}>Puja Booked.....</Text> */}
                        </View>
                        <TouchableOpacity
                        onPress={Booked}
                        style={{ backgroundColor: colors.green_color1, paddingVertical: SCREEN_WIDTH * 0.03, paddingHorizontal: SCREEN_WIDTH * 0.06, borderRadius: 10 }}>
                            <Text allowFontScaling={false} style={{ fontSize: getFontSize(2), color: "white" }}>Success</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>Alert.alert("AstroBook","Payment Failed")}
                        style={{ backgroundColor: colors.red_color1, paddingVertical: SCREEN_WIDTH * 0.03, paddingHorizontal: SCREEN_WIDTH * 0.12, borderRadius: 10 }}>
                            <Text allowFontScaling={false} style={{ fontSize: getFontSize(2), color: "white" }}>Fail</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={{marginTop:6}}
                            onPress={close}>
                            <Text style={{color:"black"}}>Hide Modal X</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    poojaData: state.pooja.poojaData,
    newPoojaData: state.pooja.newPoojaData,
    bookpujaHistoryData: state.pooja.newPoojaData,
    isVisible : state.pooja.isVisible,
    bookPoojaData : state.pooja.bookPoojaData
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
