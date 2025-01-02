import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import React, {Component} from 'react';
import {Input} from '@rneui/themed';
import {Colors, Fonts, Sizes} from '../../assets/style';
import {SCREEN_WIDTH} from '../../config/Screen';
import AnimatedHeart from './AnimatedHeart';

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.version = '';
    this.state = {
      message: '',
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: 40,
          // backgroundColor: '#7D7973',
        }}>
        <Input
          value={this.state.message}
          placeholder="Say Hii..."
          placeholderTextColor={Colors.white}
          onChangeText={text => this.setState({message: text})}
          containerStyle={{
            height: 45,
            width: '85%',
            backgroundColor: Colors.black + '70',
            borderRadius: 1000,
          }}
          inputContainerStyle={{borderBottomWidth: 0}}
          inputStyle={{...Fonts.white16RobotoMedium}}
          rightIcon={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (this.state.message.trim() !== '') { // Check if message is not empty after trimming whitespace
                  this.setState({ message: '' });
                  this.props.sendMessage(this.state.message);
                } else {
                  Alert.alert('Alert', 'Please Type Message Here...', [
                    
                    {
                      text: 'Ok',
                      style: 'destructive',
                      onPress: () => {
                        console.log('asdfa');
                      },
                    },
                  ]);
                }
              }}>
              <Image
                source={require('../../assets/images/icon/send.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          }
        />
        <View style={{flex: 1}}>
          <AnimatedHeart
            addHeart={this.props.addHeart}
            removeHeart={this.props.removeHeart}
            hearts={this.props.hearts}
          />
        </View>
      </View>
    );
  }
}

export default Footer;
