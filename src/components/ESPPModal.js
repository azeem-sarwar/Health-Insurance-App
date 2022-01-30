import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';




const ESPPModal = ({ModalOpen, setModalOpen})=>{
  return (
    
    <Modal visible={ModalOpen} animationType='slide' style={styles.modal} statusBarTranslucent = {false}> 
        <SafeAreaView>
          <Ionicons name="close-circle-outline" size={32} color="#15317E" 
            style={{alignSelf: 'flex-end', padding: 10}}
            onPress={() => setModalOpen(false)}
          />
        </SafeAreaView>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container1}> 
          
  
            <Text style={styles.header}>
          Employee Stock Purchase Plan (ESPP) Explanation:
            </Text>
            
            <Text style={styles.modalquestions}>
            What is an ESPP Plan? How does it work?
            </Text>

            <Text style={styles.modalexplanation}>
            An ESPP is an employer benefit offered at some publicly traded companies that allows employees to purchase shares of their company’s stock at a discount. A typical ESPP program permits employees to enroll for a 12-month offering period. Participating employees choose to have a portion of their pay (up to 15%, or $25,000 per year) set aside by their company. Every six months, those funds are used to buy shares of the employer stock at a price below market value (typically a 15% discount). In some cases, an employer will offer a “lookback period” as an additional benefit. The employee still receives a 15% discount; however, the discount is applied to whichever is lower — either the value of the stock on the first day or the final day of the period.
            </Text>
            
            <Text style={styles.modalquestions}>
            How is an ESPP taxed? Is it pre- or post-tax?
            </Text>

            <Text style={styles.modalexplanation}>
            ESPP shares are post-tax. In other words, your employer stock is purchased with money on which you’ve already paid taxes. Taxes are only due when the ESPP is sold.
            If you purchase shares and immediately sell them, expect to pay income taxes on the 15% discount, which is considered compensation by your employer. If you hold ESPP shares after purchase and they appreciate in value, you may pay capital gains taxes in addition to income tax on the discount. To qualify for favorable long-term capital gains taxes, your shares must be held more than two years after the start of the offering period, and more than one year after your purchase date.
          </Text>

          <Text style={styles.modalquestions}>
          Are ESPPs good investments?
          </Text>

          <Text style={styles.modalexplanation}>
          Purchasing stock at a discount is certainly a valuable tool for accumulating wealth, but comes with investment risks you should consider. An ESPP plan with a 15% discount effectively yields an immediate 17.6% return on investment. To understand this return, consider a stock trading at $10 per share. An employee with access to an ESPP program with a 15% discount is able to purchase shares at $8.50. He or she can immediately sell shares for $10. This sale results in an immediate guaranteed profit of $1.50 per share on an investment of $8.50 per share of 17.6%. Using the maximum $25,000/year contribution to an ESPP plan, this translates to a $4,411 “gift” from one’s employer each year. Over a 30-year career, this employee benefit is worth $132,330.
        </Text>
        <Text style={styles.modalquestions}>
        Can you lose money on an ESPP?
        </Text>
        <Text style={styles.modalexplanation}>
        As with any stock, the value of ESPP shares can drop.  Having a large portion of your nest egg and your income tied to the performance of one firm creates undue risk. 
        </Text>
        <Text style={styles.modalquestions}>
        Should I participate? How much should I contribute?
        </Text>
        <Text style={styles.modalexplanation}>
        One strategy we like for these highly compensated clients involves a cycle of maximum ESPP contributions, simultaneous sales, high-basis shares, and immediate investment of proceeds in tax-advantaged accounts. The investor obtains the 17.6% immediate return on investment due to the ESPP discount. He or she sells an equal amount of previously held company stock in tandem with each ESPP purchase. The investor essentially replaces his or her employer stock holdings with stock purchased at a discount. Recently awarded shares from restricted stock units are often a great source of shares to sell upon each ESPP purchase. Recently vested restricted stock units (RSUs) are likely to have a high cost basis. They also don’t generate the additional income taxation associated with sales of ESPP shares. Proceeds from stock sales are then invested inside more tax-advantageous accounts to satisfy retirement savings, which would have otherwise been funded from a client’s earnings. If the usual savings strategies, such as normal 401(k) contributions, have been maximized already, proceeds from stock sales can be deployed elsewhere. “Super Backdoor Roth” savings, Healthcare Savings Accounts, or Deferred Compensation plans are common choices. These can provide either an additional income tax deduction, tax-deferred growth, tax-free growth, or a combination of benefits.

  The net result of this transaction can be an immediate 17.6% return on investment, deferral of income taxes on the ESPP discount, and no added investment risk.

        </Text>
        </View>
        </ScrollView>
    </Modal>
  )
}

export default ESPPModal

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
    flex: 1
    // marginTop:25,
    // marginBottom: 0,
    //borderColor: '#f2f2f2',
    // position: 'absolute',
    // right: 10,
    // top: 25,
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
