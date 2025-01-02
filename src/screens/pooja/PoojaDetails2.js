import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/Ionicons'
import { showNumber } from '../../utils/services'
import * as AstromallActions from '../../redux/actions/astromallActions'
import { colors, getFontSize } from '../../config/Constants1'
import { api_url, base_url, img_url } from '../../config/constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import Carousel from 'react-native-reanimated-carousel'
import * as actionType from "../../redux/actionTypes"
import { RadioButton } from 'react-native-paper'
import * as HomeActions from '../../redux/actions/HomeActions'
import * as PoojaActions from '../../redux/actions/PoojaActions'
import DatePicker from 'react-native-date-picker'
import PaymentModal from '../../Modal/PaymentModal'



const PoojaDetails2 = ({ navigation, route, dispatch, customerData }) => {
    const Pooja = route?.params
    console.log("data22", Pooja.pujaName)
    const [activeIndex, setActiveIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState("2024-10-10T16:30:00.000+00:00")
    const [checked, setChecked] = useState('first');
    const [timeopen, setTimeopen] = useState(false)
    const [showtime, setShowtime] = useState({ HH: "01", MM: "10", SEC: "12" })
    console.log("customerData", customerData)
    const [BookPujaData, setBookPujaData] = useState({
        pujaId: Pooja?._id,
        userId: customerData?._id,
        date: null,
        time: null,
        mode: "offline"
    })
    useEffect(() => {
        dispatch(HomeActions.getHomeData());
    })
    useEffect(() => {
        setBookPujaData({
            ...BookPujaData,
            date: date,
            time: time
        })
    }, [date, time])
    console.log("BookPujaData", BookPujaData)

    function bookPujaHandle() {
        // dispatch(PoojaActions.getBookPooja({ BookPujaData, customerData }));
        dispatch(PoojaActions.openModal({ BookPujaData, customerData }))
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle={'light-content'} />
            <View style={{}}>
                <MyHeader title={'Puja Details'} navigation={navigation} />
                <PaymentModal BookPujaData={BookPujaData}  />
            
                <FlatList
                    style={{height: SCREEN_HEIGHT * 0.9}}
                    ListHeaderComponent={<>
                        {Pooja?.bannerImages && Banner()}
                        {AllPooja()}
                        {pujaInfo()}
                        {FillDetails()}
                        {/* {Mode()} */}
                        {Button()}
                        {/* {Upload()} */}
                        {/* {UploadVideos()} */}
                        </>}
                />
               
            </View>
        </View >
    )


    function Banner() {
        let DATA = [];
        DATA.push(Pooja)
        console.log("qqqqq", DATA)
        return (
            <View style={{ marginTop: "4%", paddingHorizontal: 3, flex: 0.38 }}>
                <Carousel
                    style={{ flex: 0.35 }}
                    autoPlay={true}
                    autoPlayInterval={2000}
                    loop={true}
                    width={SCREEN_WIDTH * 1}
                    height={SCREEN_HEIGHT * 0.2}
                    data={DATA}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={({ item }) => (
                        <View style={{}}>
                            <Image
                                resizeMode='cover'
                                source={{ uri: base_url + item?.bannerImages }}
                                style={{ height: "100%", width: "100%", borderRadius: 10, paddingHorizontal: 0 }}
                            />
                            <View style={{ backgroundColor: "" }}></View>
                        </View>
                    )}
                />
                <View style={{ flexDirection: 'row', top: -10 }}>
                    {DATA.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                height: 8,
                                width: 8,
                                borderRadius: 4,
                                backgroundColor: activeIndex === index ? '#000' : '#d3d3d3',
                                marginHorizontal: 4,
                            }}
                        />
                    ))}
                </View>
            </View>

        )
    }

    function AllPooja() {
        return (
            <View style={{ marginTop: "5%" }}>
                <Text style={{ fontSize: getFontSize(2), color: "black", paddingHorizontal: 7 }}>{Pooja.pujaName}</Text>
                <View style={{ alignItems: "center", }}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: img_url + Pooja?.image }}
                        style={{ height: SCREEN_WIDTH * 0.62, width: SCREEN_WIDTH * 0.95, borderRadius: 10, marginTop: "2%" }}
                    />
                </View>
            </View>

        )
    }

    function pujaInfo() {
        return (
            <>
                <View style={{ marginTop: "4%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 14 }}>
                    <Text style={{ textAlign: "center", fontSize: getFontSize(2), color: "black", fontWeight: "500" }}>Puja Price</Text>
                    <Text style={{ textAlign: "center", fontSize: getFontSize(2), color: "#F3604C", fontWeight: "500" }}>{"₹" + Pooja?.price}</Text>
                </View>
                <Text style={{ fontSize: getFontSize(2), fontWeight: "500", paddingHorizontal: SCREEN_WIDTH * 0.03, color: "black", marginVertical: 5 }}>
                    Discription
                </Text>
                {Discription()}
            </>
        )

        function Discription() {
            return (
                <View>
                    <Text style={{ textAlign: "justify", marginHorizontal: SCREEN_WIDTH * 0.02, color: "black", fontSize: getFontSize(1.5), fontWeight: "500" }}>
                        {Pooja?.description}
                    </Text>
                </View>
            )
        }
    }


    function FillDetails() {
        // useEffect(()=>{
        //     setBookPujaData({
        //         ...BookPujaData,
        //         time : time,
        //         date : date
        //     })
        // },[time,date])
        return (
            <View style={{ borderTopWidth: 1, borderTopColor: "black", marginTop: "4%" }}>
                <Text style={{ textAlign: "center", color: "black", fontSize: getFontSize(2), fontWeight: "500", paddingVertical: SCREEN_WIDTH * 0.02 }}>Fill All Details</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: SCREEN_WIDTH * 0.1, paddingVertical: SCREEN_WIDTH * 0.02 }}>
                    <Pressable style={styles.dt}>
                        {datepick()}
                        <Icon2 name='date' size={20} color="black" />
                        <Text
                            onPress={() => setOpen(true)}
                            style={{ fontSize: getFontSize(1.5), color: "black" }}>{date.toLocaleDateString()}
                        </Text>
                    </Pressable>
                    <View style={styles.dt}>
                        {timepick()}
                        <Icon3 name='time' size={20} color="black" />
                        <Text
                            onPress={() => setTimeopen(true)}
                            style={{ fontSize: getFontSize(1.5), color: "black" }}>{`${showtime.HH}:${showtime.MM}:${showtime.SEC}`}</Text>
                    </View>
                </View>
            </View>
        )


        function datepick() {
            console.log("date.......")
            return <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setBookPujaData({
                        ...BookPujaData,
                        date: date
                    })
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        }
        function timepick() {
            const readableDate = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long', // 'long' gives the full month name
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // Set to false for 24-hour format
            });
            console.log("date.......",)
            return <DatePicker
                modal
                open={timeopen}
                // minimumDate={new Date(date)}
                date={date}
                mode='datetime'
                onConfirm={(time) => {
                    setShowtime({
                        HH: time.getHours(),
                        MM: time.getMinutes(),
                        SEC: time.getSeconds()
                    })
                    console.log("time0000", time.getHours())
                    setTimeopen(false)
                    setTime(time)
                    setBookPujaData({
                        ...BookPujaData,
                        time: time
                    })
                }}
                onCancel={() => {
                    setTimeopen(false)
                }}
            />
        }
    }

    function Mode() {
        // if (checked === 'first') {
        //     BookPujaData = {
        //         ...BookPujaData,
        //         mode: 'online'
        //     }
        // } else {
        //     BookPujaData = {
        //         ...BookPujaData,
        //         mode: 'offline'
        //     }
        // }
        return (
            <View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "5%" }}>
                    <Text style={{ textAlign: "center", fontSize: getFontSize(2), color: "black", fontWeight: "500" }}>Mode</Text>
                    <Text style={{ textAlign: "center", fontSize: getFontSize(2), color: "red", fontWeight: "500" }}> - Online</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton
                            value="first"
                            color='red'
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text style={{ fontSize: getFontSize(2), fontWeight: "700", color: colors.black_color }}>Online</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton
                            value="second"
                            color='red'
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={{ fontSize: getFontSize(2), fontWeight: "700", color: colors.black_color }}>Offline</Text>
                    </View>
                </View>
            </View>

        )
    }


    function Button() {
        return (
            <View style={{ marginTop: "4%" }}>
                <TouchableOpacity
                    onPress={bookPujaHandle}
                    style={{ backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.015, borderRadius: 100, marginHorizontal: SCREEN_WIDTH * 0.1 }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: getFontSize(2), fontWeight: "400" }}>Book Puja</Text>
                </TouchableOpacity>
            </View>
        )
    }




}



// export default PoojaDetails2

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails2);

// function PoojaDetails2(){
//     return(
//         <>
//         <Text>Total</Text>
//         </>
//     )
// }
const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    poojaData: state.pooja.poojaData,
    newPoojaData: state.pooja.newPoojaData,
    bookpujaHistoryData: state.pooja.newPoojaData
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails2);



const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F3604C",
        paddingVertical: SCREEN_HEIGHT * 0.02,
        flexDirection: "row",
    },
    dt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        borderBottomWidth: 1.9,
        borderBlockColor: "#D3D3D3",
        paddingRight: SCREEN_WIDTH * 0.03
    }
})