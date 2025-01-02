import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Fonts } from '../assets/style'
import { colors } from '../config/Constants1'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import AstroBookHeader from '../components/AstroBookHeader'
import { img_url } from '../config/constants'

const BlogDescription = ({ route }) => {
    const { blogData } = route.params;
    const cleanText = blogData.description
        .replace(/<\/?[^>]+(>|$)/g, "") 
        .replace(/&nbsp;/g, " ");       
    return (
        <View style={{ flex: 1, }}>

<AstroBookHeader title={'AstroBlog'} showSearch={false} blogData={blogData} />
            {Title()}
            {photo()}
            {About()}


        </View>
    )
    function Title() {
        return (
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.02, }}>
                <Text style={{ ...Fonts.black11InterMedium, fontSize: 16, color: colors.black_color9, }}>{blogData.title}</Text>
            </View>
        )
    }
    function photo() {
        return (
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                <View style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.25, alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 10, }}>


                    <Image
                        style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.25, borderRadius: 10 }}
                        source={{ uri: img_url + blogData?.image }} />


                </View>
            </View>
        )
    }
    function About() {
        return (
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.025, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
                <Text style={{ ...Fonts.primaryHelvetica, fontSize: 13, color: colors.black_color6,textAlign:"justify" }}>{cleanText}</Text>
            </View>)
    }



}

export default BlogDescription

const styles = StyleSheet.create({})