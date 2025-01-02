import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import Banner from './components/Banner'
import { showNumber } from '../../utils/services'
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { connect } from 'react-redux'
import { colors } from '../../config/Constants1'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { useTranslation } from 'react-i18next';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import StarRating from 'react-native-star-rating-widget'
import Entypo from 'react-native-vector-icons/Entypo';
import { useState } from 'react'

const ProductDetails = ({ route, navigation, dispatch }) => {
    const { t } = useTranslation();
    const productData = route?.params?.productData
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'dark-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={productData?.productName} navigation={navigation} />
                <FlatList
                    ListHeaderComponent={<>
                        {productData && <Banner data={productData?.bannerImages} />}
                        {productInfo()}
                        {/* {descriptionInfo()} */}
                        {Prizes()}
                        {Questions()}
                        {Ratings()}
                    </>}
                />
                {submitInfo()}
            </View>
        </View>
    )

    function submitInfo() {
        const phoneNumber = '8800247824';

        const handlePress = () => {
            Linking.openURL(`tel:${phoneNumber}`);
        };
        return (
            <View>
                {/*       */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(EcommerceActions.addToCart(productData?._id))} style={{ backgroundColor: "#F1B646", paddingVertical: SCREEN_HEIGHT * 0.022, elevation: 2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                    <Text style={{ ...Fonts.white18RobotBold, color: colors.black_color9, fontSize: responsiveFontSize(2) }}>Book Now</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function Questions() {
        const DATA = [
            {
                id: "1",
                Question: 'What will be the benefit of Rose Quartz Bracelet With Buddha?',
                Answer: 'Attracts true love | Heals the Emotional Wounds | Energized | Free Shipping | 100% Cashback | Use Code - CASHBACK100 | Certificate Included'
            },
            {
                id: "2",
                Question: 'What is the healing power of Rose Quartz?',
                Answer: 'Rose Quartz is known for promoting love, healing emotional wounds, and providing calming energy.'
            },
            {
                id: "3",
                Question: 'Disclaimer',
                Answer: 'Rose Quartz is known for promoting love, healing emotional wounds, and providing calming energy.'
            }
        ];
        const renderItem = ({ item }) => {
            return (
                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, marginVertical: SCREEN_HEIGHT * 0.01 }}>
                    <View style={{ elevation: 2, paddingHorizontal: SCREEN_WIDTH * 0.02, backgroundColor: Colors.whiteDark, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.015, gap: SCREEN_HEIGHT * 0.015 }}>
                        <Text style={{ ...Fonts.white18RobotBold, color: colors.black_color9, fontSize: responsiveFontSize(2) }}>
                            {item.Question}
                        </Text>
                        <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>
                            {item.Answer}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }

    function Ratings() {
        const [rating, setRating] = useState(4);
        const Data2 = [{ id: "1", name: "Anuj", Date: "28-7-2024" },
        { id: "2", name: "Shivam", Date: "01-6-2024" },
        { id: "3", name: "Chaudhary001", Date: "3-7-2024" }
        ]
        const renderItem2 = ({ item }) => {
            return (
                <View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.03, backgroundColor: Colors.whiteDark ,marginVertical:SCREEN_HEIGHT*0.005,paddingVertical:SCREEN_HEIGHT*0.01}}>

                        <View style={{ flexDirection: 'row', alignItems: "center", gap: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                            <View style={{ height: SCREEN_HEIGHT * 0.07, width: SCREEN_WIDTH * 0.14, borderRadius: 100, backgroundColor: "gray",paddingVertical:SCREEN_HEIGHT*0.01, }}>

                            </View>

                            <View style={{ gap: SCREEN_HEIGHT * 0.003, }}>

                                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5) }}>
                                    {item.name}
                                </Text>

                                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                    <StarRating
                                        rating={rating}
                                        onChange={setRating}
                                        starStyle={{ marginHorizontal: 0 }}
                                        starSize={15}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.2) }}>{item.Date}</Text>
                                </View>
                                <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                                    <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.2) }}>Thank You</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <Entypo name='dots-three-vertical' color={"gray"} size={14} />
                        </TouchableOpacity>

                    </View>

                </View>
            )
        }
        return (
            <View>
                <View style={{  alignItems: "center", justifyContent: "center" ,paddingVertical:SCREEN_HEIGHT*0.01}}>
                    <Text style={{ ...Fonts.white18RobotBold, color: Colors.black, fontSize: responsiveFontSize(2) }}>Customer Testimonials</Text>
                </View>
                <FlatList
                    data={Data2}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item.id} />
            </View>
        )
    }

    function Prizes() {
        const getPercentage = () => {
            return 100 - (productData?.price * 100 / productData?.mrp)
        }
        return (

            <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.02, alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.025, }}>
                <Text style={{ ...Fonts.white18RobotBold, color: Colors.black, fontSize: responsiveFontSize(2) }}>{showNumber(productData?.price)}</Text>
                <Text style={{ textDecorationLine: "line-through", ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8), color: Colors.grayA }}>{showNumber(productData?.mrp)}</Text>
                <Text style={{ ...Fonts.white18RobotBold, color: Colors.red, fontSize: responsiveFontSize(2) }}>{parseFloat(getPercentage()).toFixed(2)}% OFF</Text>
            </View>
        )
    }

    function productInfo() {
        const getPercentage = () => {
            return 100 - (productData?.price * 100 / productData?.mrp)
        }
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: colors.white_color, gap: SCREEN_HEIGHT * 0.01 }}>
                {/* <Text style={{ ...Fonts.black22RobotoMedium }}>{productData?.productName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.greenDark }}>{showNumber(productData?.price)}  <Text style={{ textDecorationLine: 'line-through', color: Colors.red_a }}>{showNumber(productData?.mrp)}</Text></Text>
               <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark }}>{parseFloat(getPercentage()).toFixed(2)}% OFF</Text> */}
                <Text style={{ ...Fonts.white18RobotBold, color: Colors.black, fontSize: responsiveFontSize(2.2) }}>{productData?.productName}</Text>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{productData?.description}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)