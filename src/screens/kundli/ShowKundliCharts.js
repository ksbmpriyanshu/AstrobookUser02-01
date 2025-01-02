import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Colors, Fonts, Sizes } from '../../assets/style';
import MyStatusBar from '../../components/MyStatusbar';
import ShowSvg from './components/ShowSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import * as KundliActions from '../../redux/actions/KundliActions'
import { SvgXml } from 'react-native-svg';




const ShowKundliCharts = ({ navigation, chartImage, dispatch, isLoading }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('chalit');
  const [show ,setShow] = useState(false);
  console.log("charty-img",chartImage)

 
  useEffect(()=>{
    if(chartImage) {
      setShow(true);
    }
  },[chartImage])

  useEffect(() => {
    
    const payload ={
      lang: t('lang'),
      data: 'chalit'
    }
    dispatch(KundliActions.getKundliChartimage(payload))
  }, [dispatch])
  const charts = [
    { label: t('chalit'), value: 'chalit' },
    { label: t('moon'), value: 'MOON' },
    { label: t('sun'), value: 'SUN' },
    { label: t('birth'), value: 'D1' },
    { label: t('horo'), value: 'D2' },
    { label: t('dreshkan'), value: 'D3' },
    { label: t('chathurthamasha'), value: 'D4' },
    { label: t('panchmansha'), value: 'D5' },
    { label: t('saptamansha'), value: 'D7' },
    { label: t('ashtamansha'), value: 'D8' },
    { label: t('navamansha'), value: 'D9' },
    { label: t('dashamansha'), value: 'D10' },
    { label: t('dwadashamsha'), value: 'D12' },
    { label: t('shodashamsha'), value: 'D16' },
    { label: t('vishamansha'), value: 'D20' },
    { label: t('chaturvimshamsha'), value: 'D24' },
    { label: t('bhamsha'), value: 'D27' },
    { label: t('trishamansha'), value: 'D30' },
    { label: t('khavedamsha'), value: 'D40' },
    { label: t('akshvedansha'), value: 'D45' },
    { label: t('shashtymsha'), value: 'D60' },
  ]

  const xml = '<svg width="350" height="350" xmlns="http://www.w3.org/2000/svg"><g class="slice"><path d="M10 10h165L92.5 92.5 10 10m165 0h165l-82.5 82.5L175 10M92.5 92.5 10 175V10" stroke="#000" fill="none"/><path d="M92.5 92.5 175 175l82.5-82.5L175 10m82.5 82.5L340 175V10" stroke="#000" fill="none"/><path d="M92.5 92.5 175 175l-82.5 82.5L10 175m247.5-82.5L340 175l-82.5 82.5L175 175m-82.5 82.5L10 340V175" stroke="#000" fill="none"/><path d="m175 175 82.5 82.5L175 340l-82.5-82.5" stroke="#000" fill="none"/><path d="M92.5 257.5 175 340H10m247.5-82.5L340 340H175" stroke="#000" fill="none"/><text font-size="15">11</text><text font-size="15" x="171.7" y="161.8" style="fill:#000">5</text><text font-size="15" x="92.5" y="76" style="fill:#000">6</text><text font-size="15" x="67.75" y="99.1" style="fill:#000">7</text><text font-size="15" x="147.5" y="179.95" style="fill:#000">8</text><text font-size="15" x="64.4" y="265.75" style="fill:#000">9</text><text font-size="15" x="82.6" y="282.3" style="fill:#000">10</text><text font-size="15" x="168.4" y="199.8" style="fill:#000">11</text><text font-size="15" x="249.25" y="277.3" style="fill:#000">12</text><text font-size="15" x="274" y="257.5" style="fill:#000">1</text><text font-size="15" x="190.55" y="179.95" style="fill:#000">2</text><text font-size="15" x="274" y="97.45" style="fill:#000">3</text><text font-size="15" x="249.25" y="76" style="fill:#000">4</text><text font-size="14" x="165" y="97.5" style="fill:#000">Su </text><text font-size="14" x="142" y="97.5" style="fill:#000">Me </text><text font-size="14" x="185" y="97.5" style="fill:#000">Ve </text><text font-size="14" x="119" y="97.5" style="fill:#000">Sa </text><text font-size="14" x="82.5" y="175" style="fill:#000">Mo </text><text font-size="14" x="102.5" y="175" style="fill:#000">Ju </text><text font-size="14" x="82.5" y="30" style="fill:#000">Ma </text><text font-size="14" x="59.5" y="30" style="fill:#000">Ke </text><text font-size="14" x="247.5" y="330" style="fill:#000">Ra </text><path d="M340 175v165l-82.5-82.5" stroke="#000" fill="none"/></g></svg>';
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={colors.background_theme2} barStyle={'light-content'} />
      <MyHeader title={'Kundli Charts'} navigation={navigation} />
      <View>
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{ ...Fonts.black14InterMedium}}
          iconStyle={styles.iconStyle}
          data={charts}
          maxHeight={SCREEN_HEIGHT * 0.4}
          labelField="label"
          valueField="value"
          placeholder={'Select item'}
          value={value}
          onChange={item => {
            
            const payload ={
              lang: t('lang'),
              data: item?.value
            }

            setValue(item.value)
            dispatch(KundliActions.getKundliChartimage(payload))
            // setValue(item.data);
          }}

        />

      <View style={{ alignSelf: 'center' }}>
        {chartImage && <ShowSvg  data ={chartImage}/> }
        {/* {chartImage && show ? <SvgXml xml={chartImage} /> : <Text style={{color:'black'}}>No chart available</Text>} */}
      </View>

      </View>
    </View>
  );

};

const mapStateToProps = state => ({
  chartImage: state.kundli.chartImage,
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliCharts);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    ...Fonts.gray14RobotoMedium
  },
  selectedTextStyle: {
    fontSize: 16,
    ...Fonts.black14InterMedium
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

