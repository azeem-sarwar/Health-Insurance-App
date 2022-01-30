import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView, Image, Dimensions, Vibration, Alert } from 'react-native';
import { StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Swiper from 'react-native-swiper'


const array = [

  {
    image: require('../../Images/Sally1.png'),
    title: `Employee Stock Purchase\nPlan Calculator`,
    subtitle: "An Employee Stock Purchase Plan (ESPP) is an employer benifit offred some publicly traded compaines that allows employees to purchase chares of their company’s stock at a discount",
  },
  {
    image: require('../../Images/Sally2.png'),
    title: `Employee Stock Purchase\nPlan Calculator`,
    subtitle: "If you have access to an ESPP at work, you may be unsure if it’s a good investment. You also might wonder how it’s taxed and whether to enroll in it.",
  },
  {
    image: require('../../Images/Calculator.png'),
    title: `Employee Stock Purchase\nPlan Calculator`,
    subtitle: "Enter data below to evaluate potential benefits your ESPP plan offers and to access if Your Company's Stock could be a good investment ",
  },
  
]


const Swipper = ({setActiveSection, activeSection}) => {
return (
  <Swiper 
      style={styles.wrapper} 
      showsButtons={true} 
      paginationStyle = {{marginBottom: 90}}
      dot = {<View style= {[styles.dot,{backgroundColor:'lightgray'}]} />}
      activeDot = {<View style= {[styles.dot,{backgroundColor: "#0BDE28"}]} />}
      // index = {activeSection}
      onIndexChanged = {setActiveSection}
      loop = {false}
      buttonWrapperStyle = {{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        
      }}
      
      nextButton = {<View  style={[styles.btn]}><Text style={[styles.btnText]}>Next</Text></View>}
      prevButton = {(activeSection < array.length-1)? <View style={[styles.btn]}><Text style={{color: "white"}} >Previous</Text></View>:<TouchableOpacity  style={[styles.btn]} onPress = {()=>{setActiveSection("done")}}>
      <Text style={[styles.btnText]}>Calculate</Text>
        </TouchableOpacity>}
    >
          {
            array.map(slide=>{
              return(
                <View style = {{flex: 1}}>
                    <View style={styles.topBg}>
                      <Image style={{width: 300, height: 300,  left: 1, borderRadius: 100, alignItems: 'center',justifyContent: 'center'}} source={slide.image} />
                    </View>
                    <View style = {{flex: 1, marginHorizontal: 10,marginTop: 30,}}>
                      <Text style = {styles.header}>{slide.title}</Text>
                      <Text style = {styles.underHeaderText}>{slide.subtitle}</Text>
                    </View>
                </View>
              )
            })
          }
        
      
    </Swiper>
)}


const styles = StyleSheet.create({

  underHeaderText: {
    color: "rgb(0, 81, 3)",
    borderRadius: 10,
    fontWeight: "500",
    fontFamily: "Poppins",
    letterSpacing: 0,
    textAlign: "left",
    fontSize: 15,
    marginTop: 20,
    padding: 5,
    marginBottom: 20,
               },
  
  header: {
    // marginTop: 35,
    // marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008425',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    // marginBottom: 20,
  },
  
  dot: {
    height: 20,
    width: 20, 
    marginHorizontal: 5,
    borderRadius: 100,
  },



btn: {
  alignItems: 'center', 
  justifyContent: 'center', 
  height: 50,
  fontSize: 18,
  width: (Dimensions.get("window").width)-25,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#D3D3D3',
  padding: 15,
  borderRadius: 10, 
  shadowColor:'black', 
  marginVertical: 10,
  marginHorizontal: 5,
  marginBottom: 20,
},

btnText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: "#008425",
  alignSelf: "center",
},
topBg: {
  backgroundColor: "#fff", 
  // borderWidth: 3,
  // borderColor: '#D3D3D3',
  // padding: 15,
  // borderRadius: 10, 
  // paddingVertical: 20,
  
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  //borderColor: 'rgb(15,188,139)', 
  borderBottomRightRadius: 50,
  borderBottomLeftRadius:  50,
  alignItems: 'center',
  justifyContent: 'center'
},
btn1: {
  // flex: 1,
  alignItems: 'center', 
  justifyContent: 'center', 
  height: 50, 
  // backgroundColor: '#15C951', 
  backgroundColor: '#D3D3D3',
  borderWidth: 1,
  borderColor: '#D3D3D3',
  padding: 15,
  borderRadius: 10, 
  shadowColor:'black', 
  marginVertical: 10,
},
  
 });


export default Swipper;