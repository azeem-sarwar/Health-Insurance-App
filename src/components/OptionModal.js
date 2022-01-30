import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';




const OptionModal = ({ModalOpen, setModalOpen})=>{
  return (
    <Modal visible={ModalOpen} animationType='slide' style={styles.modal}> 
        <ScrollView style={styles.scrollView}>
        <View style={styles.container1}> 
          
            <Ionicons name="close-circle-outline" size={32} color="#15317E" 
              style={styles.modal}
              onPress={() => setModalOpen(false)}
            />
  
            <Text style={styles.header}>
          Stock Option Plan Explanation:
            </Text>
            
            <Text style={styles.modalquestions}>
            What are Stock Options? How do they work?
            </Text>

            <Text style={styles.modalexplanation}>
            Stock options are a form of compensation. They give an employee the right to buy or exercise a set number of shares of the company stock at a pre-set price, also known as the grant price. You have a set amount of time to exercise your options before they expire. 
            </Text>
            
            <Text style={styles.modalquestions}>
            Understanding Stock Option Granting and Vesting
            </Text>

            <Text style={styles.modalexplanation}>
            Let’s say you get a job at a new startup, and as part of your compensation, you receive stock options for 20,000 shares of the company’s stock. The contract will specify the grant date, which is the day your options begin to vest. When a stock option vests, it means that it is actually available for you to exercise or buy. The options usually vest gradually, over a period of time known as the vesting period. let’s say the options have a four-year vesting period, with a one-year cliff. A four-year vesting period means that it will take four years before you have the right to exercise all 20,000 options.

The good news is that, because your options vest gradually over the course of this vesting period, you’ll be able to access some of your stock options before those four years are up. In our example, it’s likely that one quarter (5,000) of your options will vest each year over the course the four-year vesting period. So by year two of your employment, for instance, you’ll have the right to exercise 10,000 options. This is where that one-year cliff comes in: This means that you will need to stay with the company for at least one year to receive any of your options. If you leave the company before reaching the one-year milestone, you won’t get any options. After you reach that one-year cliff, you’ll get your first 5,000 options (one-quarter of the 20,000); then, your remaining options will likely vest such that you get an equal amount each month for the remainder of the vesting period. In our example, the remaining 15,000 will vest at a rate of 1/36 for the next 36 months, which comes out to about 416 options vested per month.
          </Text>

          <Text style={styles.modalquestions}>
          How to Exercise Stock Options
          </Text>

          <Text style={styles.modalexplanation}>
          Once your options vest, you have the ability to exercise them. This means you can actually buy shares of company stock. Let’s say your four years have elapsed, and you now have 20,000 stock options with an exercise price of $1. In order to exercise all of your options, you would need to pay $20,000 (20,000 x $1). Once you exercise, you own all of the stock, and you’re free to sell it. You can also hold it and hope that the stock price will go up more. Note that you will also have to pay any commissions, fees and taxes that come with exercising and selling your options. Options usually have an expiration date specify in teh contract. It’s common for options to expire 10 years from the grant date, or 90 days after you leave the company.


        </Text>
        <Text style={styles.modalquestions}>
        When You Should Exercise Stock Options
        </Text>
        <Text style={styles.modalexplanation}>
        First, you’ll likely want to wait until the company goes public, assuming it will. If you don’t wait, and your company doesn’t go public, your shares may become worth less than you paid – or even worthless.

Second, once your company has its initial public offering (IPO), you’ll want to exercise your options only when the market price of the stock rises above your exercise price. For example, let’s say you have an exercise price of $2 per share. If the market price is $1, it doesn’t make sense to exercise your options just then. You would be better off buying on the market.

On the other hand, if the market price is $3 per share, you would make money from exercising your options and selling. But if the price is on the rise, you may want to wait on exercising your options. Once you exercise them, your money is sunk in those shares.
        </Text>
        <Text style={styles.modalquestions}>
        Stock Options and Taxes
        </Text>
        <Text style={styles.modalexplanation}>
        You will usually need to pay taxes when you exercise or sell stock options. What you pay will depend on what kind of options you have and how long you wait between exercising and selling.

For starters, it’s important to note that there are two types of stock options:

Non-qualified stock options (NSOs) are the most common. They do not receive special tax treatment from the federal government.
Incentive stock options (ISOs), which are given to executives, do receive special tax treatment.

With NSOs, the federal government taxes them as regular income. The company granting you the stock will report your income on your W-2. The amount of income reported will depend on the bargain element (also called the compensation element). This is the difference between a stock’s market value and your exercise price. If you exercise 10,000 options at an exercise price of $1 each, but those shares cost $2 each on the market, the bargain element is $10,000 ($1 price difference x 10,000 shares). That $10,000 goes on your W-2 as ordinary income.

When you decide to sell your shares, you will have to pay taxes based on how long you held them. If you exercise options and then sell the shares within one year of the exercise date, you will report the transaction as a short-term capital gain. This type of capital gain is subject to the regular federal income tax rates. If you sell your shares after one year of exercise, the sale falls under the category of long-term capital gains.

ISOs operate a bit differently. You do not pay taxes when you exercise ISOs, though the amount of the bargain element may trigger the alternative minimum tax (AMT), which phases out income exemptions targeted for low- and middle-income taxpayers. So if your income is over $73,600 for individuals in 2021 (and more than $114,600 for married couples filing jointly or qualifying widowers, and $57,300 for married tax filers filing separately), you could be subject to the AMT.

When you sell shares from ISO options, you will need to pay taxes on that sale. If you sell the shares as soon as you exercise them, the bargain element is regular income. If you hold the stock for at least one year after exercise AND you don’t sell the shares until at least two years after the grant date, the tax rates you pay are the long-term capital gains rates.

        </Text>
        </View>
        </ScrollView>
    </Modal>
  )
}

export default OptionModal

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
  modalexplanation:{
    marginTop: 10,
    fontSize: 16,
    padding: 8,
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
     
  },
  
 });
