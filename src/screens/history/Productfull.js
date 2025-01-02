import { Image, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { Colors } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { img_url } from '../../config/constants';
import { showNumber } from '../../utils/services';

const Productfull = ({ navigation, route }) => {
    const orderData = route.params; // Expecting an array of orders
    const order = orderData; // Assuming you want to display the first order
    console.log(order,'oo')

    const formatTime = (isoDate) => {
        const date = new Date(isoDate);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesFormatted} ${period}`;
    };

    const getStatusColor = (status) => {
        const statusColors = {
            INITIATED: '#007bff',
            ACCEPTED: '#28a745',
            REJECTED: '#dc3545',
            PACKED: '#ffc107',
            OUT_FOR_DELIVERY: '#17a2b8',
            DELIVERED: '#28a745',
            CANCELLED: '#6c757d',
        };
        return statusColors[status] || '#ffffff';
    };

    const renderOrderCreated = () => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.statusText}>Order Created</Text>
                <Text style={styles.statusText}>{moment(order?.createdAt).format('MMMM Do YYYY')}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.statusText}>Order Time</Text>
                <Text style={styles.value}>{formatTime(order?.createdAt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.statusText}>Order Status</Text>
                <Text style={{ color: getStatusColor(order?.status) }}>{order?.status}</Text>
            </View>
        </View>
    );

    const renderProducts = () => (
        <View style={styles.card}>
            <Text style={styles.statusText}>Products</Text>
            {order?.products?.map((product, index) => {
                console.log(product,'pm')
                return(
                <View key={index} style={styles.row}>
                    <View>
                        <Text style={styles.statusText}>{product?.productId?.productName}</Text>
                        <Text style={styles.statusText}>QTY: {product?.quantity}</Text>
                        <Text style={styles.statusText}>Price: {showNumber(product?.productId?.price)}</Text>
                    </View>
                    <View style={{ height: SCREEN_WIDTH * 0.15,width: SCREEN_WIDTH * 0.15,overflow:'hidden',borderRadius:50}}>
                    <Image source={{ uri: img_url + product?.productId?.image }} style={styles.productImage} />
                    </View>
                </View>
                )
})}
        </View>
    );

    const renderTotalAmount = () => (
        <View style={{...styles.card,flexDirection:'row',justifyContent:'space-between',backgroundColor:Colors.white}}>
            <Text style={styles.statusText}>Total Amount</Text>
            <Text style={styles.value}>{showNumber(order?.totalAmount)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Order Details'} navigation={navigation} />
            <SafeAreaView style={styles.headerContainer}>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ gap: 20 }}>
                            {renderOrderCreated()}
                            {renderProducts()}
                            {renderTotalAmount()}
                        </View>
                    }
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#00000001',
        padding: 20,
    },
    card: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 8,
        gap: 10,
        backgroundColor: 'white',
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingBottom: 10,
    },
    statusText: {
        color: 'black',
    },
    value: {
        color: 'black',
        fontWeight: 'bold',
    },
    productImage: {
        height: SCREEN_WIDTH * 0.15,
        width: SCREEN_WIDTH * 0.15,
        resizeMode: 'contain',
        marginRight: 10,
    },
});

export default Productfull;
