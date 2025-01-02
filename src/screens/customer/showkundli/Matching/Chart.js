import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';

import { colors } from '../../../../config/Constants1';

import MyLoader from '../../../../components/MyLoader';
import ShowSvg from '../../../kundli/components/ShowSvg';
import {SvgXml,SvgWithCss } from 'react-native-svg';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';

const data = [
    { label: 'Saptamansha', value: '1',name: 'D7' },
    { label: 'Navamansha', value: '2',name: 'D1' },
   
  ];

const Saptamansha = ({dispatch,Saptamanshachart, Navamanshachart, navigation}) => {

  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [chartData1, setChartData1] = useState(null);
  
  const [show,setShow] = useState('1');
  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    console.log(Saptamanshachart,'chart-data ')

    useEffect(() => {
     
      dispatch(KundliActions.getSaptmashaChart());
      dispatch(KundliActions.getNavmashaChart());
  },[]);

  console.log('dfasdf',Navamanshachart);

  return (
    <View style={{flex: 1}}>
      <MyLoader isVisible={isLoading} />
      <MyHeader title={'Chart'} navigation={navigation} />
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.containerStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          itemTextStyle={{color:'black'}}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => setShow(1)}
                    style={{ backgroundColor: show == 1 ? 
                    colors.background_theme2 : colors.background_theme1, margin: 10, padding: 10, borderRadius: 5,borderWidth: show == 1 ? 0 : 1 }}>
                    <Text style={{ color: show == 1 ? 'white' : 'black' }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShow(2)}
                    style={{ backgroundColor: show == 2 ? 
                        colors.background_theme2 : colors.background_theme1, margin: 10, padding: 10, borderRadius: 5,borderWidth: show == 2 ? 0 : 1 }}>
                    <Text style={{  color: show == 2 ? 'white' : 'black' }}>Female</Text>
                </TouchableOpacity>
            </View>
            {Saptamanshachart && Navamanshachart && (
        value == '1' ? (
          show === 1 ? <ShowSvg data={Saptamanshachart?.chartResponseMA} />  : <ShowSvg data={Saptamanshachart?.chartResponseFA} />
        ) : (
          show === 1 ? <ShowSvg data={Navamanshachart?.chartResponseM} /> : <ShowSvg data={Navamanshachart?.chartResponseF} />
        )
      )}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      color:'black'
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      color:'black'
    },
    icon: {
      marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
        color:'black'
      },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      color:'black'
    },
    placeholderStyle: {
      fontSize: 16,
      color:'black'
    },
    selectedTextStyle: {
      fontSize: 16,
      color:colors.background_theme2
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:'black'
    },
    containerStyle: {
        color:'black'
    }
  });

  const mapStateToProps = state => ({
    BasicAstroMatching:state.kundli.BasicAstroMatching,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
    Saptamanshachart: state.kundli.Saptamanshachart,
    Navamanshachart: state.kundli.Navamanshachart,

  })
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Saptamansha);
