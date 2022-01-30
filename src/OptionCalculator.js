import React  from "react"
import {View, Button, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform} from "react-native"
import {fetchStockApi, fetchRiskRate} from "./apis"
import bs from "black-scholes"
import moment from "moment"

const OptionCalculator = ({navigation})=>{

const [state, setState] = React.useState ({
      stockChartXValues: [],
      stockChartYValues: [],
      latestValues: {},
      value: 0,
      interest: 0,
      strike: 0,
      volatility: 0,
      expiration: 0,
      risk: 0
    });


const fetchStock = async () => {
    const stockName = state.value
    if(!stockName){
        alert("Nothing...")
        return
    }    
    
    
    fetchStockApi(stockName,(res)=>{
      console.log(res, "<____")
      if(res.error){
        console.log(res.error)
      }
      else{
          const metaData   = res["Meta Data"]?res["Meta Data"]:[]
          const timeSeries = res["Time Series (Daily)"]?res["Time Series (Daily)"]: []
          const key = metaData["3. Last Refreshed"]
          const latest = timeSeries[key.split(" ")[0]]
          console.log(metaData)
          setState({
              ...state,
              latestValues: {
                key: key,
                value:latest
              }
          });

      }

    })
    

}

const calculateBlackSchols  = async()=>{
  const { strike,volatility,expiration, interest, risk} = state
  const value = state.latestValues.value["1. open"]
  const test = bs.blackScholes(parseFloat(value),parseFloat(strike), parseFloat(expiration), parseFloat(volatility), parseFloat(risk), "call");
  alert(test)
}

const fetchRiskHandler = ()=>{
  fetchRiskRate((res)=>{
    console.log(res)
    if(res.quandl_error){
      alert(res.quandl_error.message)
      return
    }
    
       const data = JSON.parse(res.text).dataset.data[0];

        const expiryTime = moment(this.option.expiryDate).diff(new Date(), 'weeks', true);

        if (expiryTime < 0) {
            throw new Error('Option has already expired');
        }

        const mid4And13 = (13 - 4) / 2;
        const mid13And26 = (26 - 13) / 2;
        const mid26And52 = (52 - 26) / 2;

        // Index: Num weeks out
        // 1: 4wk
        // 3: 13wk
        // 5: 26wk
        // 7: 52wk

        if (expiryTime <= mid4And13) {
          setState({...state, risk:data[1]})
            // return data[1];
        } else if (expiryTime <= mid13And26) {
            setState({...state, risk:data[3]})
        } else if (expiryTime <= mid26And52) {
            // return data[5];
            setState({...state, risk:data[5]})
        } else {
            // return data[7];
            setState({...state, risk:data[7]})
        }
    
  })
}

  return (
    <View style={{flex: 1, margin: 20}}>
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container1}>
        <Text style={styles.question1}>Enter Ticker of Your Company's Stock</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style = {[styles.answer1,{flex: 1}]}
              underlineColorAndroid = "transparent"
              placeholder = "  Please enter ..."
              //autoCapitalize = "none"
              value={state.value}
              onChangeText = {value => {setState({...state, value}) }}
              
            />
            <Button 
            style={{color:"#15317E"}}
            title={"Fetch Stock"} onPress = {fetchStock} />
        </View>

        <Text style={styles.question1}>Current Stock Price - Yesterday's Close</Text>
        <TextInput style = {[styles.answer1]}
            underlineColorAndroid = "transparent"
            placeholder = "This will calculated automatically"
            //autoCapitalize = "none"
            //  value={CurrentMarketPrice}
            value={state.latestValues?.value?state.latestValues.value["1. open"]: ""}
            editable = {false}
            keyboardType  = {"number-pad"}
            // onChangeText = {CurrentMarketPrice => setCurrentMarketPrice(CurrentMarketPrice)}
            //keyboardType={'numeric'}
          />
      
        <Text style={styles.question1}>Strike price</Text>
        <TextInput style = {[styles.answer1,{flex: 1}]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            keyboardType  = {"number-pad"}
            //autoCapitalize = "none"
            value={state.strike}
            onChangeText = {value => {setState({...state, strike:value}) }}
            
          />

        <Text style={styles.question1}>Time to expiration in years</Text>
        <TextInput style = {[styles.answer1,{flex: 1}]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            keyboardType  = {"number-pad"}
            //autoCapitalize = "none"
            value={state.expiration}
            onChangeText = {value => {setState({...state, expiration:value}) }}
            
          />

        <Text style={styles.question1}>Volatility as a decimal</Text>
        <TextInput style = {[styles.answer1,{flex: 1}]}
            underlineColorAndroid = "transparent"
            placeholder = "  Please enter ..."
            keyboardType  = {"numeric"}
            //autoCapitalize = "none"
            value={state.volatility}
            onChangeText = {value => {setState({...state, volatility:value}) }}
            
          />
          
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style = {{flex: 1}}>
              <Text style={styles.question1}>Annual risk-free interest rate as a decimal</Text>
            </View>
            <TextInput style = {[styles.answer1,{flex: 1}]}
                underlineColorAndroid = "transparent"
                placeholder = ""
                keyboardType  = {"number-pad"}
                autoCapitalize = "none"
                value={state.risk}
                //editable = {false}
                onChangeText = {value => {setState({...state, risk:value}) }}
                
              />
          </View>
          <Button 
            style={{color:"#15317E"}}
            title={"Calculate"} onPress = {calculateBlackSchols} 
          />
      </KeyboardAvoidingView>
      </ScrollView>
      <Button 
        style={{color:"#15317E"}}
        title={"Vesting Schedle"} onPress = {()=>{navigation.navigate("OptionsVestingSchedule")}} 
      />
    </View>
  )
}


  // <Button 
  //  style={{color:"#15317E"}}
  //   title={"Get"} onPress = {fetchRiskHandler} 
  // />


const styles = StyleSheet.create({
  question1: {
    marginTop: 10,
    marginBottom: 5,
    color: '#15317E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
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
})


export default OptionCalculator