import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';


const ModalInput = ({ onTextChange, onSubmit, visible, value, toggle }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      style={{ justifyContent: 'center' }}>
      <View style={{flex: 1, backgroundColor: 'rgba(3,3,3,.5)',justifyContent: 'center'}}>
      <View
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingVertical: 40,
          marginHorizontal: "10%",
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <TextInput
          value={value}
          placeholderTextColor = {"gray"}
          style = {{color: "gray"}}
          onChangeText={onTextChange}
          placeholder={'Please Enter File name'}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
          <Button title="Close" onPress={toggle} />
          <Button title="Save" onPress={onSubmit} />
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default  ModalInput

