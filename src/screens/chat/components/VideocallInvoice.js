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

const VideocallInvoice = ({ dispatch, videocallInvoiceVisble, videoinvoiceData }) => {
    console.log("check video",videocallInvoiceVisble)
    console.log("call-inv2",videoinvoiceData)
    const data = videoinvoiceData ;

    console.log()
    const onDismise = () => {
        const payload = {
            data: data,
            ratingVisible: true
        }
        dispatch(AstrolgoerActions.setAstroRatingVisible(payload))
        dispatch(ChatActions.setVideoCallInvoiceVisible(false))
        dispatch(ChatActions.setvideoInvoiceData(null))
    }
    const videoprice = parseInt(data?.chatPrice) + parseInt(data?.commissionPrice);
    console.log(videoprice,'videoprice')
    return (
        <Modal visible={videocallInvoiceVisble} onDismiss={() => onDismise()}>
            <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onDismise()} style={{ position: 'absolute', right: Sizes.fixPadding, top: Sizes.fixPadding, zIndex: 99 }}>
                    <Ionicons name='close' color={Colors.white} size={28} />
                </TouchableOpacity>
                <Text style={{ ...Fonts.white18RobotBold, fontSize: 22, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Video Call Invoice</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Invoice ID: </Text>
                    <Text style={[styles.text, { textTransform: 'uppercase' }]}>{data?.invoice_id}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Date: </Text>
                    <Text style={styles.text}>{data?.startDate}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Time: </Text>
                    <Text style={styles.text}>{data?.startTime}</Text>
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Duration</Text>
                    <Text style={styles.text}>{secondsToHMS(data?.duration ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>VideoCall Price</Text>
                    <Text style={styles.text}>{showNumber(videoprice ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Total Charge</Text>
                    <Text style={styles.text}>{showNumber(data?.totalPrice)}</Text>
                </View>
            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({
    videocallInvoiceVisble: state.chat.videocallInvoiceVisble,
    videoinvoiceData: state.chat.videoinvoiceData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(VideocallInvoice)

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