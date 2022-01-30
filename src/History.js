import React, { useState } from 'react';
import {   Text, View,  FlatList,  Button,  StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';
import {currencyFormat} from "./helper"
import CompPieChart from "./components/CompPieChart"


const History = ({route,navigation}) => {

  const _history = route?.params?.history
  const displayOnly = route?.params?.displayOnly
  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 20}}>
        {
          _history?.totalcompensation?
            <View style={styles.row}>
              <Text style={styles.description}>Your Annual Compensation:</Text>
              <Text style={[styles.description,{textAlign: 'right'}]}>
                {currencyFormat(_history.totalcompensation)}
              </Text>
            </View>
          :<></>
        }
        {
          _history?.totalvacation && _history.totalvacation > 0?
            <View style={styles.row}>
              <Text style={styles.description}>Your Annual Vacation Value:</Text>
              <Text style={[styles.description,{textAlign: 'right'}]}>
                {currencyFormat(_history.totalvacation)}
              </Text>
            </View>
          :<></>
        }
        
        {
          _history?.totalpension?
            <View style={styles.row}>
              <Text style={styles.description}>Total Pension Benefit:</Text>
              <Text style={[styles.description,{textAlign:'right'}]}>
                {currencyFormat(_history.totalpension)}
              </Text>
            </View>
          :<></>
        }

        {
          _history?.totalpension10?
            <View style={styles.row}>
              <Text style={styles.description}>Total Pension Benefit in 10 years:</Text>
              <Text style={[styles.description,{textAlign: 'right'}]}>
                {currencyFormat(_history.totalpension10)}             
              </Text>
            </View>
            :<></>
        }
      </View>
      <CompPieChart history = {_history} displayOnly = {displayOnly?true: false} />
    </ScrollView> 
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  row: {marginBottom: 5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'},
  description: {
    //  textAlign: 'left',
     color: '#15317E',
     fontSize: 16,
     borderRadius: 5,
    },
});