import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import Timer from './components/Timer'
import ChatDetails from './components/ChatDetails'
import * as ChatActions from '../../redux/actions/ChatActions'
import * as SettingActions from '../../redux/actions/SettingActions'
import Modal from 'react-native-modal';
import { colors, fonts, getFontSize } from '../../config/Constants1'
import { actions } from '../../config/data'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { imagePicker } from '../../utils/services'
import { base_url } from '../../config/constants'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const CustomerChat = ({ navigation, route, dispatch, imagePickerVisible, requestedData }) => {
  useEffect(() => {
    dispatch(ChatActions.onInitiateChat({ dispatch }))
  }, [dispatch])

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to end this Chat?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => dispatch(ChatActions.onEndChat()) },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EDF2F5',
      }}>
      <MyStatusBar
        backgroundColor={"#F8F8F8"}
        barStyle={'dark-content'}
      />
      {/* <Loader visible={isLoading} /> */}
      <View style={{ flex: 1 }}>
        {header()}
        <Timer requestedData={requestedData} />
        <ChatDetails />
      </View>
      {imagePickerInfo()}
    </View>
  );

  function imagePickerInfo() {
    const onImagePicker = async (type) => {
      const response = await imagePicker({ type })
      if (response) {
        dispatch(ChatActions.setChatImageData(response[0]?.uri))
        dispatch(SettingActions.setImagePickerVisible(false))
      }
    }
    return (
      <Modal
        isVisible={imagePickerVisible}
        useNativeDriver={true}
        style={{ padding: 0, margin: 0 }}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => dispatch(SettingActions.setImagePickerVisible(false))}>
        <View
          style={{
            flex: 0,
            width: '90%',
            backgroundColor: colors.background_theme1,
            padding: 20,
            paddingVertical:10,
            paddingBottom:20,
            position: 'absolute',
            top: responsiveScreenHeight(32),
            borderRadius:20,
            alignSelf:'center'
          }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onImagePicker(item?.type)}
                style={{ flex: 1, alignItems: 'center', marginTop:10,}}>
                {/* <Ionicons
                  name={item.title == 'Camera' ? 'camera' : 'image'}
                  size={25}
                  color={colors.black_color}
                /> */}
               <View style={{borderBottomWidth:0.5,borderBottomColor:'#E3DADA',width:"100%",paddingBottom:7,}}>
                <Text style={{...Fonts.primaryHelvetica,fontSize:20,color:"#000",textAlign:'center'}}>Choose Options</Text>
                <Text style={{...Fonts.primaryHelvetica,fontSize:13,color:"#000",textAlign:'center',marginTop:-5,}}>Only photos can be Shared</Text>
                </View>
                <Image source={(require('../../assets/astrobookimages/gallery.png'))}
                style={{height:100,width:100,objectFit:"contain"}}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: colors.background_theme2,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    )
  }

  function header() {
    const end_chat = async () => {
      Alert.alert('Hold on!', 'Do you want to end this Chat?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => dispatch(ChatActions.onEndChat()),
        },
      ]);
    };
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: 5,
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:"#F8F8F8",
        }}>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{ paddingVertical: Sizes.fixPadding, marginRight: 10 }}>
          <Ionicons
            name="arrow-back"
            color={colors.white_color}
            size={getFontSize(2.5)}
          />
        </TouchableOpacity> */}
        <View
          onPress={() => navigation.navigate('notifications')}
          style={{
            backgroundColor: Colors.white,
            borderRadius: 50,
            height: 40,
            width: responsiveScreenWidth(12),
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
            overflow: 'hidden',
            marginLeft: 10
          }}>
          <Image
            source={{ uri: base_url + requestedData?.profileImage }}
            style={{ width: responsiveScreenWidth(12), height:responsiveScreenHeight(10),borderRadius:100 }}
            resizeMode='cover'
          />
        </View>
        <Text numberOfLines={1}
          style={{
            ...Fonts.primaryHelvetica,
            marginLeft: Sizes.fixPadding,
            textAlignVertical: 'center',
            color:"#000"
          }}>
          {requestedData?.astrologerName}
        </Text>
        <Image source={require('../../assets/astrobookimages/tickverifires.png')} style={{height:14,width:14,objectFit:"contain",marginLeft:4}}/>
        <View
          style={{
            flexGrow: 1,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => end_chat()}
            style={{
              paddingHorizontal: Sizes.fixPadding * 1.5,
              paddingVertical: Sizes.fixPadding * 0.3,
              marginLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth:0.5,
              borderColor:'#EB0000'
            }}>
            <Text
              style={{
                ...Fonts.primaryHelvetica,
                color:"#EB0000",
                fontSize:10,
              }}>
              End
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatData: state.chat.chatData,
  imagePickerVisible: state.setting.imagePickerVisible,
  requestedData: state.chat.requestedData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CustomerChat)