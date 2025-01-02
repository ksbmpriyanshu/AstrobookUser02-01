import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import * as LiveActions from '../../../redux/actions/LiveActions'
import { Modal } from 'react-native-paper'
import { Colors, Sizes } from '../../../assets/style'

const data = ['Gifts are virtual.', 'Gifts are voluntary and non-refundable.', 'The company does not guarantee any services in exchange for gifts.', 'Gifts can be cashed out by the astrologer according to company policies']

const CallInfo = ({ dispatch, callInfoVisible }) => {
    const renderItem = ({ item, index }) => {
        return (
            <View>

            </View>
        )
    }
    return (
        <Modal
            visible={callInfoVisible}
            onDismiss={() => dispatch(LiveActions.setCallInfoVisible(false))}
            contentContainerStyle={{zIndex: 8}}
        >
            <View style={styles.container}>
                <Text>How do Gifts work?</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
                <TouchableOpacity>
                    <Text>Ok</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const mapStateToProps = state => ({
    callInfoVisible: state.live.callInfoVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CallInfo)

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        backgroundColor: Colors.white,
        paddingVertical: Sizes.fixPadding * 3,
        paddingHorizontal: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding * 2,
        width: '80%',
        alignSelf: 'center'
    }
})