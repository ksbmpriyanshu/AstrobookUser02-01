import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, Input } from '@rneui/themed'
import { connect } from 'react-redux'
import * as AstrologerActions from '../../../redux/actions/AstrologerActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Colors, Sizes, Fonts } from '../../../assets/style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars';
import { base_url } from '../../../config/constants'
import { colors } from '../../../config/Constants1'

const AstroRating = ({ dispatch, astroRatingVisible, ratingData, }) => {
    const [rating, setRating] = useState(1)
    const [comments, setComments] = useState('')

    const closeAstroRating = () => {
        dispatch(AstrologerActions.setAstroRatingVisible({ data: null, ratingVisible: false }))
        setComments('')
    }
    console.log(ratingData,'alldataasro ')
    const onSubmit = () => {
        try {
            const payload = {
                astrologerId: ratingData?._id ? ratingData._id : ratingData.astrologerId,
                ratings: rating,
                comments: comments
            }
            console.log(payload,'all data ')
            setComments('')
            dispatch(AstrologerActions.onAstroRating(payload))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <BottomSheet
            isVisible={astroRatingVisible}
        >
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => closeAstroRating()} style={styles.closeButton}>
                    <Ionicons name='close-outline' color={Colors.white} size={28} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: base_url + ratingData?.profileImage }} style={{ width: '100%', height: '100%', borderRadius: 1000 }} />
                    </View>
                    <Text style={{ ...Fonts.black18RobotoMedium, textAlign: 'center' }}>{ratingData?.astrologerName}</Text>
                    <View style={{ marginVertical: Sizes.fixPadding }}>
                        <Stars
                            default={1}
                            count={5}
                            half={false}
                            starSize={20}
                            update={(rating) => setRating(rating)}
                            fullStar={
                                <Ionicons name={'star'} size={35} color={colors.background_theme2} />
                            }
                            emptyStar={
                                <Ionicons
                                    name={'star-outline'}
                                    size={35}
                                    color={colors.background_theme2}
                                />
                            }
                            halfStar={
                                <Ionicons
                                    size={35}
                                    name={'star-half'}
                                    style={{ color: colors.background_theme2 }}
                                />
                            }
                        />
                    </View>
                    <TextInput
                        value={comments}
                        placeholder='Type your comment.'
                        multiline
                        placeholderTextColor={Colors.gray}
                        onChangeText={setComments}
                        style={styles.input}
                    />
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onSubmit()} style={styles.submitButton}>
                        <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </BottomSheet>
    )
}

const mapStateToProps = state => ({
    astroRatingVisible: state.astrologer.astroRatingVisible,
    ratingData: state.astrologer.ratingData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstroRating)

const styles = StyleSheet.create({
    mainContainer: {

    },
    container: {
        maxHeight: SCREEN_HEIGHT * 0.8,
        backgroundColor: Colors.white,
        borderTopRightRadius: Sizes.fixPadding * 2,
        borderTopLeftRadius: Sizes.fixPadding * 2,
    },
    closeButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: '#00000050',
        marginBottom: Sizes.fixPadding,
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: Colors.white,
        alignSelf: 'center',
        elevation: 8,
        shadowColor: Colors.grayDark,
        marginVertical: Sizes.fixPadding
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        height: SCREEN_HEIGHT * 0.2,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.grayA,
        textAlignVertical: 'top',
        padding: Sizes.fixPadding,
        marginTop: Sizes.fixPadding
    },
    submitButton: {
        width: '70%',
        alignSelf: 'center',
        backgroundColor: colors.background_theme2,
        marginVertical: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding,
        borderRadius: 1000,
    }
})