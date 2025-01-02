import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import MyHeader from '../../components/MyHeader';
import {
  api_url,
  colors,
  fonts,
  get_notifications,
  update_notifications,
} from '../../config/Constants1';
import {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import MyLoader from '../../components/MyLoader';
import {connect} from 'react-redux';
import * as UserActions from '../../redux/actions/CustomerActions';
import { img_url } from '../../config/constants';

const {width, height} = Dimensions.get('screen');

const NotificationDetailes = props => {
  const [notificationData] = useState(props.route.params.notificationData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title="Notifications"
          navigation={props.navigation}
          socialIcons={false}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (notificationData?.read == 0) {
      update_status();
    }
  }, []);

  const update_status = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + update_notifications,
      data: {
        user_id: props.customerData.id,
        notification_id: notificationData.id,
      },
    })
      .then(res => {
        setIsLoading(false);
        console.log(res.data);
        get_my_notifications();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const get_my_notifications = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + get_notifications,
      data: {
        user_id: props.customerData.id,
      },
    })
      .then(res => {
        setIsLoading(false);
        let un_read = res.data.records?.filter(item=>item.read == 0)
        props.dispatch(UserActions.setNotifications(res.data.records));
        props.dispatch(UserActions.setNotificationCounts(un_read.length));
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.3,
            width: '90%',
            backgroundColor: colors.background_theme1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            padding: 20
          }}>
            <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color7,
                  fontFamily: fonts.medium,
                  marginTop: 10,
                }}>
                {notificationData?.createdAt ? new Date(notificationData.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                }) : ''}
              </Text>
          <Image
             source={notificationData?.image?.length != 0 ? {uri: img_url + notificationData?.image} : require('../../assets/images/AstroRemedyLogoN.png')}
            style={{width: '100%', height: '100%', borderRadius: 10, resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flex: 0.58,
            width: '90%',
            backgroundColor: colors.background_theme1,
          }}>
          <ScrollView>
            <View style={{padding: 10}}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.black_color9,
                  fontFamily: fonts.semi_bold,
                }}>
                {notificationData?.title}
              </Text>
              {/* <Text allowFontScaling={false}
                style={{
                  fontSize: 13,
                  color: colors.black_color6,
                  fontFamily: fonts.medium,
                  marginTop: 5,
                }}>
                Written By AstroKunj{'  '}
                {moment(notificationData.created_date).format(
                  'Do MMM YYYY hh:mm A',
                )}
              </Text> */}
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color7,
                  fontFamily: fonts.medium,
                  marginTop: 10,
                }}>
                {notificationData?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationDetailes);
