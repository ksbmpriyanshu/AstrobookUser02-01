import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback } from 'react'
import { Bubble, GiftedChat, Send, Composer } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import * as ChatActions from '../../../redux/actions/ChatActions'
import { Colors, Fonts, Sizes } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as SettingActions from '../../../redux/actions/SettingActions'
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { showToastMessage } from '../../../utils/services';
import { ImageBackground } from 'react-native';
import { color } from '@rneui/base';

const ChatDetails = ({ dispatch, chatData, customerData, chatImageData }) => {
  const onSend = useCallback((messages = []) => {
    let msg = {
      ...messages[0],
      sent: false,
    };
    if (chatImageData) {
      const image = chatImageData
      msg = {
        ...msg,
        image: image
      }
      dispatch(ChatActions.setChatImageData(null))
      dispatch(ChatActions.saveChatMessage(msg))
      dispatch(ChatActions.onChatImageSend({ uri: image, message: msg }))
    } else if (msg.text.length == 0) {

    } else {
      dispatch(ChatActions.saveChatMessage(msg))
      dispatch(ChatActions.sendChatMessage(msg))
    }
  }, [chatImageData]);

  const customOnPress = (text, onSend) => {
    const regex = /\d{4,}/;
    if (regex.test(text)) {
      return showToastMessage({ message: 'Maximum 3 digits can be send ' })
    }
    onSend({ text: text.trim() }, true);
    if (text && onSend) {
      console.log('first')
    }

  };


  return (
    <ImageBackground
      source={require('../../../assets/astrobookimages/chat_bg.png')}
      style={{ flex: 1, justifyContent: 'flex-end' }}
    >
      <GiftedChat
        messages={chatData}

        onSend={messages => onSend(messages)}
        user={{
          _id: `customer_${customerData?._id}`,
          name: customerData?.customerName,
        }}
        placeholder="Type your message..."
        alwaysShowSend
        textInputProps={{ style: { ...Fonts.primaryHelvetica, flex: 1, color: '#837F7F' }, placeholderTextColor: Colors.gray }}
        renderActions={() => <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', paddingHorizontal: Sizes.fixPadding }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(SettingActions.setImagePickerVisible(true))}>
            <Image source={require('../../../assets/astrobookimages/chat_do.png')} style={{ height: 15, width: 15, objectFit: "contain" }} />
          </TouchableOpacity>
        </View>}
        //  inverted={false}
        renderChatFooter={() =>
          chatImageData && (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.4,
                backgroundColor: Colors.primaryLight,
                borderTopRightRadius: 10 * 2,
                borderTopLeftRadius: 10 * 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: chatImageData }}
                style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(ChatActions.setChatImageData(false))} style={{ position: 'absolute', zIndex: 99, right: 10, top: 10 }}>
                <Ionicons name='close' color={Colors.white} size={24} />
              </TouchableOpacity>
            </View>
          )
        }
        renderBubble={props => {
          const { currentMessage } = props;
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#E0C987",


                },
                left: {
                  backgroundColor: "#FFFFFF",

                },
              }}
              textStyle={{ right: { color: "#000", fontSize: 12 }, left: { color: "#000", fontSize: 12, } }}
            />
          );
        }}

        renderSend={({ onSend, text, sendButtonProps, ...props }) => {
          return (
            <Send
              containerStyle={{ justifyContent: 'center', }}
              {...props}
              sendButtonProps={{
                ...sendButtonProps,
                onPress: () => customOnPress(text, onSend),
              }}>
              <View
                style={{
                  borderRadius: 1000,
                  backgroundColor: "#FFFFFF",
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginRight: 10
                }}>
                <Ionicons name="send" color={"#33363F"} size={15} />
              </View>
            </Send>
          )
        }}

      />
    </ImageBackground>
  )

}

const mapStateToProps = state => ({
  chatData: state.chat.chatData,
  customerData: state.customer.customerData,
  chatImageData: state.chat.chatImageData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)