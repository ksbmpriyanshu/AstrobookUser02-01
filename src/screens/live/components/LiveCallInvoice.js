import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-native-paper'
import * as LiveActions from '../../../redux/actions/LiveActions'
import { Colors, Fonts, Sizes } from '../../../assets/style'
import moment from 'moment'
import { secondsToHMS, showNumber } from '../../../utils/services'
import * as AstrolgoerActions from '../../../redux/actions/AstrologerActions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../config/Constants1'


const LiveCallInvoice = ({ dispatch, liveInvoiceData, liveInvoiceVisible }) => {
    console.log(liveInvoiceData,'Live Invoice')
    const data = JSON.parse(liveInvoiceData)
    const onDismise = () => {
        const payload = {
            data: data?.astrologer,
            ratingVisible: true
        }
        dispatch(AstrolgoerActions.setAstroRatingVisible(payload))
        dispatch(LiveActions.setLiveInvoiceVisible({ data: null, visible: false }))
    }
    return (
        <Modal visible={liveInvoiceVisible} onDismiss={() => onDismise()}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onDismise()} style={{ position: 'absolute', right: Sizes.fixPadding, top: Sizes.fixPadding, zIndex: 99 }}>
                    <Ionicons name='close' color={Colors.white} size={28} />
                </TouchableOpacity>
                <Text style={{ ...Fonts.white18RobotBold, fontSize: 22, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Live Call Invoice</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Invoice ID: </Text>
                    <Text style={[styles.text, { textTransform: 'uppercase' }]}>{data?.customerInvoiceId}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Date: </Text>
                    <Text style={styles.text}>{moment(data?.invoice?.createdAt).format('DD MMM YYYY')}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Time: </Text>
                    <Text style={styles.text}>{moment(data?.invoice?.createdAt).format('hh:mm A')}</Text>
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Duration</Text>
                    <Text style={styles.text}>{secondsToHMS(data?.invoice?.durationInSeconds ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Video Call Price</Text>
                    <Text style={styles.text}>{showNumber(data?.vedioCallPrice ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Total Charge</Text>
                    <Text style={styles.text}>{showNumber(data?.invoice?.amount)}</Text>
                </View>
            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({
    liveInvoiceData: state.live.liveInvoiceData,
    liveInvoiceVisible: state.live.liveInvoiceVisible,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(LiveCallInvoice)

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.primaryLight,
        backgroundColor:colors.background_theme2,
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