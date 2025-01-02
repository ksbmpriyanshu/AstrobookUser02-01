import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import MyHeader from '../../components/MyHeader';
import { colors } from '../../config/Constants1';

const {width, height} = Dimensions.get('screen');

const NumerologyForU = props => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title="Numerology For You"
          socialIcons={false}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  const data1 = props.route.params.data;

  console.log('res==', data1);
  console.log('res==', data1);

  //   const ProductCard = ({data1.getNumeroTable, index}) => {
  //     return (
  //       <View>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.name}</Text>
  //           <Text style={styles.name}>Name</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.date}</Text>
  //           <Text style={styles.name}>Birth Dtae</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.evil_num}</Text>
  //           <Text style={styles.name}>Evil Number</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.fav_color}</Text>
  //           <Text style={styles.name}>Favourable Number</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.fav_substone}</Text>
  //           <Text style={styles.name}>Genstone</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.fav_day}</Text>
  //           <Text style={styles.name}>Favourable Days</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.friendly_num}</Text>
  //           <Text style={styles.name}>Friendly number</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.fav_god}</Text>
  //           <Text style={styles.name}>Favourable God</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.fav_metal}</Text>
  //           <Text style={styles.name}>Friendly-Metal</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.card]} key={index}>
  //           <Text style={styles.name}>{data1.radical_ruler}</Text>
  //           <Text style={styles.name}>Ruling Planet</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };

  return (
    <View style={{flex: 1}}>
      <View style={styles.horizontalView}>
        <View style={styles.card2}>
          <Text style={[styles.name, {color: colors.red_color1}]}>
            {data1.radical_number}
          </Text>
          <Text style={[styles.name, {marginTop: 10}]}>Radical Number</Text>
        </View>
        <View style={styles.card2}>
          <Text style={[styles.name, {color: 'blue'}]}>
            {data1.destiny_number}
          </Text>
          <Text style={[styles.name, {marginTop: 10}]}>Destiny Number</Text>
        </View>
        <View style={styles.card2}>
          <Text style={[styles.name, {color: colors.red_color1}]}>
            {data1.name_number}
          </Text>
          <Text style={[styles.name, {marginTop: 10}]}>Name{'\n'} Number</Text>
        </View>
      </View>

      <ScrollView style={{paddingBottom: height * 0.1}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.background_theme2}]}>
              {data1.name}
            </Text>
            <Text style={styles.name}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.background_theme2}]}>
              {data1.date}
            </Text>
            <Text style={styles.name}>Birth Date</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.green_color1}]}>
              {data1.evil_num}
            </Text>
            <Text style={styles.name}>Evil Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.green_color1}]}>
              {data1.fav_color}
            </Text>
            <Text style={styles.name}>Favourable colour</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: 'blue'}]}>
              {data1.fav_substone}
            </Text>
            <Text style={styles.name}>Gemstone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: 'blue'}]}>
              {data1.fav_day}
            </Text>
            <Text style={styles.name}>Favourable Days</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.red_color1}]}>
              {data1.friendly_num}
            </Text>
            <Text style={styles.name}>Friendly number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: colors.red_color1}]}>
              {data1.fav_god}
            </Text>
            <Text style={styles.name}>Favourable God</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: 'brown'}]}>
              {data1.fav_metal}
            </Text>
            <Text style={styles.name}>Friendly-Metal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card]}>
            <Text style={[styles.name, {color: 'brown'}]}>
              {data1.radical_ruler}
            </Text>
            <Text style={styles.name}>Ruling Planet</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            height: height * 0.11,
            margin: 10,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.name, {color: 'orange'}]}>
            {data1.fav_mantra}
          </Text>
          <Text style={styles.name}>Mantra</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* <Text style={styles.name}>{data1.fav_mantra}</Text> */}
    </View>
  );
};

export default NumerologyForU;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: width * 0.45,
    borderRadius: 10,
    overflow: 'hidden',
    height: height * 0.16,
    margin: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card2: {
    backgroundColor: '#fff',
    width: width * 0.28,
    borderRadius: 10,
    overflow: 'hidden',
    height: height * 0.15,
    margin: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalView: {
    flexDirection: 'row', // Display the three views in a row
    justifyContent: 'space-between', // Space between the three views
    marginBottom: 10, // Add margin for separation
  },
  name: {
    fontSize: 16,
    bottom: 10,
    textAlign: 'center',
    color: colors.black_color,
    fontWeight: '600',
    width: '100%',
  },
});
