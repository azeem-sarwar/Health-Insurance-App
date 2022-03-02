import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'; 

export default class IndustryPicker extends Component {
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
    return (
      <View style={{flex: 1}}>
         {
           Platform.OS == "ios"?
            <TouchableOpacity style={[styles.answer1,styles.row]} onPress={()=>this.setState({isPickerOpen: true})}>
                <Text style={styles.selection}>
                  {this.state.selectedValue?this.state.selectedValue: this.props.placeholder}
                </Text>
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
                      // itemStyle={{height: 50}}
              onValueChange={this.updateValue}>
              
          
          <Picker.Item label={this.props.placeholder} value="" style={{color: 'lightgray'}}  />
          <Picker.Item label="Advertising" value="Advertising" />
          <Picker.Item label="Aerospace/Defense" value="Aerospace/Defense" />
          <Picker.Item label="Automotive" value="Automotive" />
          <Picker.Item label="Beverage" value="Beverage" />
          <Picker.Item label="Cable & Satellite TV" value="Cable & Satellite TV" />
          <Picker.Item label="Diversified Capital Goods" value="Diversified Capital Goods" />
          <Picker.Item label="Energy - Exploration & Production" value="Energy - Exploration & Production" />
          <Picker.Item label="Energy - Gas Distribution" value="Energy - Gas Distribution" />
          <Picker.Item label="Energy - Integrated Energy" value="Energy - Integrated Energy" />
          <Picker.Item label="Energy - Oil Field Equipment & Services" value="Energy - Oil Field Equipment & Services" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Private" value="Private" />
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
    // textAlign: 'center',
    flex: 1,
    //fontWeight: 'bold',
    // color: '#15317E',
    color: 'gray',
  
    
  },
  
  
});