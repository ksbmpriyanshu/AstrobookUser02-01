import React,{useRef,useState,useEffect} from 'react';
import { View, StyleSheet,BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import {api_astrolist1, api_url, colors, fonts,api2_get_profile} from '../../config/Constants1';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import {CommonActions} from '@react-navigation/native';
import { resetToScreen } from '../../navigations/NavigationServices';

const PhonepeView = (props) => {
    const { url } = props.route.params;
    console.log('url',url);
   
    const [isLoading, setIsLoading] = useState(false);
    const webViewRef = useRef(null);

    useEffect(() => {
        const handleBackButton = () => {
          gohome();
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      
        return () => {
          backHandler.remove();
        };
      }, []);

    const handleMessage = (event) => {
        const message = event.nativeEvent.data;
        console.log(message);

       
        if(message === 'navigateToWallet') {
          console.log('Navigate to wallet');
          gohome();
            
        } else if(message === 'navigateToHome') {
          console.log('Navigate to home');
          go_home();
        }
    };

    const go_home = () => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'home',
              state: {
                routes: [
                  {name: 'home2', params: {flag: props.route.params?.flag}},
                ],
              },
            },
          ],
        }),
      );
    };

    const gohome = async () => {
      // Dispatch the action to get customer data
      
      // Add a 2-second delay before navigating to the home screen
      setTimeout(() => {
          props.dispatch(CustomerActions.getCustomerData());
          resetToScreen('home');
      }, 2000); // 2000 milliseconds = 2 seconds
  };
  

    

    

    return (
        <View style={styles.container}>
        <MyLoader isVisible={isLoading} />
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                onMessage={handleMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PhonepeView);
