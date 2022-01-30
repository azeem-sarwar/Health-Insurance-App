import React, { useState } from 'react';
import {   Text, View,  FlatList,  Button,  StyleSheet, ScrollView} from 'react-native';
import {valuesFormat} from "./helperValues"
import {currencyFormat} from "./helper"


const OptionGrantWorth = (props) => {

  
const {route,navigation,} = props 

const { optionsVestingPerMonth, numberOfMonths0, numberOfMonths1, numberOfMonths2, numberOfMonths3, optionsVested0, immidiateGain0, fundsToExcOptionsVested0} = props?.route?.params


console.log(optionsVestingPerMonth)
 

  return (
    <View style={styles.container}>
    
      <View style = {{flex: 1}}>
            <ScrollView>
           <Text style={styles.header}>  What could my options be worth in the future?</Text>
             <View style= {{marginTop: 20}}>
              <Text style={styles.description}>
Let's first look at how many months passed after Your Options started Vesting or Number Of Months passed after the Vesting Cliff :
              </Text>
              
              <Text style={styles.answer1}>  {valuesFormat(optionsVestingPerMonth)} </Text>
              <Text style={styles.answer1}>  {valuesFormat(numberOfMonths0)} </Text>

               <Text style={styles.description}>
              Vesting schedules can have a cliff designating a length of time that a person must work before they vest at all.

For example, if your equity award had a one-year cliff and you only worked for the company for 11 months, you would not get anything, since you haven’t vested in any part of your award. Similarly, if the company is sold within a year of your arrival, depending on what your paperwork says, you may receive nothing on the sale of the company.

A very common vesting schedule is vesting over 4 years, with a 1 year cliff. This means you get 0% vesting for the first 12 months, 25% vesting at the 12th month, and 1/48th (2.08%) more vesting each month until the 48th month. If you leave just before a year is up, you get nothing, but if you leave after 3 years, you get 75%.
             </Text>
             
              <Text style={styles.description}>
Total Number of Options Vested as of Evaluation Date :
              </Text>
              <Text style={styles.answer1}>  {valuesFormat(optionsVested0)} </Text>
              <Text style={styles.description}>
Total Funds Needed to Exercise Your Vested Options as of Evaluation Date:
              </Text>
              <Text style={styles.answer1}>  {currencyFormat(fundsToExcOptionsVested0)} </Text>
              
              <Text style={styles.description}>
Immidiate Gain if All Vested Options are Excesized at Yesterday's Close Price on Evaluation Date:
              </Text>
              <Text style={styles.answer1}>  {currencyFormat(immidiateGain0)} </Text>
            </View>

             <Text style={styles.description}>

Your Employee Stock Option Plan: What could your grant be worth in 4 years? For example, if your company grows at 50% per year for the next 4 years, and is valued at 5x revenue, your current option grant would be worth..
            </Text>
            
            </ScrollView>
        
      </View>
      
    </View>
  );
}

export default OptionGrantWorth;

const styles = StyleSheet.create({
  container: {
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#FFFFFF',
     shadowColor:'black',
     padding: 10,
     //paddingBottom: 70,
     flex: 1
     
   },
  header: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#15317E',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  description: {
     textAlign: 'left',
     color: '#15317E',
     fontSize: 16,
     //marginTop: 10,
     //marginBottom: 10,
     padding: 10,
     borderRadius: 5,
    },
  answer1: {
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    //color: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    minHeight: 40,
    marginVertical: 10,
    alignItems: 'center',//
    textAlign: 'center',//
    // backgroundColor: 'red',
  },
});

 