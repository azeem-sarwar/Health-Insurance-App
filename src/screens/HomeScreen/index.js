import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Navigation, Image, NavigatorIOS, ScrollView, StatusBar } from 'react-native';

import bs from "black-scholes";

// const samples: { title: string; routeName: any, image: any, des: any }[] = [
const samples = [
  
  { title: 'Calculate Your Full Compensation', routeName: 'NewOfferQs', image: require("../../Images/JobOffer1.png"), des: "How Attractive is My Job Offer?" },
  { title: 'Evaluate Your Stock Purchase Plan', routeName: 'ESPPCalculator', image: require("../../Images/EmployeeStock2.png"), des: "Is My Company's Stock a Good Investment?" },
  { title: 'Discover Your Stock Options Potential', routeName: 'OptionsVestingSchedule', image: require("../../Images/StockOption2.png"), des: "What Might My stock Options be Worth?"  },
  { title: 'Options Pricing', routeName: 'OptionCalculator', image: require("../../Images/Aim1.png"), des: "Black Scholes Option Pricing" },
  { title: 'Compare Health Insurance Plans', routeName: 'HealthInsurance', image: require("../../Images/HealthInsurance1.png") },
  { title: 'Research Tax Implications', routeName: 'TaxImplications', image: require("../../Images/TaxImplication1.png"), des: "How is My Compensation Taxed?" },
  
  
];


function index({ navigation }: ScreenProps) {


  const value = bs.blackScholes(40, 34, .25, .2, .08, "call");

  return (
    <View style={styles.container}>
    <StatusBar barStyle = {"light-content"} />
      <View style={styles.header}>
        <Text style={styles.description}>CompAim helps to analyze your full compensation potential. Benefits such as health insurance and retirement plans can be confusing but we've got you covered </Text>
        <Text style={styles.question}> Maximize Your Compensation Potential </Text>
      </View>
      <View style={styles.container2}>
          <View style = {{flex: 1,top: -50}}>
          <ScrollView style = {{flex: 1}} showsVerticalScrollIndicator = {false}>
                {samples.map((sample,key) => (
                  <TouchableOpacity key = {key} style={styles.box} onPress={() => { navigation.navigate(sample.routeName)}}>
                    <Image source={sample.image} style={{height: 50, width: 50, marginLeft: 10, marginBottom: 1}} />
                    <View style={{marginHorizontal: 10, flex: 1}} >
                      <Text numberOfLines = {1}  style={styles.list}>{sample.title}</Text>
                      <Text numberOfLines = {3} style={styles.list2}>{sample.des}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
    </View>
  </View>
  );
}


export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008484",
   },
   
   header:{
    flex: 0.4,
    padding: 15,
   },
   

   
   container2: {
    flex: 1,
    backgroundColor: '#ffffff',
    // backgroundColor: '#efefef',
    // top: -50,
    // zIndex: 1,
    paddingHorizontal: 15,
    
   },
  box: {
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    minHeight: 110,
    alignItems: 'center',
    marginVertical: 10,
  },
  question: {
     textAlign: 'center',
     color: '#ffffff',
     fontWeight: 'bold',
     fontSize: 24,
     marginTop: 15,
    },
  
  description: {
     textAlign: 'center',
     color: '#ffffff',
     fontSize: 14,
    },

   list: {
     color: '#15317E',
     fontWeight: 'bold',
     fontSize: 14,
     marginBottom: 5,
    },
    list2: {
      color: '#15317E',
      fontSize: 14,
    },
    
});