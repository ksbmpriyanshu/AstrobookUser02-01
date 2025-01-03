import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as AstrologerActions from '../../../redux/actions/AstrologerActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';
import { base_url } from '../../../config/constants';
import { colors } from '../../../config/Constants1';

const AstroRating = ({ dispatch, astroRatingVisible, ratingData }) => {
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');

  const closeAstroRating = () => {
    dispatch(AstrologerActions.setAstroRatingVisible({ data: null, ratingVisible: false }));
    setComments('');
  };

  console.log(ratingData, 'alldataasro ');
  const onSubmit = () => {
    try {
      const payload = {
        astrologerId: ratingData?._id ? ratingData._id : ratingData.astrologerId,
        ratings: rating,
        comments: comments,
      };
      console.log(payload, 'all data ');
      setComments('');
      dispatch(AstrologerActions.onAstroRating(payload));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      visible={astroRatingVisible}
      transparent={true}  
      animationType="fade"  
      onRequestClose={closeAstroRating} 
    >
      <View style={styles.overlay}>
        <View style={styles.mainContainer}>
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:SCREEN_WIDTH*0.03,alignItems:"center",paddingTop:SCREEN_HEIGHT*0.015}}>
                <View style={{width:SCREEN_WIDTH*0.15}}>

                </View>
                <Text style={{color:colors.black_color9,...Fonts.black11InterMedium,fontSize:15}}>Rate Astrologers</Text>
                <TouchableOpacity onPress={() => closeAstroRating()}>
                <Ionicons name="close-outline" color={colors.black_color6} size={31} />
                </TouchableOpacity>
            </View>
          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => closeAstroRating()} style={styles.closeButton}>
            <Ionicons name="close-outline" color={Colors.white} size={28} />
          </TouchableOpacity> */}
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: base_url + ratingData?.profileImage }}
                style={{ width: '100%', height: '100%', borderRadius: 1000 }}
              />
            </View>
            <Text style={{ ...Fonts.black18RobotoMedium, textAlign: 'center' }}>{ratingData?.astrologerName}</Text>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Stars
                default={1}
                count={5}
                half={false}
                starSize={20}
                update={(rating) => setRating(rating)}
                fullStar={<Ionicons name={'star'} size={35} color={colors.astrobook1} />}
                emptyStar={<Ionicons name={'star-outline'} size={35} color={colors.black_color5} />}
                halfStar={<Ionicons size={35} name={'star-half'} style={{ color: colors.astrobook1 }} />}
              />
            </View>
            <View style={{alignItems:"center"}}>
            <TextInput
              value={comments}
              placeholder="Type your comment."
              placeholders
              multiline
              placeholderTextColor={Colors.gray}
              onChangeText={setComments}
              style={styles.input}
            />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onSubmit()} style={styles.submitButton}>
              <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  astroRatingVisible: state.astrologer.astroRatingVisible,
  ratingData: state.astrologer.ratingData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstroRating);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  mainContainer: {
    width: SCREEN_WIDTH * 0.9,
    height:SCREEN_HEIGHT*0.6,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 2,
  
  
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#00000050',
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.white,
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding,
  },
  input: {
   borderWidth:1.2,
   width:SCREEN_WIDTH*0.75,
   height:SCREEN_HEIGHT*0.095,
   borderRadius:15,
   borderColor:colors.black_color5,
   paddingHorizontal:SCREEN_WIDTH*0.03,
   color:"#000"
  },
  submitButton: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: colors.astrobook1,
    marginVertical: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding*1.4,
    borderRadius: 1000,
  },
});
