import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, NavigatorIOS, KeyboardAvoidingView, Image } from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';
import YesNoPicker from './Pickers/YesNoPicker.js';
import IndustryPicker from './Pickers/IndustryPicker.js';
import PrivatePublicPicker from './Pickers/PrivatePublicPicker.js';
import StatePicker from './Pickers/StatePicker.js';
import {currencyFormat} from "./helper"
import InputWrapper from "./components/InputWrapper"
import { StackParamList } from '../App';
import { createRow } from './Row';
import { Ionicons } from '@expo/vector-icons';
import NewOfferModal from "./components/ESPPModal"



 const Taxes = ({route,navigation}) => {


   
    const [Salary, setSalary] = useState(0);
    
      
    
    const [ModalOpen, setModalOpen] = useState(false);
    React.useEffect(()=>{
      navigation.setOptions({ headerRight: ()=>{
          return (
            <Ionicons  
            name="help-circle-outline" 
            size={32} 
            color="#FFFFFF"
            style={{marginRight: 10 }}
            onPress={() => setModalOpen(true)}
          />
          )
        }
      })
    },[])

    
  
  return (
    <ScrollView style={styles.scrollView}>
    

    <NewOfferModal ModalOpen = {ModalOpen} setModalOpen = {()=>setModalOpen(!ModalOpen)} />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
       <View style={styles.container1}>
        <Image
    style={{ width: 200, height: 200, borderRadius: 200, alignItems: 'center', justifyContent: 'center', allignSelf: 'center'}}
    source={require('./Images/TaxImplication1.png')} />
        <View>
        <Text style={styles.header1}>  Taxes </Text>
      

        <Text style={styles.modalquestions}>
        ESPP and Taxes
        </Text>
        <Text style={styles.modalexplanation}>
            ESPP shares are post-tax. Your company stock is purchased with money on which you’ve already paid taxes. Taxes are only due when the ESPP is sold.
            If you purchase shares and immediately sell them, expect to pay income taxes on the 15% discount. If you hold ESPP shares after purchase and they appreciate in value, you may pay capital gains taxes in addition to income tax on the discount. </Text>
        <Text style={styles.modalquestions2}>
            To qualify for favorable long-term capital gains taxes, your shares must be held more than 2 years after the start of the offering period, and more than 1 year after your purchase date.
          </Text>
        <Text style={styles.modalquestions}>
        Stock Options and Taxes
        </Text>
        <Text style={styles.modalexplanation}>
        You will usually need to pay taxes when you exercise or sell stock options. There are two types of stock options:
        </Text>
        <Text style={styles.modalquestions2}>
1. Non-qualified stock options (NQSOs) are the most common. They do not receive special tax treatment from the federal government.
        </Text>
        <Text style={styles.modalquestions2}>
2. Incentive stock options (ISOs), which are given to executives, do receive special tax treatment.
        </Text>
        <Text style={styles.modalexplanation}>
With NQSOs, the federal government taxes them as regular income. The company granting you the stock will report your income on your W-2. The amount of income reported will depend on the bargain element (also called the compensation element). This is the difference between a stock’s market value and your exercise price. If you exercise 10,000 options at an exercise price of $1 each, but those shares cost $2 each on the market, the bargain element is $10,000 ($1 price difference x 10,000 shares). That $10,000 goes on your W-2 as ordinary income.
        </Text>
        <Text style={styles.modalexplanation}>
When you decide to sell your shares, you will have to pay taxes based on how long you held them. If you exercise options and then sell the shares within one year of the exercise date, you will report the transaction as a short-term capital gain. This type of capital gain is subject to the regular federal income tax rates. If you sell your shares after one year of exercise, the sale falls under the category of long-term capital gains.
        </Text>
        <Text style={styles.modalexplanation}>
ISOs operate a bit differently. You do not pay taxes when you exercise ISOs, though the amount of the bargain element may trigger the alternative minimum tax (AMT), which phases out income exemptions targeted for low- and middle-income taxpayers. So if your income is over $73,600 for individuals in 2021 (and more than $114,600 for married couples filing jointly or qualifying widowers, and $57,300 for married tax filers filing separately), you could be subject to the AMT.
        </Text>
        <Text style={styles.modalexplanation}>
When you sell shares from ISO options, you will need to pay taxes on that sale. If you sell the shares as soon as you exercise them, the bargain element is regular income. If you hold the stock for at least one year after exercise AND you don’t sell the shares until at least two years after the grant date, the tax rates you pay are the long-term capital gains rates.</Text>
        <Text style={styles.header}>... </Text>
            

       <Text style={styles.header}>  Annual Salary</Text>
       <InputWrapper value = {Salary}>
          <TextInput style = {[styles.answer1,{color: "transparent"}]}
            underlineColorAndroid = "transparent"
            placeholder = " Enter ..."
            autoCapitalize = "none"
            onChangeText={Salary => setSalary(Salary)}
            keyboardType={'numeric'}
                
          />
        </InputWrapper>
       
      
 </View>
 </View>
 </KeyboardAvoidingView>
 </ScrollView>
 );
 
}


 const styles = StyleSheet.create({
   container1: {
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#FFFFFF',
     shadowColor:'black',
     padding: 10,
     //paddingBottom: 70,
     flex: 1
     
   },
   
 
  header1: {
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
  modalquestions:{
    marginTop: 10,
    fontSize: 20,
    padding: 8,
    fontWeight: 'bold',
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  modalquestions2:{
    marginTop: 10,
    fontSize: 16,
    padding: 8,
    fontWeight: 'bold',
    backgroundColor: '#FCE896',
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  modalexplanation:{
    marginTop: 10,
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    color: '#15317E',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    textAlign: 'left',
     
  },
   
  header: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#15317E',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  
  answer1: {
    marginTop: 5,
    fontSize: 16,
    color: '#154360',
    backgroundColor: '#D6EAF8',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  description: {
     textAlign: 'left',
     color: '#15317E',
     fontSize: 16,
     marginTop: 10,
     marginBottom: 10,
     padding: 10,
     borderRadius: 5,
    },

  });
  

export default Taxes;
