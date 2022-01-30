import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Navigation, Image, NavigatorIOS, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';


const samples: { title: string; routeName: any, image: any, des: any }[] = [
  
  { title: 'Compensation', routeName: 'CompensatonView', image: require("../../Images/JobOffer1.png"), des: "See Your Saved Data" },
  { title: 'Stock Purchase Plan', routeName: 'PurchasePlan', image: require("../../Images/EmployeeStock2.png"), des: "See Your Saved Data" },
  { title: 'Stock Options Potential', routeName: 'OptionsVestingSchedule', image: require("../../Images/StockOption2.png"), des: "See Your Saved Data"  },
  { title: 'Options Pricing', routeName: 'OptionCalculator', image: require("../../Images/Aim1.png"), des: "See Your Saved Data" },
  
];


function index({ navigation }: ScreenProps) {


  return (
    <View style={styles.container}>
      
      <View style ={styles.boxContainer}>
          {samples.map((sample,key) => (
            <TouchableOpacity  
              key = {key} 
              style={styles.box} 
              onPress={() => { navigation.navigate(sample.routeName)}}
            >
              <Image source={sample.image} style={{height: 50, width: 50, marginBottom: 5, borderRadius: 5}} resizeMode = {"contain"} />
              <View style={{marginHorizontal: 10}} >
                <Text style={styles.list}>{sample.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
  </View>
  );
}

// <Text numberOfLines = {3} style={styles.list2}>{sample.des}</Text>
// <FontAwesome name="angle-right" size={32} color="#15317E" />
export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: '#15317E',
   // backgroundColor: '#EBF4FA',
   },
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#008484',
    shadowColor: "#008484",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: "2%",
    width: "45%",
    height: 150, 
    justifyContent: 'center',
    

  },
  

   list: {
    //  color: '#15317E',
     color: '#fff',
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 14,
     marginBottom: 5,
    },
    
    
});