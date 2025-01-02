import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/HistoryActions'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import MyStatusBar from '../../components/MyStatusbar'
import moment from 'moment'
import { showNumber } from '../../utils/services'
import { colors } from '../../config/Constants1'


const WalletHistroy = ({ dispatch, navigation, walletHistory }) => {
    useEffect(() => {
        dispatch(HistoryActions.getWalletHistory())
    }, [])
    console.log("paym", walletHistory)
    if (walletHistory === null || walletHistory === 0) {
        walletHistory = 0;
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: Colors.white }}
        >
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'dark-content'} />
            <MyHeader title={'Payment Bill History'} navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {/* {walletHistory && walletHistoryInfo()} */}
                    {walletHistory.length ? walletHistoryInfo() : <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
                        <Text style={{ display: "flex", alignSelf: "center", justifyContent: "center",color:colors.black_color,fontSize:15 }}>No Data Available</Text>
                    </View>}
                </>}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2, paddingHorizontal: Sizes.fixPadding * 1.5 }}
            />
        </View>
    )

    function walletHistoryInfo() {
        const historyFor = (type) => {
            switch (type) {
                case 'CHAT':
                    return 'Deducted using chat.'
                case 'CALL':
                    return 'Deducted using call.'
                case 'GIFT':
                    return 'Deducted using gift.'
                case 'LIVE_VEDIO_CALL':
                    return 'Deducted using live streaming call.'
                case 'WALLET_RECHARGE':
                    return 'Balanced added to your wallet'
                case 'PRODUCT':
                    return 'Product Purchased'
                default:
                    return type
            }
        }
        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.invoiceId}>
                        <Text style={{ ...Fonts.black12RobotoRegular }}>{item?.invoiceId}</Text>
                    </View>
                    <Text style={styles.text}>Date: {moment(item?.createdAt).format('DD MMM YYYY')}</Text>
                    <Text style={styles.text}>Time: {moment(item?.createdAt).format('hh:mm A')}</Text>
                    <Text style={styles.text}>{historyFor(item?.type)}</Text>
                    <View style={styles.amountContainer}>
                        <Text style={{ ...Fonts.blackLight14RobotoRegular, fontSize: 18, color: item?.transactionType == 'CREDIT' ? Colors.greenLight : Colors.red }}>{item?.transactionType == 'CREDIT' ? '+' : '-'} {showNumber(item?.amount)}</Text>
                        {item?.offer && <Text style={{ ...Fonts.black11InterMedium, textAlign: 'right' }}>{item?.offer}% Extra</Text>}
                    </View>
                </View>
            )
        }
        return (

            <View>
                <FlatList
                    data={walletHistory}
                    renderItem={renderItem}
                    initialNumToRender={5}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    walletHistory: state.history.walletHistory
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistroy)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.grayLight,
        marginBottom: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    invoiceId: {
        backgroundColor: Colors.white,
        paddingHorizontal: Sizes.fixPadding * 0.5,
        paddingVertical: Sizes.fixPadding * 0.3,
        borderRadius: 1000,
        elevation: 3,
        shadowColor: Colors.blackLight,
        alignSelf: 'flex-start',
        marginBottom: Sizes.fixPadding * 0.8
    },
    text: {
        ...Fonts.blackLight14RobotoRegular,
        marginBottom: Sizes.fixPadding * 0.3,
        fontSize: 13
    },
    amountContainer: {
        position: 'absolute',
        top: Sizes.fixPadding,
        right: Sizes.fixPadding
    }
})