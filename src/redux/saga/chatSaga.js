import { call, delay, put, select, take, takeLatest, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../config/api_requests';
import {
    add_profile,
    api_url,
    base_url,
    check_chat_status,
    delete_linked_data,
    endvidocall,
    get_chat_details,
    get_linked_profile,
    initiate_chat,
    store_file,
} from '../../config/constants';
import { get_unique_id, showToastMessage } from '../../utils/services';
import { navigate, resetToScreen } from '../../navigations/NavigationServices';
import { blobRequest, postRequest } from '../../utils/apiRequests';
import socketServices from '../../utils/socket';
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ChatActions from '../actions/ChatActions'
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

function* onChatNow(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_CHAT_CALL_DATA_SAVE, payload: null });
        navigate('chatIntakeForm', payload);
    } catch (e) {
        console.log(e);
    }
}

function* onCallNow(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_CHAT_CALL_DATA_SAVE, payload: null });
        navigate('chatIntakeForm', payload);
    } catch (e) {
        console.log(e);
    }
}

function* getMyLinkedProfile(actions) {
    try {
        const customerData = yield select(state => state.customer.customerData);
        const response = yield postRequest({
            url: api_url + get_linked_profile,
            data: {
                customerId: customerData?._id,
            },
        });

        if (response?.success) {
            yield put({ type: actionTypes.SET_LINKED_PROFILE, payload: response.data });
        }
    } catch (e) {
        console.log(e);
    }
}

// function* onChatCallCheck(actions) {
//     try {
//         const {payload} = actions;
//         console.log('Payload ::::', payload);
//         socketServices.emit('TestChat',payload?.astrologerId);

//         //save 
//         yield put({ type: actionTypes.SET_CHAT_CALL_DATA_SAVE, payload: payload});

//         // check 
//         socketServices.on('startChatAstro',(data) => {
//             console.log('Message ::::::', data);
//             if(data.message) {
//               dispatch(ChatActions.onChatRequestSend());
//             } else {
//               showToastMessage({ message: "chat astrologer exists."})
//             }
//           });

//     } catch(e) {
//         console.log(e);
//     }
// }

function* onChatCallCheck(actions) {
    try {
        const { payload } = actions;
        console.log('Payload ::::', payload);
        const customerData = yield select(state => state.customer.customerData);
        const payload2 = {
            astrologerId: payload?.astrologerId,
            customerId: customerData?._id,
        }

        // Emit the socket event
        yield call([socketServices, socketServices.emit], 'TestChat', payload2);

        // Save the data
        yield put({ type: actionTypes.SET_CHAT_CALL_DATA_SAVE, payload });

        // Wait for the socket event
        // const { data } = yield take('startChatAstro');
        // console.log('Message ::::::', data);

        // if (data.message) {
        //     yield put(ChatActions.onChatRequestSend());
        // } else {
        //     yield call(showToastMessage, { message: "Chat with astrologer already exists." });
        // }
    } catch (e) {
        console.log(e);
    }
}

function* onChatRequestSend(actions) {
    console.log('first')
    try {
        const {
            isNewProfile,
            profileData,
            selectedProfileId,
            astrologerId,
            chatPrice,
            onComplete,
            type,
            astrologerName,
            navigation,
            modalComp
        } = actions.payload;
        // const ChatCall = yield select(state => state.chat.chatcallData);
 
        const customerData = yield select(state => state.customer.customerData);
        if (!customerData?.customerName) {
            showToastMessage({ message: 'Please update your profile' });
            return;
        }


        let profileId = selectedProfileId;

        if (!isNewProfile) {
            const register_response = yield postRequest({
                url: api_url + add_profile,
                data: { ...profileData, customerId: customerData?._id },
            });

            if (register_response.success) {
                yield call(onComplete)
            }
            profileId = register_response?.data;
        }

        if (type == 'chat') {
            const send_request = yield postRequest({
                url: api_url + initiate_chat,
                header: 'json',
                data: {
                    astrologerId: astrologerId,
                    customerId: customerData?._id,
                    formId: profileId,
                    chatPrice: chatPrice,
                },
            });

            if (send_request.success) {
                console.log("Chat request sended:::>>>>",send_request)
                showToastMessage({ message: 'Chat request sended' });
                socketServices.emit('createChatRoom', {
                    roomID: send_request?.newChat?._id,
                    chatPrice: send_request?.newChat?.chatPrice,
                    customerID: send_request?.newChat?.customerId,
                    astroID: send_request?.newChat?.astrologerId,
                    duration: send_request?.duration,
                    // newUser: customer?.newUser
                    newUser: false
                });
                socketServices.emit('joinChatRoom', send_request?.newChat?._id)
            } else {
                showToastMessage({ message: send_request?.message });
            }
        } else if (type == 'call') {
      
            if (customerData?.wallet_balance < chatPrice * 5) {
                showToastMessage({ message: 'Insufficient Balance' })
                if (typeof modalComp === 'function') {
                   
                    yield call(modalComp)
                }
            } else {

                yield put({ type: actionTypes.ON_CALL_TO_ASTROLOGER, payload: { customerId: customerData?._id, astrologerId: astrologerId, formId: profileId } })
            }
        } else {
            if (customerData?.wallet_balance < chatPrice * 5) {
                showToastMessage({ message: 'Insufficient Balance' })
                if (typeof modalComp === 'function') {
                    console.log('modal bnd h ')
                    yield call(modalComp)
                }
            } else {
            yield put({ type: actionTypes.ON_VIDEO_CALL_TO_ASTROLOGER, payload: { customerId: customerData?._id, astrologerId: astrologerId, formId: profileId, astrologerName, navigation, chatPrice } })
            }
        }

    } catch (e) {
        console.log(e, 'error videp');
    }
}

function* onAcceptRejectChat(actions) {
    console.log(":::::P:>>>>",actions)
    try {
        const { status, requestedData } = actions.payload
        
        if (status == 'accept') {
            socketServices.emit('startChatTimer', requestedData?.chatId)
            yield AsyncStorage.setItem('chatData', JSON.stringify(requestedData))
            yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: requestedData })
            yield resetToScreen('customerChat')
            return
        }
        const data = {
            roomID: requestedData?.chatId,
            actionBy: 'customer'
        }
        socketServices.emit('declinedChat', data)
        resetToScreen('home')

    } catch (e) {
        console.log(e)
    }
}

function* onInitiatChat(actions) {
    try {
        const { dispatch } = actions.payload
        const requestedData = yield select(state => state.chat.requestedData)
        const chat_id = `customer_${requestedData?.user_id}_astro_${requestedData?.astroID}`

        const messagesRef = database()
            .ref(`ChatMessages/${chat_id}`)
            .orderByChild('addedAt');

        messagesRef.on('value', snapshot => {
            try {
                const msg = [];
                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        if (!message.received && message?.user?.id != requestedData?.user_id) {
                            // updateMessageStatus(childSnapshot.key);
                        }
                        msg.push({ ...message });
                    } catch (e) {
                        console.log(e)
                    }

                });
                dispatch(ChatActions.setChatData(msg.reverse()))

                // setMessages(msg.reverse());
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e)
    }
}

function* sendChatMessage(actions) {
    try {
        const requestedData = yield select(state => state.chat.requestedData)
        const chat_id = `customer_${requestedData?.user_id}_astro_${requestedData?.astroID}`
        const { payload } = actions

        const chatNode = database().ref(`ChatMessages/${chat_id}`).push();
        const newKey = chatNode.key;
        const chatRef = database().ref(`ChatMessages/${chat_id}/${newKey}`);
        chatRef.set({
            ...payload,
            pending: false,
            sent: true,
            received: false,
            createdAt: new Date().getTime(),
            addedAt: database.ServerValue.TIMESTAMP,
        });

    } catch (e) {
        console.log(e)
    }
}

function* saveChatMessage(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        const { payload } = actions
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: GiftedChat.append(chatData, payload) })

    } catch (e) {
        console.log(e)
    }
}

function* onEndChat(actions) {
    try {
        const requestedData = yield select(state => state.chat.requestedData)
        socketServices.emit('endChat', { roomID: requestedData?.chatId });
        yield put({ type: actionTypes.ON_CLOSE_CHAT, payload: null })
    } catch (e) {
        console.log(e)
    }
}

function* onCloseChat(actions) {
    try {
        yield delay(1000); 
        const customerData = yield select(state => state.customer.customerData)
        const requestedData = yield select(state => state.chat.requestedData)
        console.log(requestedData?.chatId,'chatidatul')

        if (!requestedData) {
            return
        }

        const response = yield postRequest({
            url: api_url + get_chat_details,
            data: {
                chatId: requestedData?.chatId
            }
        })
        
        if (response?.success) {
            yield AsyncStorage.removeItem('chatData')
            yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: null })
            yield put({ type: actionTypes.SET_CHAT_DATA, payload: [] })
            yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 })
            yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: customerData?._id })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: response?.chatHistory })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBLE, payload: true })
        }
        resetToScreen('home')
    } catch (e) {
        console.log(e)
    }
}

function* onChatImageSend(actions) {
    try {
        const { message, uri } = actions.payload
        const response = yield blobRequest({
            url: api_url + store_file,
            data: [
                {
                    name: 'fileType',
                    data: 'image',

                },
                {
                    name: 'filePath',
                    filename: 'chat_image.png',
                    data: RNFetchBlob.wrap(uri),
                    type: 'image/png',
                }
            ]
        })

        if (response?.success) {
            let msg = {
                ...message,
                image: base_url + response?.data?.filePath
            }
            yield put({ type: actionTypes.SEND_CHAT_MESSAGE, payload: msg })
        }



        console.log(response)

    } catch (e) {
        console.log(e, 'e')
    }
}
function* getOnViedoCallEnd(actions) {
    try {
        const { payload } = actions
        console.log("call Id Payload :::", payload);
        const data = {
            callId: payload.callID,
        }
        console.log(data, 'videcall data')
        const response = yield axios.post(api_url + endvidocall, data);
        console.log(response?.data, 'vcdata')
        if (response?.data.success) {
            // yield put({ type: actionTypes.SET_VIDEO_INVOICE_DATA, payload: response?.data?.data })
            // yield put({ type: actionTypes.SET_VIDEOCALL_INVOICE_VISIBLE, payload: true })
            showToastMessage({ message: 'VideCall Ended' });

            console.log(' end chshsh')
        }
        resetToScreen('home')
    } catch (e) {
        console.log(e, 'error vidfepo');
    }
}
function* getLinkedData(actions) {
    try {
        const { payload } = actions
        const response = yield postRequest({
            url: api_url + delete_linked_data,
            data: {
                ...payload
            }
        })
        console.log(response?.message,'linked data ')
        if (response?.success) {
            showToastMessage({message: response?.message})
            yield put({type: actionTypes.GET_MY_LINKED_PROFILE,payload:null})
        }
    } catch (e) {
        console.log(e)
    }
}


export default function* chatSaga() {
    yield takeLatest(actionTypes.ON_CHAT_NOW, onChatNow);
    yield takeLatest(actionTypes.ON_CALL_NOW, onCallNow);
    yield takeLatest(actionTypes.GET_MY_LINKED_PROFILE, getMyLinkedProfile);
    yield takeLatest(actionTypes.ON_CHAT_REQUEST_SEND, onChatRequestSend);
    yield takeLatest(actionTypes.ON_ACCEPT_REJECT_CHAT, onAcceptRejectChat);
    yield takeLeading(actionTypes.ON_INITIATE_CHAT, onInitiatChat)
    yield takeLeading(actionTypes.SEND_CHAT_MESSAGE, sendChatMessage)
    yield takeLeading(actionTypes.SAVE_CHAT_MESSAGE, saveChatMessage)
    yield takeLeading(actionTypes.ON_END_CHAT, onEndChat)
    yield takeLeading(actionTypes.ON_CLOSE_CHAT, onCloseChat)
    yield takeLeading(actionTypes.ON_CHAT_IMAGE_SEND, onChatImageSend)
    yield takeLeading(actionTypes.ON_CHAT_CALL_CHECK, onChatCallCheck);
    yield takeLeading(actionTypes.GET_ON_VIDEO_CALL_END, getOnViedoCallEnd);
    yield takeLeading(actionTypes.GET_LINKED_DATA, getLinkedData);
}
