import React,{useState} from 'react';
import {SafeAreaView,Text,View,StyleSheet,Dimensions, ScrollView, TouchableOpacity, Flatlist, FlatList} from 'react-native';
import {PieChart, } from 'react-native-chart-kit';
import { VictoryPie } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat} from "../helper"
import ModalInput from "./ModalInput";
import {useNavigation} from "@react-navigation/native"

const CompPieChart = ({displayOnly =false,history}) => {
  
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(false);
  const [isPrompt, setIsPrompt] = useState(false);
  const [fileName, setFileName ] = useState("");
  
  const {salary = 10, cashBonus = 10, additionalComp = 10, totalcompensation, totalpension = 10, totalvacation = 10, companyTicker = 10, commuteCash = 10} = history
  
  const displayData = [
    {
      name:   'Salary',
      y:salary?parseFloat(salary): 0,
      label:salary?currencyFormat(parseFloat(salary)): 0,
      color: '#96DDEC',
    },
    {
      name: 'Cash Bonus',
      y:cashBonus?parseFloat(cashBonus): 0,
      label:cashBonus?currencyFormat(parseFloat(cashBonus)): 0,
      color: '#85C1E9',
    },
    {
      name:'Additional Cash Compensation',
      y:additionalComp?parseFloat(additionalComp): 0,
      label:additionalComp?currencyFormat(parseFloat(additionalComp)): 0,
      color: '#D5F5E3',
    },
    {
      name:'Commute Benefit',
      y:commuteCash?parseFloat(commuteCash): 0,
      label:commuteCash?currencyFormat(parseFloat(commuteCash)): 0,
      color: '#73C6B6',
    },
    {
      name:'Vacation Value',
      y:totalvacation?parseFloat(totalvacation): 0,
      label:totalvacation?currencyFormat(parseFloat(totalvacation)): 0,
      color: '#FAD7A0',
    },
    {
      name:'Pension Benefits',
      y:totalpension?parseFloat(totalpension): 0,
      label:totalpension?currencyFormat(parseFloat(totalpension)): 0,
      color: '#F9E79F',
    },
    
  ]

  let data = [{
    name:'Salary',
    y:salary?parseFloat(salary): 10,
    label:salary?currencyFormat(parseFloat(salary)): 10,
    // color: '#96DDEC',
    color: '#7857FE',
  }]

  

  if(additionalComp > 0){
    data.push({
      name: 'Additional Cash Compensation',
      y: additionalComp?parseFloat(additionalComp): 0,
      label: additionalComp?currencyFormat(parseFloat(additionalComp)): 0,
      color: '#D5F5E3',
    })
  }

  if(cashBonus > 0){
    data.push({
      name:'Cash Bonus',
      y:     cashBonus?parseFloat(cashBonus): 0,
      label: cashBonus?currencyFormat(parseFloat(cashBonus)): 0,
      // color: '#85C1E9',
      color: '#31EC36',
    })
  }
  
  if(commuteCash > 0){ 
    data.push({
      name: 'Commute Benefit',
      y: commuteCash?parseFloat(commuteCash): 0,
      label: commuteCash?currencyFormat(parseFloat(commuteCash)): 0,
      // color: '#73C6B6',
      color: '#FEA9DD',
    })
  }

  if(totalpension > 0 ){
    data.push({
      name: 'Pension Benefits',
      y:totalpension?parseFloat(totalpension): 0,
      label:totalpension?currencyFormat(parseFloat(totalpension)): 0,
      // color: '#F9E79F',
      color: '#FBFE40',
    })
  }

  if(totalvacation > 0){
    data.push({
      name: 'Vacation Value',
      y: totalvacation?parseFloat(totalvacation): 0,
      label: totalvacation?currencyFormat(parseFloat(totalvacation)): 0,
      // color: '#FAD7A0',
      color: '#9B44B9',
    })
  }

  


  const saveData = async()=>{
    if(fileName == ""){
      alert("Please enter file Name first");
      return
    }
    
    const oldOfferData = await AsyncStorage.getItem('offerData');
    
    try {
      if(oldOfferData){
        await AsyncStorage.setItem('offerData', JSON.stringify([...JSON.parse(oldOfferData),{history,fileName}]))
      }else{
        await AsyncStorage.setItem('offerData', JSON.stringify([{history, fileName}]))
      }
      alert("Data Saved. Check User Profile")
      setIsPrompt(false);
    }catch (e) {
      setIsPrompt(false);
      // saving error
      alert("Couldn't Save Your Data")
    }
  }

  const colorScheme = data.map(item=>item.color)

  return (
    <View style = {{flex: 1,}}>
        <View style={{flex: 1,  justifyContent: 'center'}}>
            <VictoryPie
              data={data}
              height = {280}
              radius = {({datum}) => datum.name == selectedOption?.name ? 140 :130 }  
              labelRadius = { ({innerRadius}) => (Dimensions.get("window").width /4 + innerRadius) / 2 } 
              innerRadius = {70}
              colorScale = {colorScheme}
              style = {{ 
                parent: {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }
              }}
              events ={[{
                target: "data",
                eventHandlers: {
                  onPress: () => {
                      return [
                        {
                          target: "labels",
                          mutation: props => {
                            // let name = data[props.index].name;
                            setSelectedOption(data[props.index])
                          }
                        }
                      ]
                  }
                }
              }]}
            />
        </View>
        <View style={{flex:.45,backgroundColor: '#0FBC8B', borderTopRightRadius: 40, borderTopLeftRadius: 40, paddingHorizontal: 20, paddingVertical: 30}}>
          <FlatList
            data = {data}
            numColumns = {2}
            keyExtractor = {(item)=>item.color}
            renderItem = {({item})=>{
              return(
                // <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{marginHorizontal: 5,backgroundColor: selectedOption?.name == item.name?`${item.color}55`:"transparent"}]}>
                <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{paddingVertical: 10,}]}>
                    <View style={[styles.dot,{backgroundColor: selectedOption?.name == item.name?`${item.color}`:"white"}]} />
                    <View style={{flex: 1,}}>
                      <View style={{marginBottom: 5}}>
                        <Text style={{color: "#fff", fontSize: 12}}>{item.name}</Text>
                      </View>
                      <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(item.y)}</Text>
                    </View>
                </TouchableOpacity>
              )
          }}
          />
        </View>
    </View>
  );
};

// {
//         !displayOnly && (
//           <View style ={{}}>
//           <TouchableOpacity onPress={()=>setIsPrompt(true)} style={[styles.Button1,{marginHorizontal: 10}]}>
//             <Text style={[styles.historyBtnText]}>Save Data</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={()=>navigation.replace("NewOfferQs")} style={[styles.Button1,{marginHorizontal: 10}]}>
//             <Text style={[styles.historyBtnText]}>Compare Another Offer</Text>
//           </TouchableOpacity>

//           <ModalInput
//             onSubmit = {saveData}
//             onTextChange = {(text)=>{setFileName(text)}}
//             visible = {isPrompt}
//             toggle = {()=> setIsPrompt(!isPrompt)}
//           />
//           </View>
//         )
//       }


export default CompPieChart;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width:  10,
    top: 2,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "white"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Button1: {
     marginVertical: 5,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#15317E',
     shadowColor:'black',
     padding: 10,
     borderRadius: 10
     
   },
   historyBtnText: {
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
      },
   
})

