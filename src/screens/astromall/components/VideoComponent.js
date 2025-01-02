import { View, Text, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Sizes } from '../../../assets/style';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { createThumbnail } from 'react-native-create-thumbnail';
import { base_url } from '../../../config/constants';

const VideoComponent = ({ item, updateState }) => {
    const [imageData, setImageData] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        try {
            setImageLoading(true);
            createThumbnail({
                url: base_url + item,
                timeStamp: 10000,
            })
                .then(response => setImageData(response.path), setImageLoading(false))
                .catch(err => console.log({ err }), setImageLoading(false));
        } catch (e) {
            setImageLoading(false);
            console.log(e);
        }
    }, []);
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
                updateState({
                    vedioUri: base_url + item,
                    videoVisible: true,
                })
            }
            style={{
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_WIDTH * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Sizes.fixPadding,
            }}>
            {imageLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryDark} />
            ) : (
                <ImageBackground
                    source={{
                        uri: imageData,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Ionicons name='play' color={Colors.black} size={40} />
                </ImageBackground>
            )}
        </TouchableOpacity>
    );
}

export default VideoComponent