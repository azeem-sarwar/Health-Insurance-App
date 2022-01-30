import React, {useState} from 'react';
import { Text, TouchableOpacity, Animated, View, TextInput, StyleSheet, Button, Navigation, Pressable,ScrollView, Keyboard,  TouchableWithoutFeedback, Platform,  SafeAreaView, Switch, Modal, Picker, FlatList, KeyboardAvoidingView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';




const ESPPModal = ({ModalOpen, setModalOpen})=>{
  return (
    <Modal visible={ModalOpen} animationType='slide' style={styles.modal}> 
        <ScrollView style={styles.scrollView}>
        <View style={styles.container1}> 
          
            <Ionicons name="close-circle-outline" size={32} color="#15317E" 
              style={styles.modal}
              onPress={() => setModalOpen(false)}
            />
  
            <Text style={styles.header}>
          Job Offers:
            </Text>
            
            <Text style={styles.modalquestions}>
            What is the best way to compare job offers?
            </Text>

            <Text style={styles.modalexplanation}>
            ...
            </Text>
            
            <Text style={styles.modalquestions}>
            ..? ..?
            </Text>

            <Text style={styles.modalexplanation}>
            ...
          </Text>

          <Text style={styles.modalquestions}>
          Are ESPPs good investments?
          </Text>

          <Text style={styles.modalexplanation}>
          ...
        </Text>
        <Text style={styles.modalquestions}>
        ...?
        </Text>
        <Text style={styles.modalexplanation}>
        ... 
        </Text>
        <Text style={styles.modalquestions}>
        ...?
        </Text>
        <Text style={styles.modalexplanation}>
        .....

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
    padding: 8,
    fontSize: 20,
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
