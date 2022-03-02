import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'; 

export default class YesNoPicker extends Component {
  /**
     * My Local State
     */
    state = { 
      selectedValue: '',
      isPickerOpen: false, 
    }


  /**
   * My Picker Value Handler
   */
    updateValue = (value) => {
      this.setState({ selectedValue: value, isPickerOpen: false })
    }

    /**
     * Initial Entry Point
     */
    render(){
    console.log(this.state.selectedValue)
    console.log(Platform.OS != "ios" || this.state.isPickerOpen)
    return (
      <View style={{flex: 1}}>
         {
           Platform.OS == "ios"?
            <TouchableOpacity style={[styles.answer1,styles.row]} onPress={()=>this.setState({isPickerOpen: true})}>
                <Text style={styles.selection} >{this.state.selectedValue?this.state.selectedValue: this.props.placeholder}</Text>
                <FontAwesome name={this.state.isPickerOpen?"angle-up":"angle-down"} size={24} color="black" />
            </TouchableOpacity>
           :
           <></>
         }
         {
           (Platform.OS != "ios" || this.state.isPickerOpen)?
            <Picker
              mode = {"dropdown"}
              selectedValue={this.state.user}
              style={{backgroundColor: "#fff"}}
              itemStyle = {{ fontSize: 12 }}
              
              onValueChange={this.updateValue}>
              
          
          <Picker.Item label="Please Select Value" value="" style={{color: 'lightgray'}}  />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
          
        </Picker>
        :
            <></>
         }
        
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  answer1: {
    //  backgroundColor: '#D6EAF8',
    //  borderColor: '#D6EAF8',
    //  padding: 10,

    //  justifyContent: 'center',
    //   borderColor: '#D6EAF8',
    //  padding: 10,
    //  backgroundColor: '#fff',
    //  shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    color: 'transparent',
    elevation: 5,
    flexDirection: 'row',
    minHeight: 40,
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: '#ECECEC',

  },
  selection: {
    fontSize: 14,
    flex: 1,
    //fontWeight: 'bold',
    // color: '#15317E',
    color: 'gray',
     
  },
  
  
  
});