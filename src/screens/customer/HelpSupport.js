import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../config/Constants1'
import { Fonts, Sizes } from '../../assets/style'

const HelpSupport = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    const email = 'support@astroBook.com';
    Linking.openURL(`mailto:${email}`).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"Customer Support"} navigation={navigation} />
      {adminforget()}
    </View>
  )

  function adminforget() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2, backgroundColor: '#F9F9F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding }}>
        <Text style={{ ...Fonts.black18RobotoMedium, color: colors.new_color, marginBottom: Sizes.fixPadding * 0.4, marginTop: Sizes.fixPadding }}>Please Contact</Text>
        <Text style={{ ...Fonts.black16RobotoMedium, marginBottom: Sizes.fixPadding * 2 }}>AstroBook Admin Team at</Text>
        <TouchableOpacity style={{ borderWidth: 1, borderStyle: 'dotted', width: '85%', borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 2, borderRadius: 5 }}
          // onPress={handlePress}
          activeOpacity={0.6}>
          <Text style={{ ...Fonts.black16RobotoMedium, color: colors.astrobook1 }}>support@astroBook.com</Text>
        </TouchableOpacity>
        <Text style={{ ...Fonts.black16RobotoMedium, marginBottom: Sizes.fixPadding * 3, marginTop: Sizes.fixPadding * 2 }}>For any Queries and Support</Text>
      </View>
    )

  }
}

export default HelpSupport

const styles = StyleSheet.create({})