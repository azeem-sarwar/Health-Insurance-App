import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image,  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Constants from 'expo-constants';
import ImageHeader from './src/ImageHeader.js';
import JobOfferImage from './src/Images/JobOffer.png';    
import LogoImage from './src/Images/Aim84.png'; 

import CompPieChart from './src/components/CompPieChart'; 

import { FontAwesome } from '@expo/vector-icons';


import OptionCalculator from './src/OptionCalculator';
import { BackgroundHeaderScreen } from './src/BackgroundHeaderScreen';
import HealthInsurance from './src/HealthInsuranceScreen';

import { DetailScreen } from './src/DetailScreen';

import NewOfferQs   from './src/NewOfferQs';
import History from './src/History';
import  AllCalcs  from './src/ESPPCalcs';
import ESPPExplanation from './src/ESPPExplanation';
import HomeScreen from "./src/screens/HomeScreen";
import CompensatonView from "./src/screens/CompensatonView";
import PurchasePlan from "./src/screens/PurchasePlan";
import UserProfile from "./src/screens/UserProfile";
import OptionsVestingSchedule from './src/OptionsVestingSchedule';
import OptionGrantWorth from './src/OptionGrantWorth';
import Taxes from './src/Taxes';


import PublicVestingSchedule from './src/PublicVestingSchedule';
import PriveteVestingSchedule from './src/PriveteVestingSchedule';



import Stock from "./src/stock/Stock";

const OfferTitle              = () => <Image source={JobOfferImage} style={{ width: 45, height: 45 }} /> 
const LogoTitle               = () => <Image source={LogoImage} style={{ width: 45, height: 42 }}/> 
const MyCustomHeaderBackImage = () => <Image source={LogoImage} style={{width: 45, height: 45}} />


const HeaderRightProfileIcon   = () => {
  const navigation = useNavigation();
  return(
    <TouchableOpacity style={{paddingHorizontal: 10}} onPress={()=>navigation.navigate("UserProfile")}>
      <FontAwesome name = {"user"} size = {25} color = {"white"} />
    </TouchableOpacity>
  )
}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer > 
      <Stack.Navigator
        initialRouteName="Home"
        // initialRouteName="NewOfferQs"
        options={{
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: "#008484",
              fontWeight: 'bold',
              padding: 10,
            },
            // headerBackImage: MyCustomHeaderBackImage,
          }}
        >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerTintColor: '#ffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              fontWeight: 'bold',
              shadowColor: 'transparent',
            },
            
            headerLeft: MyCustomHeaderBackImage,
            headerRight: HeaderRightProfileIcon,
              
            }}
        />

           
        
        <Stack.Screen
          name="NewOfferQs"
          component={NewOfferQs}
          options={{
            headerBackTitleVisible: false,
            title: 'New Offer Evaluation',
            headerTintColor: '#ffffff',
            headerStyle: {
              // backgroundColor: "#008484",
              backgroundColor: "#0FBC8B",
              elevation: 0,
              shadowColor: 'transparent',
            },
            // headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        <Stack.Screen
          name="PriveteVestingSchedule"
          component={PriveteVestingSchedule}
          options={{
            headerBackTitleVisible: false,
            title: 'Vesting Valuation',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerBackTitleVisible: false,
            title: 'User Profile',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        <Stack.Screen
          name="CompensatonView"
          component={CompensatonView}
          options={{
            headerBackTitleVisible: false,
            title: 'Compensation',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        <Stack.Screen
          name="PurchasePlan"
          component={PurchasePlan}
          options={{
            headerBackTitleVisible: false,
            title: 'Purchase Plan',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "rgb(0, 132, 37)",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        <Stack.Screen
          name="PublicVestingSchedule"
          component={PublicVestingSchedule}
          options={{
            headerBackTitleVisible: false,
            title: 'Vesting Calculations',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        
        <Stack.Screen
          name="OptionGrantWorth"
          component={OptionGrantWorth}
          options={{
            headerBackTitleVisible: false,
            title: 'Options Grant Worth',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
          
        />
        
         {/* Default Header */}
        <Stack.Screen
          name="ESPPCalculator"
          component={AllCalcs}
          options={{
            headerBackTitleVisible: false,
            title: 'ESPP Calculator',
            headerTintColor: '#ffffff',
            headerStyle: { 
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
              headerBackImage: MyCustomHeaderBackImage,
          }}
        />

        {/* Background Header */}
        <Stack.Screen
        name="TaxImplications"
        component={Taxes}
          options={{
            headerBackTitleVisible: false,
            title: 'Tax Implications',
            headerTintColor: '#ffffff',
            headerStyle: { 
             backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
              headerBackImage: MyCustomHeaderBackImage,
          
          }}
        />
        
        <Stack.Screen
        name="OptionCalculator"
        component={OptionCalculator}
          options={{
            headerBackTitleVisible: false,
            title: 'Option Calculator',
            headerTintColor: '#ffffff',
            headerStyle: { 
             backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
              headerBackImage: MyCustomHeaderBackImage,
          
          }}
        />
        <Stack.Screen
        name="OptionsVestingSchedule"
        component={OptionsVestingSchedule}
          options={{
            headerBackTitleVisible: false,
            title: 'Vesting Schedule',
            headerTintColor: '#ffffff',
            headerStyle: { 
             backgroundColor: "#008484",
              elevation: 0, 
              shadowColor: 'transparent',
            },
              headerBackImage: MyCustomHeaderBackImage,
          
          }}
        />

        {/* Sub Header */}
        <Stack.Screen
          name="HealthInsurance"
          component={HealthInsurance}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#ffffff',
            title: 'Health Insurance Comparison',
            headerStyle: { 
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
              headerBackImage: MyCustomHeaderBackImage,
          
          }}
        />

        

        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#ffffff',
            title: 'Compensation & Evaluation',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
        />
        
        <Stack.Screen
          name="Stock"
          component={Stock}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#ffffff',
            title: 'History',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
        />


         <Stack.Screen
          name="ESPPExplanation"
          component={ESPPExplanation}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#ffffff',
            title: 'CompAim',
            headerStyle: {
              backgroundColor: "#008484",
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerBackImage: MyCustomHeaderBackImage,
          }}
        />

        <Stack.Screen
          name="HistoryScreen"
          component={History}
          options={{
            title: 'History Screen',
                      }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
