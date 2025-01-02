import PhonePePaymentSDK from 'react-native-phonepe-pg'
import base64 from 'react-native-base64';
import sha256 from 'sha256';
import * as CustomerActions from '../redux/actions/CustomerActions';

const merchantId = 'ASTROREAONLINE';
const appId = null;
const environmentDropDownValue = 'PRODUCTION';

// Wallet
export const PhonepeWallet = async ({ orderId = '', customerId = '' , amount = '', phone = '' , dispatch }) => {
    console.log('order',orderId, amount,customerId,phone)
        PhonePePaymentSDK.init(
        environmentDropDownValue,
        merchantId,
        appId,
        false
      ).then(result => {
        // setMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
        if(result) {
         const data =  {
            merchantId: merchantId,
            merchantTransactionId: orderId,
            merchantUserId: customerId,
            amount: amount * 100,
            callbackUrl: "https://api.astrobook.co.in/customers/callbackPhonepe",
            mobileNumber: phone,
            paymentInstrument: {
              type: "PAY_PAGE"
            }
          }
  
          const salt_key = "79c3544b-a336-4594-9164-8588a51427a1";
          const salt_Index = "1";
          const payload = JSON.stringify(data);
          const payload_main = base64.encode(payload);
          const string = payload_main+"/pg/v1/pay"+salt_key;
          const checksum = sha256(string)+"###"+salt_Index;
  
          PhonePePaymentSDK.startTransaction(
            payload_main,
            checksum,
            null,
            null
          ).then(res => {
            console.log('Result ',res);
            dispatch(CustomerActions.getCustomerData());
            dispatch(CustomerActions.goToHome());
            return true;
          }).catch(err => {
            console.log('Error',err);
            return false;
          })
        }
      }).catch(error => {
        console.log("error:" + error.message);
        return false;
      })
}

//Mall
export const PhonepeMall = async ({ orderId = '', customerId = '' , amount = '', phone = '' , dispatch }) => {
  console.log('order',orderId, amount,customerId,phone)
      PhonePePaymentSDK.init(
      environmentDropDownValue,
      merchantId,
      appId,
      false
    ).then(result => {
      // setMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
      if(result) {
       const data =  {
          merchantId: merchantId,
          merchantTransactionId: orderId,
          merchantUserId: customerId,
          amount: amount * 100,
          callbackUrl: "https://api.astrobook.co.in/ecommerce/order_product_callback",
          mobileNumber: phone,
          paymentInstrument: {
            type: "PAY_PAGE"
          }
        }

        const salt_key = "79c3544b-a336-4594-9164-8588a51427a1";
        const salt_Index = "1";
        const payload = JSON.stringify(data);
        const payload_main = base64.encode(payload);
        const string = payload_main+"/pg/v1/pay"+salt_key;
        const checksum = sha256(string)+"###"+salt_Index;

        PhonePePaymentSDK.startTransaction(
          payload_main,
          checksum,
          null,
          null
        ).then(res => {
          console.log('Result ',res);
          dispatch(CustomerActions.getCustomerData());
          dispatch(CustomerActions.goToHome());
          return true;
        }).catch(err => {
          console.log('Error',err);
          return false;
        })
      }
    }).catch(error => {
      console.log("error:" + error.message);
      return false;
    })
}

// Puja
export const PhonepePuja = async ({ orderId = '', customerId = '' , amount = '', phone = '' , dispatch }) => {
  console.log('order',orderId, amount,customerId,phone)
      PhonePePaymentSDK.init(
      environmentDropDownValue,
      merchantId,
      appId,
      false
    ).then(result => {
      // setMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
      if(result) {
       const data =  {
          merchantId: merchantId,
          merchantTransactionId: orderId,
          merchantUserId: customerId,
          amount: amount * 100,
          callbackUrl: "https://api.astrobook.co.in/customers/callbackPhonepe",
          mobileNumber: phone,
          paymentInstrument: {
            type: "PAY_PAGE"
          }
        }

        const salt_key = "79c3544b-a336-4594-9164-8588a51427a1";
        const salt_Index = "1";
        const payload = JSON.stringify(data);
        const payload_main = base64.encode(payload);
        const string = payload_main+"/pg/v1/pay"+salt_key;
        const checksum = sha256(string)+"###"+salt_Index;

        PhonePePaymentSDK.startTransaction(
          payload_main,
          checksum,
          null,
          null
        ).then(res => {
          console.log('Result ',res);
          dispatch(CustomerActions.getCustomerData());
          dispatch(CustomerActions.goToHome());
          return true;
        }).catch(err => {
          console.log('Error',err);
          return false;
        })
      }
    }).catch(error => {
      console.log("error:" + error.message);
      return false;
    })
}
