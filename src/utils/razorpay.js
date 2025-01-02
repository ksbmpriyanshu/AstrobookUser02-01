import RazorpayCheckout from 'react-native-razorpay';
import { postRequest } from './apiRequests';
import { api_url, create_razorpay_order, razorpay_key } from '../config/constants';
import { showToastMessage } from './services';
import { Colors } from '../assets/style';

export const razorpayPayment = async ({ amount = 0, email = '', contact = '', name = '' }) => {
    try {

        const orderResponse = await postRequest({
            url: api_url + create_razorpay_order,
            data: {
                amount
            }
        }) 
        console.log(contact,'thisiscontact')

        if (!orderResponse?.status) {
            showToastMessage({ message: 'Payment Failed' })
            return
        }

        var options = {
            description: 'Credits towards consultation',
            // image: 'https://admin.astrofriends.in/static/media/astro-booster.ed9b4cb4dea264965dba.png',
            currency: 'INR',
            key: razorpay_key, // Your api key
            amount: orderResponse?.data?.amount,
            order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryDark }
        }

        const response = await RazorpayCheckout.open(options)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
} 