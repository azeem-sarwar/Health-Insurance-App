import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {currencyFormat} from "../helper"

export default function InputWrapper({value, children}) {

  return  (
    <View>
      <View style={{zIndex: 1,position: 'absolute', left: `${43 - value.length}%`, height: '100%',justifyContent: 'center' }}>
        <Text style={styles.textStyle}>{value.length?currencyFormat(value):""}</Text>
      </View>
      {children} 
    </View>
  )
  
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
     color: '#154360',
    //  backgroundColor: '#D6EAF8',
     padding: 10,
     borderRadius: 5,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    //  textAlign: 'center',
    //   
  }
})