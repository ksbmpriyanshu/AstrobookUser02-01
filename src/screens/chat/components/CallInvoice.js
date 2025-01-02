import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-native-paper'
import * as ChatActions from '../../../redux/actions/ChatActions'
import { Colors, Fonts, Sizes } from '../../../assets/style'
import moment from 'moment'
import { secondsToHMS, showNumber } from '../../../utils/services'
import * as AstrolgoerActions from '../../../redux/actions/AstrologerActions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../config/Constants1'

const CallInvoice = ({ dispatch, callInvoiceVisble, callInvoiceData }) => {
    console.log("call-inv",callInvoiceVisble)
    console.log("call-inv2",callInvoiceData)
    const data = JSON.parse(callInvoiceData);

    console.log()
    const onDismise = () => {
        const payload = {
            data: data?.invoice?.astrologer,
            ratingVisible: true
        }
        dispatch(AstrolgoerActions.setAstroRatingVisible(payload))
        dispatch(ChatActions.setCallInvoiceVisible(false))
        dispatch(ChatActions.setCallInvoiceData(null))
    }
    return (
        <Modal visible={callInvoiceVisble} onDismiss={() => onDismise()}>
            <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onDismise()} style={{ position: 'absolute', right: Sizes.fixPadding, top: Sizes.fixPadding, zIndex: 99 }}>
                    <Ionicons name='close' color={Colors.white} size={28} />
                </TouchableOpacity>
                <Text style={{ ...Fonts.white18RobotBold, fontSize: 22, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Call Invoice</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Invoice ID: </Text>
                    <Text style={[styles.text, { textTransform: 'uppercase' }]}>{data?.invoice?.customerInvoice}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Date: </Text>
                    <Text style={styles.text}>{moment(data?.invoice?.createdAt).format('DD MMM YYYY')}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>:Order Time </Text>
                    <Text style={styles.text}>{moment(data?.invoice?.createdAt).format('hh:mm A')}</Text>
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Duration</Text>
                    <Text style={styles.text}>{secondsToHMS(data?.invoice?.durationInSeconds ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Call Price</Text>
                    <Text style={styles.text}>{showNumber(data?.invoice?.callPrice ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Total Charge</Text>
                    <Text style={styles.text}>{showNumber(data?.invoice?.totalCallPrice)}</Text>
                </View>
            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({
    callInvoiceVisble: state.chat.callInvoiceVisble,
    callInvoiceData: state.chat.callInvoiceData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CallInvoice)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background_theme2,
        width: '90%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 1.5,
        justifyContent: 'center',
        paddingTop: Sizes.fixPadding * 2.5
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding
    },
    text: {
        ...Fonts.white18RobotMedium
    }
})