import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  StyleSheet,
  PixelRatio,
  Image
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AstroCallList from '../screens/customer/AstroCallList';
import AstroChatList from '../screens/customer/AstroChatList';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useEffect} from 'react';
import {api_astrolist1, api_url, colors, fonts,get_remedies,img_url} from '../config/Constants1';
import MyStatusBar from '../components/MyStatusbar';
import MyLoader from '../components/MyLoader';
import {useState} from 'react';
import axios from 'axios';
import {PickerIOS} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import * as AstrologerActions from '../redux/actions/AstrologerActions';
import {astrologer_experties} from '../config/data';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const AstrologerLIst = props => {
  const {t} = useTranslation();
  const [astoListData, setAstroListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [remedies, setRemedies] = useState(null);
  const [remediescolor,setRemediesColor] = useState(null);
  const routename = props.route.params.routename;
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => {
        return (
          <View>
            <MyStatusBar
              backgroundColor={colors.background_theme2}
              barStyle="light-content"
            />
            <View
              style={{
                flex: 0,
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 12,
                backgroundColor: colors.background_theme2,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.navigation.goBack()}
                style={{flex: 0.2}}>
                <Ionicons
                  name="arrow-back"
                  color={colors.black_color}
                  size={25}
                />
              </TouchableOpacity>
              <Text allowFontScaling={false}
                style={{
                  flex: 0.8,
                  fontSize: 16,
                  fontFamily: fonts.bold,
                  color: colors.black_color,
                }}>
                {t("astrologer_list")}
              </Text>
              {/* <TouchableOpacity
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  backgroundColor: colors.background_theme2,
                  padding: 6,
                  borderRadius: 15,
                }}>
                <Ionicons name="wallet" color={colors.black_color} size={15} />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.black_color,
                    fontFamily: fonts.medium,
                  }}>
                  ₹ 0.00
                </Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => setIsFilterOpen(!isFilterOpen)}
                style={{flex: 0.1, flexDirection: 'row'}}>
                <Ionicons
                  name="md-filter"
                  color={colors.background_theme1}
                  size={25}
                />
              </TouchableOpacity> */}
            </View>
            {isFilterOpen && (
              <PickerIOS
                selectedValue={filterBy}
                mode="dialog"
                selectionColor={colors.background_theme2 + '55'}
                itemStyle={{
                  color: colors.black_color8,
                  fontFamily: fonts.medium,
                  fontSize: 16,
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setFilterBy(itemValue);
                  setIsFilterOpen(false);
                  searchFilterFunctionByFilter(itemValue);
                }}
                style={{
                  width: '90%',
                  position: 'absolute',
                  top: height * 0.125,
                  borderRadius: 10,
                  backgroundColor: colors.background_theme1,
                  right: 0,
                }}>
                {astrologer_experties.map((item, index) => (
                  <PickerIOS.Item
                    key={item.id}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </PickerIOS>
            )}
          </View>
        );
      },
    });
  }, [search, isFilterOpen, filterBy]);

  useEffect(() => {
    get_astrologer();
    getremedies();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_astrologer();
      getremedies();
    }, [])
  );

  const [clickedItems, setClickedItems] = useState([]);

  const searchRemedies = (remediesId) => {
    // Toggle the clicked state for the remediesId
    console.log('=====================',remediesId);
    setClickedItems((prevClickedItems) => {
      if (prevClickedItems.includes(remediesId)) {
        // If already clicked, remove it from the clicked items
        return prevClickedItems.filter((id) => id !== remediesId);
      } else {
        // If not clicked, add it to the clicked items
        return [...prevClickedItems, remediesId];
      }
    });
  };

  const getremedies = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: api_url + get_remedies,
      data: {
        lang:t("lang")
      }
    }).then(res => {
      console.log('remedies', res.data.data);
      setRemedies(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  

  const get_astrologer = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + api_astrolist1,
    })
      .then(res => {
        setIsLoading(false);
          const records = res.data.records.filter(item => item.remedies.includes(props?.route?.params?.remediesID));
          setAstroListData(res.data.records);
          setMasterDataSource(res.data.records);
          props.dispatch(AstrologerActions.setAstrologerList(res.data.records));
       
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.shop_name
          ? item.shop_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setAstroListData(newData);
      props.dispatch(AstrologerActions.setAstrologerList(newData));
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setAstroListData(masterDataSource);
      props.dispatch(AstrologerActions.setAstrologerList(masterDataSource));
      setSearch(text);
    }
  };

  const searchremedies = text => {
    console.log('===============',text);
    setRemediesColor(text);
    if (text) {
      
      const newData = masterDataSource.filter(function (item) {
        
        const itemData = item.remedies.includes(text);
       
        return itemData;
         
      });
     
      setAstroListData(newData);
      props.dispatch(AstrologerActions.setAstrologerList(newData));
      setRemediesColor(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setAstroListData(masterDataSource);
      props.dispatch(AstrologerActions.setAstrologerList(masterDataSource));
      setRemediesColor(text);
    }
  }

  const getRemediesText = async (text) => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + api_astrolist1,
    })
      .then(res => {
        setIsLoading(false);
          const records = res.data.records.filter(item => item.remedies.includes(text));
          console.log(records);
          setAstroListData(records);
          props.dispatch(AstrologerActions.setAstrologerList(records));
          setRemediesColor(text);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const searchFilterFunctionByFilter = text => { 
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.mainexperties ? item.mainexperties : '-1';
        return itemData.includes(text);
      });
      console.log(newData);
      setAstroListData(newData);
      props.dispatch(AstrologerActions.setAstrologerList(newData));
      // setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setAstroListData(masterDataSource);
      props.dispatch(AstrologerActions.setAstrologerList(masterDataSource));
      // setSearch(text);
    }
  };

  const remedies_renderItems = ({ item, index }) => {
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => getRemediesText(item.remedies_id)}
          style={{...styles.panchangContainerRemedies,backgroundColor:item.remedies_id == remediescolor  ? '#e9c46a':'#fff'}}>
          <Image
            source={{ uri: img_url + 'remedies/' + item.icon }}
            style={{ width: 20, height: 20 }}
          />
          <Text allowFontScaling={false} style={styles.punchangText}>{item.title}</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
  
  return (
    <View style={{flex: 1}}>
      <MyLoader isVisible={isLoading} />
      <View
        style={{
          flex: 0,
          backgroundColor: colors.background_theme1,
          paddingVertical: 10,
        }}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 1000,
            borderWidth: 1,
          }}>
          <Ionicons name="search" color={colors.black_color6} size={22} />
          <TextInput
            value={search}
            placeholder={t("search")}
            placeholderTextColor={colors.black_color6}
            onChangeText={text => searchFilterFunction(text)}
            style={{
              width: '100%',
              fontFamily: fonts.medium,
              color: colors.black_color8,
              padding: 8,
            }}
          />
        </View>
        <View>
        {remedies && (
              <FlatList
                horizontal
                data={remedies}
                renderItem={remedies_renderItems}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 0,
                        height: height * 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: 14,
                          color: colors.black_color5,
                          fontFamily: fonts.medium,
                        }}>
                        No Data Available...
                      </Text>
                    </View>
                  );
                }}

              />
            )}
        </View>
      </View>
      {astoListData && (
        <Tab.Navigator initialRouteName={routename}>
          <Tab.Screen
            name="astroCallList"
            component={AstroCallList}
            initialParams={{astoListData: astoListData}}
            options={{unmountOnBlur: true}}
            listeners={({navigation}) => ({blur: () => get_astrologer()})}
            
          />
          <Tab.Screen
            name="astroChatList"
            component={AstroChatList}
            initialParams={{astoListData: astoListData}}
            options={{unmountOnBlur: true}}
            listeners={({navigation}) => ({blur: () => get_astrologer()})}
          />
        </Tab.Navigator>
      )}
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(null, mapDispatchToProps)(AstrologerLIst);

const styles = StyleSheet.create({
  panchangContainer: {
    width: width * 0.27,
    height: width * 0.27,
    backgroundColor: colors.background_theme1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 1 },
    shadowColor: colors.black_color4,
    shadowOpacity: 0.3,
    marginHorizontal: 7,
    marginTop: 5,
    elevation: 1,
    borderWidth:2,
    borderColor:colors.background_theme6,
    zIndex:10,
    overflow:'hidden'
  },

  panchangContainerRemedies: {
    
    backgroundColor: colors.background_theme1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 1 },
    shadowColor: colors.black_color4,
    shadowOpacity: 0.3,
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: colors.background_theme2,
    marginTop: 5,
    overflow:'hidden',
    elevation: 1,
    flexDirection:'row',
    padding:5
  },

  panchangContainerOur: {
    width: '100%',
    height: width * 0.1,
    backgroundColor: colors.background_theme1,
    borderRadius: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    shadowOffset: { width: 2, height: 1 },
    shadowColor: colors.black_color4,
    shadowOpacity: 0.3,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.background_theme6,
  },

  panchangImage: {
    width: 105,
    height: 105,
    resizeMode: 'contain',
    zIndex:-2,
    
  },
  panchangImageOur: {
    width: '100%',
    height: width * 0.3,
    justifyContent: 'center',
  },
  panchangImage1: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
  punchangText: {
    fontSize: PixelRatio.getFontScale() * 14,
    fontWeight: 'bold',
    fontFamily: fonts.medium,
    marginTop: 4,
    color: colors.background_theme6,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  containerTextOur: {
    flex: 1,
    marginBottom: 100,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    flexDirection: 'row',
  },

  punchangTextOur: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.medium,
    marginTop: 4,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  
}); 
