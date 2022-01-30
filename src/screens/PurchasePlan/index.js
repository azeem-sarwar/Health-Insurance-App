import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Navigation, Image, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

function index({ navigation }) {

  const [data, setData] = React.useState(false)

  React.useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    try {
      const oldesppCalcs = await AsyncStorage.getItem('esppCalcs');
      if(oldesppCalcs){
        setData(JSON.parse(oldesppCalcs))
      }else {
        setData([])
      }
      
    }catch (e) {
        setData([])
      // saving error
      alert("There is a Problem Fetching Data")
    }
  }
  
  const deleteHandler = async(index)=>{
    
    Alert.alert(
      "Delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: async() => {
          
          data.splice(index, 1);
          await AsyncStorage.setItem("esppCalcs",JSON.stringify(data));
          navigation.goBack()
          
        }}
      ]
    );
  }


  return (
    <View style={styles.container}>
      {
        (data == false || data.length == 0)?
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {
            data === false?
            <ActivityIndicator color = {"black"} />
            :
            <Text>There is No Data Stored Yet...</Text>
          }
        </View>
        :



        <FlatList
          keyExtractor = {(item,index) => index }
          data = {data}
          renderItem = {({item, index})=>{
            return(
              <TouchableOpacity style={styles.item} onPress = {()=>{ navigation.navigate('History',{history: item.history,displayOnly: true })}}>
                <Text style={styles.text}>{index + 1}</Text>
                <Text style={styles.text}>{item.fileName}</Text>
                <TouchableOpacity 
                  style={{ 
                      alignItems: "center", 
                      justifyContent: "center", 
                      height: 30, width: 30, borderRadius: 30, backgroundColor: 'rgba(246,9,30,.5)'}} 
                  onPress = {()=>{deleteHandler(index)}}
                  
                  >
                  <MaterialIcons name={"delete"} style={{fontSize: 16, color: 'white'}}/>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }}
        
        />
      }
    </View>
  );
}


export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
    // backgroundColor: '#15317E',
   },
   item: {
     backgroundColor: "white",
     padding: 20,
     marginVertical: 10,
     marginHorizontal: 3,
     alignItems: 'center',
     justifyContent: 'space-between',
     borderRadius: 10,
     shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      flexDirection: 'row',
      elevation: 3,
   },

   text: {
     fontSize: 15,
     color: "#15317E"
   }
});