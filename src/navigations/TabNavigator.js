import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Consult from '../screens/Consult';
import Services from '../screens/Services';
import Article from '../screens/Article';
import Home from '../screens/home/Home';
import Hometab from '../screens/home/HomeTab';
import AstroForCall from '../screens/astrologers/AstroForCall';
import AstroForChat from '../screens/astrologers/AstroForChat';
import AstroBlogs from '../screens/customer/AstroBlogs';
import AstroLive from '../screens/customer/AstroLive';
import AstroDate from '../screens/customer/AstroDate';
import { colors, fonts, getFontSize } from '../config/Constants1';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import LiveList from '../screens/live/LiveList';
import { connect } from 'react-redux';
import * as AstrologerActions from '../redux/actions/AstrologerActions'
import AstroForVideo from '../screens/astrologers/AstroForVideo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../assets/style';
import AstrologyBlog from '../screens/AstrologyBlog';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const { t } = useTranslation();
  return (
    <View
      style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              label == 'astroForChat' ? styles.middleButton : styles.tabButton
            }
            >
            {label == 'home3' ? (
              <Image
                source={require('../assets/astrobookimages/home.png')}
                style={{ width: 25, height: 25,resizeMode:"contain" }}
              />
            ) : label == 'astroForCall' ? (
              <Image
                source={require('../assets/astrobookimages/tabphone.png')}
                style={{ width: 27, height: 27,resizeMode:"contain" }}
              />
            ) : label == 'astroForChat' ? (
              
                <Image
                  source={require('../assets/astrobookimages/tablive.png')}
                  style={{ width: 30, height: 30,resizeMode:"contain" }}
                />
            ) : label == 'astroLive' ? (
              <Image
                source={require('../assets/astrobookimages/tabchat.png')}
                style={{ width: 30, height: 30,resizeMode:"contain" }}
              />
            ) : (

              <Image
              source={require('../assets/astrobookimages/tabvideo.png')}
              style={{ width: 30, height: 30,resizeMode:"contain" ,}}
            />
            )
            }
            {/* {label != 'astroForChat' ? (
              <Text allowFontScaling={false}
                style={{
                  color: isFocused ? colors.background_theme2 : 'grey',
                  fontFamily: fonts.medium,
                  fontSize: getFontSize(1.4),

                }}>
                {label == 'home3'
                  ? t("home")
                  : label == 'astroForCall'
                    ? t("call")
                    : label == 'astroForChat'
                      ? t("live")
                      : label == 'astroLive'
                        ? t("chat")
                        : t("video")}
              </Text>
            ) : null} */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = (props) => {
  
  useEffect(() => {
    props?.dispatch(AstrologerActions.getLiveAstrologerData());
  }, [props.dispatch]);

  return (
    <Tab.Navigator
      initialRouteName={props.route.params?.flag == 1 ? 'astroDate' : 'home3'}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Tab.Screen name="home3" component={Home} />
      <Tab.Screen name="astroForCall" component={AstroForCall} />
      <Tab.Screen name="astroForChat" component={LiveList} />
      <Tab.Screen name="astroLive" component={AstroForChat} />
      {/* <Tab.Screen name="astroblogs" component={AstroBlogs} /> */}
      <Tab.Screen name="AstrologyBlogs" component={AstrologyBlog} />
    </Tab.Navigator>
  );
};

const mapStateToProps = state =>({
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white_color,
    
    shadowColor: colors.background_theme2,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.3,
    paddingHorizontal: 5,
    borderWidth:0.2, borderColor:'lightgrey'
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
  middleButton: {
    flex: 0,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    backfaceVisibility: 'hidden',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowColor: colors.black_color8,
    shadowOpacity: 0.3,
  },
});
