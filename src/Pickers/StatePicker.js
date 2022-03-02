import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform,TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'; 


export default class StatePicker extends Component {
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
              
              <Picker.Item label={this.props.placeholder} value="" style={{color: 'lightgray'}}  />
              <Picker.Item label="Alabama" value="Alabama" />
              <Picker.Item label="Alaska" value="Alaska" />
              <Picker.Item label="Arizona" value="Arizona" />
              <Picker.Item label="Arkansas" value="Arkansas" />
              <Picker.Item label="California" value="California" />
              <Picker.Item label="Colorado" value="Colorado" />
              <Picker.Item label="Connecticut" value="Connecticut" />
              <Picker.Item label="Delaware" value="Delaware" />
              <Picker.Item label="Florida" value="Florida" />
              <Picker.Item label="Georgia" value="Georgia" />
              <Picker.Item label="Hawaii" value="Hawaii" />
              <Picker.Item label="Idaho" value="Idaho" />
              <Picker.Item label="Illinois" value="Illinois" />
              <Picker.Item label="Indiana" value="Indiana" />
              <Picker.Item label="Iowa" value="Iowa" />
              <Picker.Item label="Kansas" value="Kansas" />
              <Picker.Item label="Kentucky" value="Kentucky" />
              <Picker.Item label="Louisiana" value="Louisiana" />
              <Picker.Item label="Maine" value="Maine" />
              <Picker.Item label="Maryland" value="Maryland" />
              <Picker.Item label="Massachusetts" value="Massachusetts" />
              <Picker.Item label="Michigan" value="Michigan" />
              <Picker.Item label="Minnesota" value="Minnesota" />
              <Picker.Item label="Mississippi" value="Mississippi" />
              <Picker.Item label="Missouri" value="Missouri" />
              <Picker.Item label="Montana" value="Montana" />
              <Picker.Item label="Nebraska" value="Nebraska" />
              <Picker.Item label="Nevada" value="Nevada" />
              <Picker.Item label="New Hampshire" value="New Hampshire" />
              <Picker.Item label="New Jersey" value="New Jersey" />
              <Picker.Item label="New Mexico" value="New Mexico" />
              <Picker.Item label="New York" value="New York" />
              <Picker.Item label="North Carolina" value="North Carolina" />
              <Picker.Item label="North Dakota" value="North Dakota" />
              <Picker.Item label="Ohio" value="Ohio" />
              <Picker.Item label="Oklahoma" value="Oklahoma" />
              <Picker.Item label="Oregon" value="Oregon" />
              <Picker.Item label="Pennsylvania" value="Pennsylvania" />
              <Picker.Item label="Rhode Island" value="Rhode Island" />
              <Picker.Item label="South Carolina" value="South Carolina" />
              <Picker.Item label="South Dakota" value="South Dakota" />
              <Picker.Item label="Tennessee" value="Tennessee" />
              <Picker.Item label="Texas" value="Texas" />
              <Picker.Item label="Utah" value="Utah" />
              <Picker.Item label="Vermont" value="Vermont" />
              <Picker.Item label="Virginia" value="Virginia" />
              <Picker.Item label="Washington" value="Washington" />
              <Picker.Item label="West Virginia" value="West Virginia" />
              <Picker.Item label="Wisconsin" value="Wisconsin" />
              <Picker.Item label="Wyoming" value="Wyoming" />
              
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