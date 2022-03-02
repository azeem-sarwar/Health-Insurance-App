import React,{useEffect, useRef, useState} from 'react';
import {SafeAreaView,Text,View,StyleSheet,Dimensions, Modal, TouchableOpacity, ScrollView, FlatList, Image} from 'react-native';
import {PieChart, } from 'react-native-chart-kit';
import { VictoryPie } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyFormat} from "../helper"
import ModalInput from "./ModalInput";
import {useNavigation} from "@react-navigation/native"
// import { usePreventScreenCapture } from 'expo-screen-capture';
import * as ScreenCapture from 'expo-screen-capture';
import * as Sharing from 'expo-sharing';

// import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import ViewShot, { captureRef } from "react-native-view-shot";
// import {  } from 'react-native-gesture-handler';


const CompPieChart = ({displayOnly =false,history}) => {
  
  

  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(false);
  const [isPrompt, setIsPrompt] = useState(false);
  const [fileName, setFileName ] = useState("");
  const [screenShot, setScreenShot] = useState("");
  const [chartData, setChartData] = useState({
    isLoading: true,
    colors: [],
    data: []
  })

  const viewShotRef = useRef(null);

  const {salary, cashBonus, additionalComp, totalcompensation, totalhealthBenefit, totalpension , totalvacation , companyTicker, commuteCash, totalpension10, DBInflow, ChildCare, immidiateGain} = history
  

  useEffect(() => {
    setChartDataHandler();
    
    if(!displayOnly){
      navigation.setOptions({
        headerRight: ()=>{
          return <TouchableOpacity style={{marginRight: 5, alignSelf: 'center', flex: 1, justifyContent: 'center'}} onPress = {()=>{navigation.goBack()}}>
            <Text style={{color: "#fff", fontSize: 10, fontWeight: "700"}}>Keep Editing</Text>
          </TouchableOpacity>
        }
      })
    }
    
  }, [])
  

  const setChartDataHandler = async ()=>{
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      ScreenCapture.addScreenshotListener(() => {
        alert('Thanks for screenshotting my beautiful app 😊');
      });
    }
    const data = []
    if(salary > 0){
      data.push({
        name:'Salary',
        y:salary?parseFloat(salary): 0,
        label:salary?currencyFormat(parseFloat(salary)): 0,
        color: '#EDF38E',
      })
    }
    if(cashBonus > 0){
      data.push({
        name:'Cash Bonus',
        y:     cashBonus?parseFloat(cashBonus): 0,
        label: cashBonus?currencyFormat(parseFloat(cashBonus)): 0,
        color: '#F38EF0',
      })
    }
  
    if(additionalComp > 0){
      data.push({
        name: 'Additional Cash Comp',
        y: additionalComp?parseFloat(additionalComp): 0,
        label: additionalComp?currencyFormat(parseFloat(additionalComp)): 0,
        color: '#99F38E',
      })
    }
  
    
    
    if(commuteCash > 0){ 
      data.push({
        name: 'Commute Benefit',
        y: commuteCash?parseFloat(commuteCash): 0,
        label: commuteCash?currencyFormat(parseFloat(commuteCash)): 0,
        color: '#8EF3E4',
      })
    }
    
    
    if(ChildCare > 0){ 
      data.push({
        name: 'Childcare Expenses',
        y: ChildCare?parseFloat(ChildCare): 0,
        label: ChildCare?currencyFormat(parseFloat(ChildCare)): 0,
        color: '#FA2',
      })
    }
    
  
     if(totalpension > 0 ){
       data.push({
         name: 'Pension Benefits',
         y:totalpension?parseFloat(totalpension): 0,
         label:totalpension?currencyFormat(parseFloat(totalpension)): 0,
         color: '#F9E79F',
       })
     }
  
    if(totalvacation > 0){
      data.push({
        name: 'Value of Vacation Package',
        y: totalvacation?parseFloat(totalvacation): 0,
        label: totalvacation?currencyFormat(parseFloat(totalvacation)): 0,
        color: '#C68EF3',
      })
    }
  
    if(totalhealthBenefit > 0){
      data.push({
        name: 'Insurance Benefit',
        y:totalhealthBenefit?parseFloat(totalhealthBenefit): 0,
        label:totalhealthBenefit?currencyFormat(parseFloat(totalhealthBenefit)): 0,
        color: '#ACFC38',
      })
    }
    const colorScheme = data.map(item=>item.color)
    setChartData({
      ...chartData,
      isLoading: false,
      colors: colorScheme,
      data
    })

  }


  // const displayData = [
  //   {
  //     name:   'Salary',
  //     y:salary?parseFloat(salary): 0,
  //     label:salary?currencyFormat(parseFloat(salary)): 0,
  //     color: '#EDF38E',
  //   },
  //   {
  //     name: 'Cash Bonus',
  //     y:cashBonus?parseFloat(cashBonus): 0,
  //     label:cashBonus?currencyFormat(parseFloat(cashBonus)): 0,
  //     color: '#F38EF0',
  //   },
  //   {
  //     name:'Add Cash Comp',
  //     y:additionalComp?parseFloat(additionalComp): 0,
  //     label:additionalComp?currencyFormat(parseFloat(additionalComp)): 0,
  //     color: '#99F38E',
  //   },
  //   {
  //     name:'Commute Benefits',
  //     y:commuteCash?parseFloat(commuteCash): 0,
  //     label:commuteCash?currencyFormat(parseFloat(commuteCash)): 0,
  //     color: '#8EF3E4',
  //   },
  //   {
  //     name:'Health/ Dental Benefits',
  //     y:totalhealthBenefit?parseFloat(totalhealthBenefit): 0,
  //     label:totalhealthBenefit?currencyFormat(parseFloat(totalhealthBenefit)): 0,
  //     color: '#ACFC38',
  //   },
  //   {
  //     name:'Childcare Benefits',
  //     y:ChildCare?parseFloat(ChildCare): 0,
  //     label:ChildCare?currencyFormat(parseFloat(ChildCare)): 0,
  //     color: '#8EC4F3',
  //   },
  //   {
  //     name:'Value of Vacation Package',
  //     y:totalvacation?parseFloat(totalvacation): 0,
  //     label:totalvacation?currencyFormat(parseFloat(totalvacation)): 0,
  //     color: '#C68EF3',
  //   },
  //   {
  //     name:'Pension Benefits',
  //     y:totalpension?parseFloat(totalpension): 0,
  //     label:totalpension?currencyFormat(parseFloat(totalpension)): 0,
  //     color: '#F9E79F',
  //   },
    
  // ]

  
  
  // if(totalpension10 > 0){
  //   data.push({
  //     name: 'Total Pension Benefit in 10 years',
  //     y: totalpension10?parseFloat(totalpension10): 0,
  //     label: totalpension10?currencyFormat(parseFloat(totalpension10)): 0,
  //     // color: '#FAD7A0',
  //     color: '#4C8847',
  //   })
  // }
  
  // if(totalcompensation > 0){
  //   data.push({
  //     name: 'Total Pension Benefit',
  //     y: totalcompensation?parseFloat(totalcompensation): 0,
  //     label: totalcompensation?currencyFormat(parseFloat(totalcompensation)): 0,
  //     // color: '#FAD7A0',
  //     color: '#7A56BD',
  //   })
  // }

  


  const saveData = async()=>{
    if(fileName == ""){
      alert("Enter File Name to Save");
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


  if(chartData.isLoading){
    return <></>
  }
  
  const takeScreenShot = ()=>{
    captureRef(viewShotRef,{
      format: 'png',
      quality: 0.9,
      snapshotContentContainer: false,
    }).then(uri => {
      if(uri){
        // setScreenShot(uri)
        Sharing.shareAsync("file://" + uri);
      }
    }).catch(error=>{
      console.log(error)
    })
    // viewShotRef.current.capture()
  }
  

  return (
    <View style = {{flex: 1,}}>
      <ModalInput
        onSubmit = {saveData}
        onTextChange = {(text)=>{setFileName(text)}}
        visible = {isPrompt}
        toggle = {()=> setIsPrompt(!isPrompt)}
      />
      <Modal 
        animationType = {"slide"}
        visible = {screenShot !== ""} style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <TouchableOpacity  style={{alignSelf: 'flex-end', marginHorizontal: 20}} onPress={()=>{setScreenShot("")}}><Text>X</Text></TouchableOpacity>
          <Image source= {{uri: screenShot}} style={{width: "100%", height: "100%"}} resizeMode = {"contain"} />
          </View>
        </SafeAreaView>
      </Modal>
      {
        !displayOnly && (
          <View style ={{flexDirection: "row", justifyContent: 'space-between', marginTop: 5}}>

          <TouchableOpacity onPress={()=>navigation.replace("NewOfferQs")} style={[styles.Button1,{marginHorizontal: 10}]}>
            <Text style={[styles.historyBtnText]}>Compare Another Offer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setIsPrompt(true)} style={[styles.Button1,{marginHorizontal: 10}]}>
            <Text style={[styles.historyBtnText]}>Save Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takeScreenShot} style={[styles.Button1,{marginHorizontal: 10}]}>
            <Text style={[styles.historyBtnText]}>Share</Text>
          </TouchableOpacity>

            
          </View>
        )
      }


        <ScrollView 
          showsVerticalScrollIndicator = {false}
          // ref = {viewShotRef}
          // contentInsetAdjustmentBehavior="automatic"
        >
          <View style={{flex: 1}} ref = {viewShotRef}>
          <View style={{flex: 1,  justifyContent: 'center'}}>
              <VictoryPie
                data={chartData.data}
                padAngle={({ datum }) => 3}
                radius = {({datum}) => datum.name == selectedOption?.name ? 130 :120 }  
                labelRadius = { ({innerRadius}) => (Dimensions.get("screen").width /1.4) / 2 } 
                innerRadius = {45}
                colorScale = {chartData.colors}
                labelPlacement = {"parallel"}
                
                style = {{ 
                  labels: {
                    fill: '#636363'
                  },
                  parent: {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  },
                  border: 800
                  // borderWidth: 1
                  // labels: {
                  // }
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
                              setSelectedOption(chartData.data[props.index])
                            }
                          }
                        ]
                    }
                  }
                }]}
              />
          </View>
          <View style={{flex:.7,backgroundColor: '#0FBC8B', borderTopRightRadius: 40, borderTopLeftRadius: 40, paddingHorizontal: 20, paddingVertical: 30}}>
            <FlatList
              data = {chartData.data}
              numColumns = {2}
              keyExtractor = {(item)=>item.color}
              renderItem = {({item})=>{
                return(
                  <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{paddingVertical: 10,}]}>
                      <View style={[styles.dot,{backgroundColor: selectedOption?.name == item.name?`${item.color}`:"white"}]} />
                      <View style={{flex: 1,}}>
                        <View style={{marginBottom: 5}}>
                          <Text style={{color: "#fff", fontSize: 12}}>{item.name}</Text>
                        </View>
                        <Text style={{color: "#fff", fontWeight: '700',fontSize: 12}}>{currencyFormat(item.y)}</Text>
                      </View>
                  </TouchableOpacity>
                )
              }}
              ListHeaderComponent = {()=>(
                <View style= {{flexDirection: 'row'}}>

                    <View style={{flex: 1,flexDirection: 'row', marginRight: 5}}>
                      {/* <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{paddingVertical: 10,}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12}}>Your Annual Vacation Value</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(totalvacation?totalvacation:0)}</Text>
                        </View>
                      </TouchableOpacity> */}
                      
                      <View style={[styles.row,{paddingVertical: 10,}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12, fontWeight: "bold"}}>Total Annual Compensation</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(totalcompensation?totalcompensation:0)}</Text>
                        </View>
                      </View>
                    </View>
                      
                      
                      <View  style={[styles.row,{paddingVertical: 10}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12, fontWeight: "bold"}}>Pension Value over 10 years</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(totalpension10?totalpension10:0)}</Text>
                        </View>
                      </View>

                      <View style={[styles.row,{paddingVertical: 10}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12, fontWeight: "bold"}}>{"Immidiate Gain on Stock Options"}</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(immidiateGain?immidiateGain:0)}</Text>
                        </View>
                      </View>
                      
                      

                    <View style={{flexDirection: 'row'}}>
                    {/*
                      <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{paddingVertical: 10,}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12}}>Total Pension Benefit</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(totalpension?totalpension:0)}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress = {()=>setSelectedOption(item)} style={[styles.row,{paddingVertical: 10,}]}>
                        <View style={[styles.dot,{backgroundColor: "white"}]} />
                        <View style={{flex: 1,}}>
                          <View style={{marginBottom: 5}}>
                            <Text style={{color: "#fff", fontSize: 12}}>Total Pension Benefit in 10 years</Text>
                          </View>
                          <Text style={{color: "#fff", fontWeight: '700'}}>{currencyFormat(totalpension10?totalpension10:0)}</Text>
                        </View>
                      </TouchableOpacity>
                    */}
                    </View> 
                    

                </View> 
              )}
            />
            

          </View>
          </View>
          </ScrollView>
      </View>
  );
};



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
    marginRight: 10,
    // borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Button1: {
     marginVertical: 5,
     alignItems: 'center',
     justifyContent: 'center',
    //  backgroundColor: '#15317E',
     backgroundColor: '#0FBC8B',
     shadowColor:'black',
     padding: 10,
     borderRadius: 10,
     flex: 1
     
   },
  historyBtnText: {
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
  },
   
})

