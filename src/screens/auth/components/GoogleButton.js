import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GoogleIcon from '../../../svgicons/GoogleIcon'
import { responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../../../assets/style'
import FacebookIcon from '../../../svgicons/FacebookIcon'

const GoogleButton = () => {
  return (
    
      <View style={styles.googleView}>
        <TouchableOpacity style={styles.googleBtn}>
          <GoogleIcon width={30} height={30} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn}>
          <FacebookIcon width={30} height={30} />
          <Text style={styles.googleText}>Facebook</Text>
        </TouchableOpacity>
      </View>
  )
}

export default GoogleButton

const styles = StyleSheet.create({
  googleBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 0.3,
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    width: responsiveScreenWidth(40)
  },
  googleText: {
    color: "#000",
    ...Fonts.primaryHelvetica,
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(1.9),

  },
  googleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 10,
    marginTop: 30,
  }
})