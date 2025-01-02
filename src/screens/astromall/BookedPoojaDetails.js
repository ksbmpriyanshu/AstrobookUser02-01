import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Banner from './components/Banner'
import { base_url, img_url } from '../../config/constants'
import { Image } from 'react-native'
import ImageView from '../../components/ImageView'
import VedioPlayer from './components/VedioPlayer'
import VideoComponent from './components/VideoComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { showNumber } from '../../utils/services'
import { getFontSize } from '../../config/Constants1'
import moment from 'moment'

const BookedPoojaDetails = ({ route, navigation }) => {
    const poojaData = route?.params?.item
    console.log(poojaData,'pooja com data')
    const [state, setState] = useState({
        imageVisible: false,
        image: null,
        vedioUri: null,
        videoVisible: false,
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data }
            return newData
        })
    }

    const { image, imageVisible, vedioUri, videoVisible } = state
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={poojaData?.poojaId?.pujaName} navigation={navigation} />
                <FlatList
                    ListHeaderComponent={<>
                    {poojaName()}
                    {poojaImage()}
                    {poojaPrice()}
                    {poojaDescription()}
                    {poojaData?.status == 'COMPLETED' ? PoojaAstrologerDetails() : null}
                        {/* {poojaData && <Banner data={poojaData?.poojaId?.bannerImages} />} */}
                        {/* {productInfo()}
                        {descriptionInfo()}
                        {astroMessageInfo()}
                        {astrologerDetails()} */}
                        {photoGallaryInfo()}
                        {vedioGallaryInfo()}
                    </>}
                />
                {submitInfo()}
                <ImageView
                    updateState={updateState}
                    image={image}
                    imageVisible={imageVisible}
                />
                <VedioPlayer
                    videoVisible={videoVisible}
                    updateState={updateState}
                    uri={vedioUri}
                />
            </View>
        </View>
    )
    function PoojaAstrologerDetails() {
        return(
            <View>
                <Text style={{textAlign:'center',...Fonts.black18RobotoMedium,color:Colors.primaryLight}}>Astrologer</Text>
                <View style={{ margin: Sizes.fixPadding,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',borderBottomWidth:1,borderTopWidth:1,paddingVertical:Sizes.fixPadding }}>
                {/* <Text style={{ ...Fonts.black16RobotoMedium }}>Astrologer Details</Text> */}
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding }}
                 onPress={() =>
                    navigation.navigate('astrologerDetailes', {
                      _id: poojaData?.astrologerId?._id,
                     
                    })
                  }
                >
                    <Image source={{ uri: base_url + poojaData?.astrologerId?.profileImage }} style={{ width: SCREEN_WIDTH * 0.2, height: SCREEN_WIDTH * 0.2, borderRadius: 1000 }} />
                </TouchableOpacity>
                  <View style={{}}>
                    <Text style={{ ...Fonts.black16RobotoRegular, color: Colors.black }}>Name: {poojaData?.astrologerId?.astrologerName}</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular, color: Colors.black }}>Email: {poojaData?.astrologerId?.email}</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular, color: Colors.black }}>Date: {moment(poojaData?.poojaDate).format('YYYY-MM-DD ')}</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular, color: Colors.black }}>Time: {moment(poojaData?.poojaTime).format('hh:mm a ')}</Text>
                  </View>

                {/* <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Name: {poojaData?.astrologerId?.astrologerName}</Text> */}
            </View>
            </View>
        )
    }
    function poojaDescription() {
        return(
            <View style={{paddingVertical:Sizes.fixPadding,paddingHorizontal:Sizes.fixPadding * 2}}>
            <Text style={{...Fonts.black22RobotoMedium}}>Description</Text>
            <Text style={{...Fonts.black16RobotoRegular,fontSize:getFontSize(1.5)}}>{poojaData?.poojaId?.description}</Text>
        </View>
        )
    }
    function poojaPrice() {
        return(
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:Sizes.fixPadding}}>
                <Text style={{...Fonts.black18RobotoRegular}}>Puja Price</Text>
                <Text style={{...Fonts.black18RobotoRegular,marginLeft:Sizes.fixPadding,color:Colors.primaryLight}}>{showNumber(poojaData?.price)}</Text>
            </View>
        )
    }
    function poojaImage() {
        return(
            <View style={{alignSelf:'center'}}>
                <Image source={{uri: img_url + poojaData?.poojaId?.image}} style={{height:SCREEN_HEIGHT * 0.25,width :SCREEN_WIDTH * 0.95,borderRadius:10,}}/>
            </View>
        )
    }
    function poojaName() {
        return(
            <View style={{paddingVertical:Sizes.fixPadding,paddingHorizontal:Sizes.fixPadding * 2}}>
                <Text style={{...Fonts.black22RobotoMedium}}>{poojaData?.poojaId?.pujaName}</Text>
            </View>
        )
    }

    function submitInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} disabled  style={{ backgroundColor: Colors.primaryDark, paddingVertical: Sizes.fixPadding,width:SCREEN_WIDTH * 0.8,alignSelf:'center',borderRadius:100 }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>{poojaData?.status}</Text>
            </TouchableOpacity>
        )
    }

    function astroMessageInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Message received from Astrologer
                </Text>

                <Text style={{ ...Fonts.gray12RobotoMedium, color: Colors.blackLight }}>
                    {poojaData?.desc?.description}
                </Text>
            </View>
        );
    }

    function vedioGallaryInfo() {
        const renderItem = ({ item, index }) => {
            return <VideoComponent item={item} updateState={updateState} />;
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Videos
                </Text>
                <FlatList
                    data={poojaData?.videos}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                />
            </View>
        );
    }

    function photoGallaryInfo() {
        const renderItem = ({ item, index }) => {
            console.log(item,'photo data')
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        updateState({
                            image: base_url + item,
                            imageVisible: true,
                        })
                    }
                    style={{ width: '30%', height: 250 }}>
                    <Image
                        source={{ uri: base_url + item }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray14RobotoRegular, marginBottom: Sizes.fixPadding }}>
                    Photos
                </Text>
                <FlatList
                    data={poojaData?.images}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                />
            </View>
        );
    }

    function astrologerDetails() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Astrologer Details</Text>
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding }}
                 onPress={() =>
                    navigation.navigate('astrologerDetailes', {
                      _id: poojaData?.astrologerId?._id,
                     
                    })
                  }
                >
                    <Image source={{ uri: base_url + poojaData?.astrologerId?.profileImage }} style={{ width: SCREEN_WIDTH * 0.2, height: SCREEN_WIDTH * 0.2, borderRadius: 1000 }} />
                </TouchableOpacity>

                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Name: {poojaData?.astrologerId?.astrologerName}</Text>
            </View>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.poojaId?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaId?.poojaName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.poojaId?.type}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BookedPoojaDetails)