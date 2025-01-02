import { StyleSheet, Text, View, TouchableOpacity, Image ,Linking} from 'react-native'
import React from 'react'
import { colors } from '../config/Constants1'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { Fonts } from '../assets/style'; AntDesign
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const AstroBookHeader = ({ title, showSearch = true, showShare = true , blogData }) => {
    const navigation = useNavigation();

    

    const openWhatsApp = () => {
       
        
        const url = `https://astrobook.freekundli.in/blog/${blogData?._id}`;  
        console.log('palAnuj',url)
        const message = url; 
        const phoneNumber = '';
        const whatsappUrl = phoneNumber 
            ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `whatsapp://send?text=${encodeURIComponent(message)}`; 
    
        Linking.openURL(whatsappUrl)
            .then(() => {
                console.log('WhatsApp opened');
            })
            .catch((err) => {
                console.error('Error opening WhatsApp', err);
            });
    };
    return (
        <View style={{}}>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH*0.04, paddingVertical: SCREEN_HEIGHT*0.015, }}>
                <View style={{ flexDirection: 'row', gap: SCREEN_WIDTH * 0.03 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='left' size={20} color={colors.black_color9} />
                    </TouchableOpacity>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 15 }}>{title}</Text>
                </View>
                {showSearch && (
                    <TouchableOpacity>
                        <AntDesign name="search1" size={20} color={colors.black_color9} />
                    </TouchableOpacity>
                )}
                {showShare && (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            width: SCREEN_WIDTH * 0.25,
                            height: SCREEN_HEIGHT * 0.047,
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: SCREEN_WIDTH * 0.02,
                            borderRadius: 100,
                            backgroundColor: colors.white_color,
                            borderColor:"#dadada"
                        }}

                        onPress={openWhatsApp}
                    >
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 13 }}>Share</Text>
                        <View style={{ height: SCREEN_HEIGHT*0.03, width: SCREEN_WIDTH*0.06 }}>
                            <Image
                                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                                source={require('../assets/images/whatsapp_logo.png')}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}

export default AstroBookHeader

const styles = StyleSheet.create({})