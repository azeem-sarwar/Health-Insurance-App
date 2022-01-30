import React, { Component } from 'react'
import {View, Text, TextInput, Button, StyleSheet} from "react-native"
import Plotly from 'react-native-plotly';

const stockName  = ""
const API_KEY = 'GO1E2NOWMYUTPDDS';

class Stock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:this.props.stockName?this.props.stockName: stockName,
            stockChartXValues: [],
            stockChartYValues: [],
            latestValues: {},
            name: ""
            
            
        }
        //get the changes from the form field and change the stock symbol in the 'demo' span
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
      handleChange(text) {
        this.setState({value: text});
      }
    
      handleSubmit() {
        //changes the new stock symbol, prevents page from refreshing to default
        
        this.fetchStock();
        
      }

    componentDidMount(){ 
      this.fetchStock() 
      this.getCategoryName()

    }

    getCategoryName = ()=>{
      
      let API_Call = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.state.value}&apikey=${API_KEY}`
      fetch(API_Call)
        .then(response=> response.json())
        .then(res => {
          if(res.Name){
            this.setState({
              name: res.Name
            })
          }
        })
        .catch(error=>{
          console.log(error)
        })
        
      
    }
    
    fetchStock(){
        // const stockName = this.props.stockName?this.props.stockName: stockName;
        const pointerToThis = this;
        //console.log(pointerToThis);
        
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.value}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction =[];
        let stockChartYValuesFunction =[];

        fetch(API_Call)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {

                      const metaData   = data["Meta Data"]?data["Meta Data"]:[]
                      const timeSeries = data["Time Series (Daily)"]?data["Time Series (Daily)"]: []
                      const key = metaData["3. Last Refreshed"]
                      const latest = timeSeries[key]
                    
                    //gets the variables for the X and Y data 
                    for (var point in timeSeries) {
                        stockChartXValuesFunction.push(point);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [point]['1. open']);
                        
                    }
            
                    
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        latestValues: {
                          key: key,
                          value:latest
                        }
                        
                    });

                    //Gets the stock symbol 
                    //if no data, a message is sent to user
                    
                   // if(!stockName){ alert("Nothing...")  }                
                    
                } 
            )              
          }
                    
    render() {
        const {stockChartXValues,stockChartYValues, value, latestValues} = this.state
        
        const isHeader = this.props.showHeader !== false
        

        return (
            <View style = {{flex: 1, backgroundColor: "#fff"}}>
               <View style={{margin: 20, marginBottom: 0}}>
               {
                 isHeader?
                  <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'space-space-between', alignItems: "center"}}>
                    <TextInput
                      style={{flex: 1}}
                      placeholder = {"Please Enter Value"}
                      value={this.state.value}
                      onChangeText={this.handleChange}
                    />
                    <Button 
                      onPress = {this.handleSubmit}
                      title = {"Select Stock"}
                    />
                  </View>
                  :<></>
               }
                
                
                  
               </View>

                
                <View style={{flex: 1}}>
                   <Plotly
                      style = {{flex: 1}}
                      data={[
                      {
                          //labels
                          x: stockChartXValues,
                          y: stockChartYValues,
                          type: 'scatter',
                          mode: 'lines',
                          marker: {color: '#FF8400'},
                      }
                      ]}
                      config = {{
                        editable: false,
                        showTips: false,
                        displayModeBar: false
                      }}
                      layout={{title: `${this.state.name} Stock Chart`} }

                  

                  />

                  <View style={{}}>
                  <Text style={styles.description}> Latest stock Price {latestValues?.value?latestValues.value["1. open"]: ""}</Text>
                  <Text style={styles.description}>as of {latestValues.key?latestValues.key: 0}</Text>
                  </View>

                </View>
          </View>
        )
    }
}

export default Stock;

const styles = StyleSheet.create({
  description: {
     textAlign: 'left',
     color: '#15317E',
     fontSize: 16,
     borderRadius: 5,
    },
});

