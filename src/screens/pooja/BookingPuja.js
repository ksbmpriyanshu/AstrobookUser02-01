import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import React from 'react'
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Colors, Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors, } from '../../config/Constants1'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { api_url, base_url, img_url } from '../../config/constants'
import * as PoojaActions from '../../redux/actions/PoojaActions';
import moment from 'moment';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'



const BookingPuja = ({ route, dispatch, pujaPayment, customerData }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { pujaData } = route.params;
  // console.log("Puja data",pujaData?.poojaId?.pujaName)



  const payment = () => {
    const data = {
      customerId: customerData?._id,
      astrologerId:pujaData?.astrologerId?._id,
      amount: pujaData?.price,
      pujaId: pujaData?.poojaId?._id,
      pujaDate: pujaData?.createdAt,
      pujaTime: pujaData?.createdAt,
      duration: pujaData?.duration,
      price: pujaData?.price,
      adminCommission:pujaData?.adminCommission
    }
    console.log("data:>>>>", data)
    
    dispatch(PoojaActions.getPoojapaymnetData(data))

  }
  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = moment()
      const pujaDate = moment(pujaData?.createdAt)

      const diff = moment.duration(pujaDate.diff(currentTime))

      const days = diff.days()
      const hours = diff.hours()
      const minutes = diff.minutes()
      const seconds = diff.seconds()


      const formattedTime = `-${days}d : -${hours}h : -${minutes}m : -${seconds}s left`
      setTimeLeft(formattedTime)
    }


    const timerInterval = setInterval(() => {
      calculateTimeLeft()
    }, 1000)


    return () => clearInterval(timerInterval)
  }, [pujaData?.createdAt])


  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, }}>
      <MyHeader title={'Book a Puja'} navigation={navigation} />
      <ScrollView

        style={{ flex: 1 }}>
        {PujaDetails()}
        {/* {AstroDetails()} */}
        {AboutPooja()}


      </ScrollView>

      {Payment()}
    </View>
  )
  function Payment() {
    return (
      <View style={{
        flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.013, alignItems: "center", backgroundColor: colors.astrobook1, elevation: 1, position: "absolute", bottom: 0, left: 0,
        right: 0,
      }}>
        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Total : ₹ {pujaData?.price}</Text>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_HEIGHT * 0.05, justifyContent: "center", alignItems: "center", borderRadius: 15, backgroundColor: Colors.white, elevation: 1 }}
          onPress={() => (
            payment()
          )}
        >
          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Pay</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function PujaDetails() {
    AntDesign
    return (
      <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.04, paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
        <View style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.4, borderRadius: 15, alignItems: "center", justifyContent: "center", overflow: "hidden", }}>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.4 }}
            source={{ uri: img_url + pujaData?.poojaId?.image }} />
        </View>
        <View style={{ gap: 7, paddingTop: SCREEN_HEIGHT * 0.01, paddingHorizontal: SCREEN_WIDTH * 0.01 }}>

          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.85), width: 150 }}>{pujaData?.poojaId?.pujaName}</Text>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5), color: colors.black_color6 }}>
            Date: {pujaData?.createdAt ? moment(pujaData.createdAt).format('DD-MM-YYYY') : ''}
          </Text>

          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2.5),color:'#F1B646' }}>Price: ₹{pujaData?.price}</Text>

          {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.2, height: SCREEN_HEIGHT * 0.04, borderRadius: 100, gap: SCREEN_WIDTH * 0.02, backgroundColor: "#E0C987",elevation:2}}>
            <TouchableOpacity>
              <AntDesign name='minus' color={colors.black_color9} size={20} />
            </TouchableOpacity>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>1</Text>
            <TouchableOpacity>
              <AntDesign name='plus' color={colors.black_color9} size={17} />
            </TouchableOpacity>

          </View> */}
          {/* <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7), }}>Duration:</Text> */}
          {/* <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5), }}>{timeLeft}</Text> */}
        </View>
      </View>
    )
  }
  function AstroDetails() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.04, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderRadius: 100 }}
              source={require('../../assets/images/themagician.png')} />
          </View>

          <View>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>SUDHA</Text>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.3) }}>Astrology , palm reading  </Text>

          </View>

        </View>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>Sudha is an excellent. life
          </Text>
        </View>
      </View>
    )
  }


  function AboutPooja() {
    return (
      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03, gap: SCREEN_HEIGHT * 0.02, paddingVertical: SCREEN_HEIGHT * 0.015 }}>
        {pujaData?.poojaId?.about?.map((item, index) => (
          <View key={index} style={{ gap: SCREEN_HEIGHT * 0.004 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>
              {item?.heading}
            </Text>
            {item?.bulletPoint?.map((point, i) => (
              <Text key={i} style={{ ...Fonts.black12RobotoRegular, fontSize: responsiveFontSize(1.8), textAlign: "justify" }}>
                {point}
              </Text>
            ))}
          </View>
        ))}

        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.05 }}>

        </View>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  pujaPayment: state.pooja.pujaPayment,
  customerData: state.customer.customerData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BookingPuja);



const styles = StyleSheet.create({})