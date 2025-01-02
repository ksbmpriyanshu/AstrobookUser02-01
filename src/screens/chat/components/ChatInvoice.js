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

const ChatInvoice = ({ dispatch, chatInvoiceVisble, chatInvoiceData }) => {
    const onDismise = () => {
        const payload = {
            data: chatInvoiceData?.astrologerId,
            ratingVisible: true
        }
        dispatch(AstrolgoerActions.setAstroRatingVisible(payload))
        dispatch(ChatActions.setChatInvoiceVisible(false))
        dispatch(ChatActions.setChatInvoiceData(null))
    }
    console.log(chatInvoiceData,'c-invoicedata')
    return (
        <Modal visible={chatInvoiceVisble} onDismiss={() => onDismise()}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onDismise()} style={{ position: 'absolute', right: Sizes.fixPadding, top: Sizes.fixPadding, zIndex: 99 }}>
                    <Ionicons name='close' color={Colors.white} size={28} />
                </TouchableOpacity>
                <Text style={{ ...Fonts.white18RobotBold, fontSize: 22, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Chat Invoice</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Invoice ID: </Text>
                    <Text style={[styles.text, { textTransform: 'uppercase' }]}>{chatInvoiceData?.transactionId}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Date: </Text>
                    <Text style={styles.text}>{moment(chatInvoiceData?.createdAt).format('DD MMM YYYY')}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Order Time: </Text>
                    <Text style={styles.text}>{moment(chatInvoiceData?.createdAt).format('hh:mm A')}</Text>
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Duration:</Text>
                    <Text style={styles.text}>{secondsToHMS(chatInvoiceData?.durationInSeconds ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Chat Price:</Text>
                    <Text style={styles.text}>{showNumber(chatInvoiceData?.chatPrice ?? 0)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>Total Charge:</Text>
                    <Text style={styles.text}>{showNumber(chatInvoiceData?.totalChatPrice)}</Text>
                </View>
            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({
    chatInvoiceVisble: state.chat.chatInvoiceVisble,
    chatInvoiceData: state.chat.chatInvoiceData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatInvoice)

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