import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';




const VestingExplanationModal = ({ModalOpen1, setModalOpen1})=>{
  return (
    <Modal visible={ModalOpen1} animationType='slide' style={styles.modal}> 
        <ScrollView style={styles.scrollView}>
        <View style={styles.container1}> 
          
            <Ionicons name="close-circle-outline" size={32} color="#15317E" 
              style={styles.modal}
              onPress={() => setModalOpen1(false)}
            />
            <Text style={styles.header}>
          Options:
            </Text>
            <Text style={styles.modalexplanation}>Companies often offer stock as part of your compensation package so you can share in the company’s success. Imagine you just got a job offer from a new startup. In your letter, they offer an annual salary of $100,000 and 100 stock options. Stock options aren’t actual shares of stock — they’re the right to buy a set number of company shares at a fixed price, usually called a grant price, strike price, or exercise price. There are two types of employee stock options: incentive stock options (ISOs) and non-qualified stock options (NSOs). These mainly differ by how and when they’re taxed—ISOs could qualify for special tax treatment. While your offer letter might mention how many stock options the company is offering, you need to receive and sign the stock option agreement (also called an option grant) if you want to purchase your shares someday—just signing the offer letter isn’t enough.

Stock option grants are how your company awards stock options. This document usually includes details like the type of stock options you get, how many shares you get, your strike price, and your vesting schedule. Your stock option agreement should also specify its expiration date. In general, ISOs expire 10 years from the date you’re granted them. However, your grant can also expire after you leave the company—you may only have a short window of time to exercise your options (buy the shares) after you leave. Pricing: purchase price is also called "exercise price" or "strike price". The higher the purchase price for a stock option, the less incentivizing the award may be. Vesting is usually time based, typically monthly, but can also be based upon specific activities. If you leave the company, your shares will stop vesting immediately and you can only buy shares that have vested as of that date. And you only maintain this right for a set window of time, called a post-termination exercise (PTE) period. Historically, many companies made this period three months. </Text>
        </View>
        </ScrollView>
    </Modal>
  )
}

export default VestingExplanationModal

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor:'black',
    padding: 10,
    paddingTop: 20,
    // paddingBottom: 70,
    flex: 1
  },


  modal:{
    marginTop:25,
    marginBottom: 0,
    //borderColor: '#f2f2f2',
    position: 'absolute',
    right: 10,
    top: 25,
  },
 
 
  header: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#15317E',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
     
  },
  modalquestions:{
    marginTop: 10,
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  modalexplanation:{
    marginTop: 10,
    fontSize: 16,
    padding: 8,
    color: '#15317E',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
     
  },
  
 });
