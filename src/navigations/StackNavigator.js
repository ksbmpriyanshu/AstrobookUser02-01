import { View, Text } from 'react-native';
import React from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/auth/Login';
import CustomerLogin from '../screens/CustomerLogin';
import Signup from '../screens/auth/Signup';
import DrawerNavigator from './DrawerNavigator';
import Logout from '../screens/Logout';
import Otp from '../screens/auth/Otp';
import AstrologerLIst from './AstrologerLIst';
import AstrologerDetailes from '../screens/astrologers/AstrologerDetailes';
import AllRemedies from '../screens/customer/AllRemedies';
import Wallet from '../screens/payments/Wallet';
import BillHistory from '../screens/customer/BillHistory';
import CustomerOrderHistory from '../screens/customer/CustomerOrderHistory';
import Following from '../screens/customer/Following';
import HowUse from '../screens/blogs/HowUse';
import AskAstrologer from '../screens/customer/AskAstrologer';
import Testimonials from '../screens/customer/Testimonials';
import HelpSupport from '../screens/customer/HelpSupport';
import Setting from '../screens/customer/Setting';
import Kundli from '../screens/kundli/Kundli';
// import Matching from './Matching';
import SelectSign from '../screens/customer/SelectSign';
import TotalCard from './TotalCard';
import ChatIntakeForm from '../screens/chat/ChatIntakeForm';
import PlaceOfBirth from '../screens/PlaceOfBirth';
import ChatPickup from '../screens/chat/ChatPickup';
import CustomerChat from '../screens/chat/CustomerChat';
import CallIntakeForm from '../screens/customer/CallIntakeForm';
import ChatRating from '../screens/customer/ChatRating';
import ChatInvoice from '../screens/customer/ChatInvoice';
import AstroDateRegister from '../screens/customer/AstroDateRegister';
import AstroAccount from '../screens/customer/AstroAccount';
import ChoosePlan from '../screens/customer/ChoosePlan';
import ConnectWithFriends from './ConnectWithFriends';
import ShowKundli from '../screens/kundli/ShowKundli';
import KundliMatch from '../screens/kundli/KundliMatch';
import ShowHoroscope from '../screens/customer/ShowHoroscope';
import TarotCard from '../screens/customer/TarotCard';
import OneCardReading from '../screens/customer/OneCardReading';
import CustomerAccount from '../screens/auth/CustomerAccount';
import UserGuide from '../screens/customer/UserGuide';
import BlogDetailes from '../screens/customer/BlogDetailes';
import RecommendedProfile from '../screens/customer/RecommendedProfile';
import CallInvoice from '../screens/customer/CallInvoice';
import Notifications from '../screens/customer/Notifications';
import NotificationDetailes from '../screens/customer/NotificationDetailes';
import AstrodateChat from '../screens/customer/AstrodateChat';
import AstroLive from '../screens/customer/AstroLive';
import editkundli from '../screens/customer/editkundli';
import CallRating from '../screens/customer/CallRating';
import PhoneView from '../screens/customer/PhoneView';
import HowToScreenshots from '../screens/blogs/HowToScreenshots';
import HowToVideo from '../screens/blogs/HowToVideo';
import ViewRemedies from '../screens/customer/ViewRemedies';
// import downloadKundli from './DownloadKundli';
import Webpage from '../screens/customer/Webpage';
import AddNote from '../screens/customer/AddNote';
import HomeNotes from '../screens/customer/HomeNotes';
import Trash from '../screens/customer/Trash';
import UpdateNote from '../screens/customer/UpdateNote';
import Religion from '../screens/blogs/Religion';
import DailyPanchang from '../screens/blogs/DailyPanchang';
import BirhatHoroscope from '../screens/blogs/BirhatHoroscope';
import Magazine from '../screens/blogs/Magazine';
import Remedies from '../screens/blogs/Remedies';
import Language from '../screens/language/language';
import YellowBook from '../screens/customer/YellowBook';
import AuspicionsTime from '../screens/customer/AuspicionsTime';
import AskQuestion from '../screens/customer/AskQuestions';
import { useTranslation } from 'react-i18next';
import ShowPachang from '../screens/kundli/ShowPachang';
import GiftOrderHistory from '../screens/customer/GiftOrderHistory';
import GoLive from '../screens/customer/GoLive';
import WalletGST from '../screens/customer/WalletGST';
import WalletGstAmount from '../screens/payments/WalletGstAmount';
import WalletGstOffer from '../screens/customer/WalletGstOffer';
import AstroBlogsRedirect from '../screens/customer/AstroBlogsRedirect';
import Year from '../screens/home/Year';
import YearDoucments from '../screens/customer/YearDocuments';
import LiveScreen from '../screens/live/LiveScreen';
import LiveChatCall from '../screens/history/LiveChatCall';
import WalletHistroy from '../screens/history/WalletHistroy';
import ShowKundliBasic from '../screens/kundli/ShowKundliBasic';
import ShowKundliCharts from '../screens/kundli/ShowKundliCharts';
import ShowKundliPlanets from '../screens/kundli/ShowKundliPlanets';
import ShowKundliKpPlanets from '../screens/kundli/ShowKundliKpPlanets';
import ShowKundliKpHouseCusp from '../screens/kundli/ShowKundliKpHouseCusp';
import ShowDashna from '../screens/kundli/ShowDashna';
import HouseReport from '../screens/kundli/HouseReport';
import KundliBirthDetailes from '../screens/kundli/KundliBirthDetailes';
import NewMatching from '../screens/kundli/NewMatching';
import AstrologerSignUp from '../screens/auth/AstrologerSignUp';
import ProductCategory from '../screens/ecommerce/ProductCategory';
import Products from '../screens/ecommerce/Products';
import ProductDetails from '../screens/ecommerce/ProductDetails';
import Cart from '../screens/ecommerce/Cart';
import AstromallCategory from '../screens/astromall/AstromallCategory';
import PoojaDetails from '../screens/astromall/PoojaDetails';
import RegisteredPooja from '../screens/astromall/RegisteredPooja';
import AstromallHistroy from '../screens/astromall/AstromallHistroy';
import BookedPoojaDetails from '../screens/astromall/BookedPoojaDetails';
import Panchange from './Panchange';
import Ashtakvarga from '../screens/kundli/Ashtakvarga';
import Sarvastak from '../screens/kundli/Sarvastak';
import AscedentReport from '../screens/kundli/AscedentReport';
import BasicPanchang from '../screens/kundli/BasicPanchang';
import Numerologynavigation from './Numerologynavigation';
import MatchReport from '../screens/customer/showkundli/Matching/MatchReport';
import Dashakoota from '../screens/customer/showkundli/Matching/Dashakoota';
import Conclusion from '../screens/customer/showkundli/Matching/Conclusion';
import BasicMatching from '../screens/customer/showkundli/Matching/BasicMatching';
import RashiReport from '../screens/kundli/RashiReport';
import BasicAstro from '../screens/customer/showkundli/Matching/BasicAstro';
import Chart from '../screens/customer/showkundli/Matching/Chart';
import Ascendent from '../screens/customer/showkundli/Matching/Ascendent';
import ProductHistory from '../screens/ecommerce/ProductHistory';
import AstroBlogs from '../screens/customer/AstroBlogs';
import Numerology from '../screens/kundli/Numerology';
import NumerologyForU from '../screens/kundli/NumerologyForU';
import NewMatching1 from '../screens/kundli/Match/NewMatching1';
import Matching1 from './Matching1';
import PlaceOfBirth2 from '../screens/kundli/Match/PlaceOfBirth2';
import daily from '../screens/customer/horoscope/daily';
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import OrderHisory from '../screens/history/OrderHisory';
import Productfull from '../screens/history/Productfull';
// import Poojainfo from '../screens/pooja/Poojainfo';
import VideocallInvoice from '../screens/chat/components/VideocallInvoice';
import AstroForVideo from '../screens/astrologers/AstroForVideo';
// import PoojaListDetails from '../screens/pooja/PoojaListDetails';
import PoojaDetails2 from '../screens/pooja/PoojaDetails2';
import PoojaStatus from '../screens/pooja/PoojaStatus';
import PaymentModal from '../Modal/PaymentModal';
import Address from '../screens/ecommerce/Address';
import AddAddress from '../screens/ecommerce/AddAddress';
import AstrologyBlog from '../screens/AstrologyBlog';
import BlogDescription from '../screens/BlogDescription';
import AstroBookHeader from '../components/AstroBookHeader';
import PoojaCategory from '../screens/pooja/PoojaCategory';
import BookingPuja from '../screens/pooja/BookingPuja';
import PujaHistory from '../screens/pooja/PujaHistory';
import Search from '../screens/Search';


const Stack = createNativeStackNavigator();

const StackNavigator = (data, data1) => {
  const { t } = useTranslation();
  return (
    // data?.data1?.redirect_app
    <Stack.Navigator initialRouteName={data?.data1?.redirect_app}>
      <Stack.Screen name="splash">
        {props => <Splash {...props} data={data} data1={data1} />}
      </Stack.Screen>
      {/* <Stack.Screen name="kundali" options={{ headerShown: false }}>
      {(props) => <KundliProvider {...props} data={data} data1={data1} />}
        </Stack.Screen>
        <Stack.Screen name="Chat_request">
      {(props) => <ProviderChatPickup {...props} data={data} data1={data1} />}
        </Stack.Screen> */}
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="customerLogin" component={CustomerLogin} />
      <Stack.Screen name="signup" component={Signup} />
      

      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="astrologerSignUp" component={AstrologerSignUp} />
        <Stack.Screen name="home" component={DrawerNavigator} />
        <Stack.Screen name="liveScreen" component={LiveScreen} />
        <Stack.Screen name="showKundli" component={ShowKundli} />
        <Stack.Screen name="kundliBasicDetails" component={ShowKundliBasic} />
        <Stack.Screen name="showKundliCharts" component={ShowKundliCharts} />
        <Stack.Screen name="showKundliPlanets" component={ShowKundliPlanets} />
        {/* <Stack.Screen name="poojainfo" component={Poojainfo} /> */}
        <Stack.Screen name="PoojaDetails2" component={PoojaDetails2} />
        <Stack.Screen name="PoojaStatus" component={PoojaStatus} />
        <Stack.Screen name="PaymentModal" component={PaymentModal} />
        
        <Stack.Screen
          name="showKundliKpPlanets"
          component={ShowKundliKpPlanets}
        />
        <Stack.Screen
          name="showKundliKpHouseCusp"
          component={ShowKundliKpHouseCusp}
        />
        <Stack.Screen name="showDashna" component={ShowDashna} />
        <Stack.Screen name="houseReport" component={HouseReport} />
        <Stack.Screen name='rashiReport' component={RashiReport} />
        <Stack.Screen name='astakvarga' component={Ashtakvarga} />
        <Stack.Screen name='sarvastak' component={Sarvastak} />
        <Stack.Screen name='ascednt' component={AscedentReport} />
        <Stack.Screen name='bascipanchang' component={BasicPanchang} />
        <Stack.Screen name='numerology' component={Numerologynavigation} />
        <Stack.Screen name='basicmatch' component={BasicMatching} />
        <Stack.Screen name='conclusion' component={Conclusion} />
        <Stack.Screen name='dashakoota' component={Dashakoota} />
        {/* <Stack.Screen name='chart' component={Chart}/> */}
        <Stack.Screen name='matchreport' component={MatchReport} />
        <Stack.Screen name='numero' component={Numerology}/>
        <Stack.Screen name='NumerologyForU' component={NumerologyForU}/>
        <Stack.Screen
          name="kundliBirthDetailes"
          component={KundliBirthDetailes}
        />
        <Stack.Screen name="newMatching" component={NewMatching} />
        <Stack.Screen name="howUse" component={HowUse} />
        <Stack.Screen name="HowToScreenshots" component={HowToScreenshots} />
        <Stack.Screen name="HowToVideo" component={HowToVideo} />
        <Stack.Screen name="birhatHoroscope" component={BirhatHoroscope} />
        <Stack.Screen
          name="magazine"
          component={Magazine}
        // options={{title: t('astrokunj_magazine')}}
        />
        <Stack.Screen
          name="remedies"
          component={Remedies}
          options={{ title: t('remedies') }}
        />
        <Stack.Screen name='panchange' component={Panchange} />
        <Stack.Screen name="basciAstro" component={BasicAstro}/>
        <Stack.Screen name="chart"  component={Chart}/>
        <Stack.Screen name= "matchAsc" component={Ascendent}/>
        <Stack.Screen name="allRemedies" component={AllRemedies} />
        <Stack.Screen
          name="DailyPanchang"
          component={DailyPanchang}
          options={{ title: t('dp1') }}
        />
        <Stack.Screen
          name="yellowBook"
          component={YellowBook}
          options={{ title: t('yellow_book') }}
        />
        <Stack.Screen
          name="auspicions"
          component={AuspicionsTime}
          options={{ title: t('muhurat') }}
        />
        <Stack.Screen name="yeardocuments" component={YearDoucments} />
        <Stack.Screen name="productCategory" component={ProductCategory} />
        <Stack.Screen name="products" component={Products} />
        <Stack.Screen name='productHistory' component={ProductHistory} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name='astromallCategory' component={AstromallCategory} />
        <Stack.Screen name='poojaDetails' component={PoojaDetails} />
        <Stack.Screen name='registeredPooja' component={RegisteredPooja} />
        <Stack.Screen name='astromallHistroy' component={AstromallHistroy} />
        <Stack.Screen name='bookedPoojaDetails' component={BookedPoojaDetails} />
        <Stack.Screen name='BookingPuja' component={BookingPuja} />
      </Stack.Group>
      <Stack.Screen name="OrderHistory" component={OrderHisory} options={{headerShown: false}}/>
      <Stack.Screen name="productFull" component={Productfull} options={{headerShown: false}}/>
      <Stack.Screen name="GiftOrderHistory" component={GiftOrderHistory} />
      <Stack.Screen name="logout" component={Logout} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="astrologerList" component={AstrologerLIst} />
      <Stack.Screen name="astrologerDetailes" component={AstrologerDetailes} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="billHistory" component={BillHistory} />
     
      <Stack.Screen
        name="customerOrderHistory"
        component={CustomerOrderHistory}
      />
      <Stack.Screen name="following" component={Following} />
      <Stack.Screen
        name="goLive"
        component={GoLive}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newmatching" component={NewMatching1}/>
      <Stack.Screen name="matching" component={Matching1}/>

      <Stack.Screen name="askAstrologer" component={AskAstrologer} />
      <Stack.Screen name="testimonials" component={Testimonials} />
      <Stack.Screen name="helpSupport" component={HelpSupport}  options={{headerShown:false}}/>
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="kundli" component={Kundli} />
      {/* <Stack.Screen name="matching" component={Matching} /> */}
      <Stack.Screen name="selectSign" component={SelectSign} />
      <Stack.Screen name="totalCard" component={TotalCard} />

      <Stack.Screen name="placeOfBirth" component={PlaceOfBirth} />
      <Stack.Screen name='birthplace' component={PlaceOfBirth2}/>
      <Stack.Screen name="chatPickup" component={ChatPickup} />
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="customerChat"
          component={CustomerChat}
          options={{ gestureEnabled: false }}
        />
              <Stack.Screen name="chatIntakeForm" component={ChatIntakeForm} />
        <Stack.Screen name="liveChatCall" component={LiveChatCall} />
        <Stack.Screen name="walletHistroy" component={WalletHistroy} />
        <Stack.Screen
          name="religion"
          component={Religion}
        // options={{ title: t('religion1') }}
        />

      </Stack.Group>

      <Stack.Screen name="callIntakeForm" component={CallIntakeForm} />
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="chatRating" component={ChatRating} />
      <Stack.Screen
        name="chatInvoice"
        component={ChatInvoice}
        options={{ animation: 'fade', headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="astroDateRegister" component={AstroDateRegister} />
      <Stack.Screen name="astroAccount" component={AstroAccount} />
      <Stack.Screen name="choosePlan" component={ChoosePlan} />
      <Stack.Screen name="connectWithFriends" component={ConnectWithFriends} />
      <Stack.Screen name="kundliMatch" component={KundliMatch} />
      <Stack.Screen name="showHoroscope" component={ShowHoroscope} />
      <Stack.Screen name="tarotCard" component={TarotCard} />
      <Stack.Screen name="oneCardReading" component={OneCardReading} />
      <Stack.Screen name="customerAccount" component={CustomerAccount} />
      <Stack.Screen name="userGuide" component={UserGuide} />
      <Stack.Screen name="blogDetailes" component={BlogDetailes} />
      <Stack.Screen name="recommendedProfile" component={RecommendedProfile} />
      <Stack.Screen name='dailyhoro' component={daily}/>
      <Stack.Screen
        name="callInvoice"
        component={CallInvoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen
        name="notificationDetailes"
        component={NotificationDetailes}
      />
      <Stack.Screen name="astrodateChat" component={AstrodateChat} />

      {/* //Prvider  */}
      <Stack.Screen name="editkundli" component={editkundli} />
      <Stack.Screen name="callRating" component={CallRating} />
      <Stack.Screen
        name="phoneView"
        component={PhoneView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ViewRememdies" component={ViewRemedies} />
      {/* <Stack.Screen name="DownloadKundali" component={downloadKundli} /> */}
      <Stack.Screen name="Webpage" component={Webpage} />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{ title: 'New note' }}
      />
      <Stack.Screen
        name="Notes"
        component={HomeNotes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateNote"
        component={UpdateNote}
        options={{ title: 'Note' }}
      />

      <Stack.Screen
        name="askQuestion"
        component={AskQuestion}
        options={{ title: t('ask_a_question') }}
      />
      <Stack.Screen name="language" component={Language} options={{headerShown:false}}/>
      <Stack.Screen name="astrolive" component={AstroLive} />
      <Stack.Screen name="showPachang1" component={ShowPachang} />
      <Stack.Screen name="walletgst" component={WalletGST} />
      <Stack.Screen name="WalletGstAmount" component={WalletGstAmount} />
      <Stack.Screen name="walletgstoffer" component={WalletGstOffer} />
      <Stack.Screen name="astroBlogsRedirect" component={AstroBlogsRedirect} />
      <Stack.Screen name="year" component={Year} />
      <Stack.Screen name='astroBlog' component={AstroBlogs}/>
      <Stack.Screen name='VideoInvoice' component={VideocallInvoice} options={{ headerShown: false }}/>
      <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="Addaddress" component={AddAddress} options={{ headerShown: false }}/>
      <Stack.Screen name="AstrologyBlog" component={AstrologyBlog} options={{ headerShown: false }}/>
      <Stack.Screen name="BlogDescription" component={BlogDescription} options={{ headerShown: false }}/>
      <Stack.Screen name="poojacategory" component={PoojaCategory} options={{ headerShown: false }}/>
      <Stack.Screen name="PujaHistory" component={PujaHistory} options={{ headerShown: false }}/>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;

// vDyrZdnqcvTtYK8F9BlDDDFWTaF2
