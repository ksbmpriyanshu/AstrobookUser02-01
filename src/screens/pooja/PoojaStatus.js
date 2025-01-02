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


const PoojaStatus = ({ navigation, route, dispatch, customerData }) => {
    const Pooja = route?.params
    console.log("data22", Pooja.astrologerId)
    const [activeIndex, setActiveIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date(Pooja?.poojaDate).toLocaleString().split(",")[0])
    const [time, setTime] = useState(new Date(Pooja?.poojaTime).toLocaleString().split(",")[1])
    const [checked, setChecked] = useState('first');
    const [timeopen, setTimeopen] = useState(false)
    console.log("customerData", new Date(Pooja?.poojaTime).toLocaleString().split(",")[1])
    useEffect(() => {
        dispatch(HomeActions.getHomeData());
    })


    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle={'light-content'} />
            <View style={{}}>
                <MyHeader title={'Puja Details'} navigation={navigation} />
                <ScrollView
                    style={{ marginHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 60, }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    {Pooja?.bannerImages && Banner()}
                    {AllPooja()}
                    {pujaInfo()}
                    {(Pooja?.astrologerId) && AstroDetails(Pooja?.astrologerId)}
                    {FillDetails()}
                    {/* {Mode()} */}
                    {Button()}
                    {(Pooja?.status === 'completed') && BottomImages(Pooja)}
                </ScrollView>
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
        console.log("Pooja.pujaName", Pooja)
        return (
            <View style={{ marginTop: "5%" }}>
                <Text style={{ fontSize: getFontSize(1.8), color: "black", paddingHorizontal: 14 }}>{Pooja.poojaId.pujaName}</Text>
                <View style={{ alignItems: "center", }}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: img_url + Pooja.poojaId.image }}
                        style={{ height: SCREEN_WIDTH * 0.50, width: SCREEN_WIDTH * 0.96, borderRadius: 10, marginTop: "2%" }}
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
                <Text style={{ fontSize: getFontSize(1.8), fontWeight: "500", paddingHorizontal: SCREEN_WIDTH * 0.03, color: "black", marginVertical: 5 }}>
                    Discription
                </Text>
                {Discription()}
            </>
        )

        function Discription() {
            return (
                <View>
                    <Text style={{ textAlign: "justify", marginHorizontal: SCREEN_WIDTH * 0.02, color: "black", fontSize: getFontSize(1.4), fontWeight: "500" }}>
                        {Pooja.poojaId.description}
                    </Text>
                </View>
            )
        }
    }


    function FillDetails() {
        return (
            <View style={{ marginTop: "4%" }}>
                <Text style={{ textAlign: "center", color: "black", fontSize: getFontSize(2), fontWeight: "500", paddingVertical: SCREEN_WIDTH * 0.02 }}>Filled - Details</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: SCREEN_WIDTH * 0.1, paddingVertical: SCREEN_WIDTH * 0.02 }}>
                    <Pressable style={styles.dt}>
                        {/* {datepick()} */}
                        <Icon2 name='date' size={20} color="black" />
                        <Text
                            onPress={() => setOpen(true)}
                            style={{ fontSize: getFontSize(1.5), color: "black" }}>{date.toLocaleString()}
                        </Text>
                    </Pressable>
                    <View style={styles.dt}>
                        {/* {timepick()} */}
                        <Icon3 name='time' size={20} color="black" />
                        <Text
                            onPress={() => setTimeopen(true)}
                            style={{ fontSize: getFontSize(1.5), color: "black" }}>{time.toLocaleString()}</Text>
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
                disabled={true}
                    // onPress={bookPujaHandle}
                    style={{ backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.015, borderRadius: 100, marginHorizontal: SCREEN_WIDTH * 0.1 }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: getFontSize(2), fontWeight: "400" }}>{Pooja?.status}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


function AstroDetails(astrologerId) {
    console.log("Astro1111", astrologerId)
    return (
        <View style={{ marginTop: "6%", paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
            <Text style={{fontSize:getFontSize(2.),color:"red",textAlign:"center"}}>Astrologer</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: SCREEN_WIDTH * 0.05,borderTopWidth: 1, borderTopColor: "black", borderStyle: "dotted", borderBottomWidth: 1, borderBlockColor: "black", }}>
                <Image
                    resizeMode='cover'
                    source={{ uri: base_url + astrologerId?.profileImage }}
                    style={{ width: SCREEN_WIDTH * 0.23, height: SCREEN_HEIGHT * 0.12, borderRadius: 100, }}
                />
                <View>
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        <Text style={styles.astro} >Name-</Text>
                        <Text style={styles.astro2}>{astrologerId?.astrologerName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        <Text style={styles.astro}>Phone-</Text>
                        <Text style={styles.astro2}>{astrologerId?.phoneNumber}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        <Text style={styles.astro}>Gender-</Text>
                        <Text style={styles.astro2}>{astrologerId?.gender}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        <Text style={styles.astro}>Email-</Text>
                        <Text style={styles.astro2}>{astrologerId?.email}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}



function BottomImages(Pooja) {
    const img = 'https://astroremedy.com/static/media/hand-1.d82764a39c8de99556a4.png'
    let data = [{ id: 1, imageuri: img }]
    // data.push(Pooja.images.length())
    console.log("qqqq", Pooja.images.length);
    const renderItem = ({ item }) => (
        console.log("iteamwa", item),
        <>
            <View style={{ marginTop: 18 }}>
                <Text style={{ color: "#00801C", fontSize: getFontSize(1.8), textAlign: "center" }}>Uploaded photos and videos by Astrologer</Text>
                <Image
                    source={(Pooja.images.length !== 0) ? { uri: item.images } : require("../../assets/images/uploadImage.png")}
                    style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3 }}
                />
            </View>
        </>
    )
    return (
        < FlatList
            data={data}
            renderItem={renderItem}
            // keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
    )
}



// export default PoojaStatus

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(PoojaStatus);

// function PoojaStatus(){
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

export default connect(mapStateToProps, mapDispatchToProps)(PoojaStatus);



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
    },
    astro: {
        fontSize: getFontSize(1.8),
        color: colors.background_theme4,
        fontWeight: "600"
    },
    astro2: {
        fontSize: getFontSize(1.7),
        color: colors.black_color,
        // fontWeight:"600"
    }

})