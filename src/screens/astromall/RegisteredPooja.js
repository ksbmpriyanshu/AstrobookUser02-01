import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import { SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { getFontSize } from '../../config/Constants1'
import MyStatusBar from '../../components/MyStatusbar'
import { connect } from 'react-redux'
import * as AstromallActions from '../../redux/actions/astromallActions'
import MyHeader from '../../components/MyHeader'
import moment from 'moment'
import { showNumber } from '../../utils/services'
import { base_url, img_url } from '../../config/constants'

const RegisteredPooja = ({ dispatch, registeredPooja, navigation, route, astrologerPoojaData }) => {
    console.log(astrologerPoojaData?.poojaDate,'sasa')
    const [timeLeft, setTimeLeft] = useState('');
    // console.log(route?.params)
    useEffect(() => {
        dispatch(AstromallActions.getAstrologerPoojaData(route?.params?._id))
    }, [])

    
    

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <MyHeader title={'Scheduled Pooja'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <FlatList ListHeaderComponent={<>
                    {astrologerPoojaData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                />
            </View>
        </View>
    )

    function categoriesInfo() {
        const astrologerTimer = (time, date) => {
            const Pastdate = moment(date).format('YYYY-MM-DD');
            const Pasttime = moment(time).format('HH:mm');
            
            console.log(Pastdate,Pasttime);
    
            const calculateTimeLeft = () => {
                const pastDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
                const currentDateTime = moment();
                const duration = moment.duration(pastDateTime.diff(currentDateTime));

                if (duration.asMilliseconds() < 0) {
                    // If the duration is negative, the date has expired
                    return 0;
                }
        
                const days = Math.floor(duration.asDays());
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();
        
                return `${days} days ${hours} hour ${minutes} m ${seconds} s`;
            };
        
             // Initial calculation
            // setTimeLeft(calculateTimeLeft());

            // Set an interval to update the time left every second
            const intervalId = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        
            // Return a function to stop the interval when needed
            return () => clearInterval(intervalId);
        }

        const renderItem = ({ item, index }) => {
            astrologerTimer(item?.poojaTime,item?.poojaDate);
            return (
                <TouchableOpacity onPress={() => navigation.navigate('poojaDetails', { ...item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.poojaId?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', justifyContent: 'space-between', padding: Sizes.fixPadding }}
                            colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={{ uri: base_url + item?.astrologerId?.profileImage }} style={{ width: SCREEN_WIDTH * 0.12, height: SCREEN_WIDTH * 0.12, borderRadius: 1000 }} />
                                <Text style={{ ...Fonts.white16RobotoMedium, marginLeft: Sizes.fixPadding, }}>{item?.astrologerId?.astrologerName}</Text>
                                </View>
                                {timeLeft == 0 ? (<Text style={{color:Colors.white}}>Expired</Text>) : (<Text style={{color:Colors.white}}>{timeLeft}</Text>)}
                                
                            </View>
                            <View>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.poojaName}</Text>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{moment(item?.poojaDate).format('DD MMM YYYY')} {moment(item?.poojaTime).format('hh:mm A')}</Text>
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.type}</Text>
                                    <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{showNumber(item?.price)}</Text>
                                </View>
                            </View>

                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={astrologerPoojaData} renderItem={renderItem} initialNumToRender={10} />
        )
    }
}

const mapStateToProps = state => ({
    astrologerPoojaData: state.astromall.astrologerPoojaData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredPooja)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.5,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        elevation: 5,
        alignSelf: 'center',
    }
})