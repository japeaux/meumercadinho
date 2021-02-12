// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, Button, SafeAreaView,Alert,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import ProdutoModel  from "../../../src/model/ProdutoModel";
import AuxModel  from "../../../src/model/AuxModel";

import AsyncStorage from '@react-native-community/async-storage';

export const ADMSendNotifScreen = ({navigation , props}) => {
  

  const { SendMultiplePushNotification } = React.useContext(AuthContext);
  const [nomeproduto, setnomeproduto] = useState('');
  const [descricao, setdescricao] = useState('');

  const EnviaNotif = () => {
    
    console.log(cart)
    cart.forEach(function (element) {
          
            element.title = nomeproduto;
            element.body = descricao;
          });
    SendMultiplePushNotification(cart)
  };

    const [cart, setCart] = useState([]);

   useEffect(() => {
      AsyncStorage.getItem('notificausers').then((datacart)=>{
         if (datacart !== null) {
           // We have data!!
           const cart = JSON.parse(datacart)
      
            cart.forEach(function (element) {
            
              element.to = element.devicetoken
              element.title = '';
              element.body = '';
              element.priority= "high"
              element.sound="default"
              element.channelId="default" 
            });
          
           console.log(cart)
           setCart(cart);

        
         }
         else{
          const cart  = []
           //setCart(cart);
         }
        // console.log(cart)
       })
       .catch((err)=>{
         alert(err)
       })
  },[]);

  
  return (
    
    <View style={{flex: 1}} >
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>




        <KeyboardAvoidingView enabled>

           <Text style={{fontSize: 13, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
             Título da notificação
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nomeproduto) => setnomeproduto(nomeproduto)}
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
          
              blurOnSubmit={false}
            />


            <Text style={{fontSize: 13, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
             Texto da notificação
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (descricao) => setdescricao(descricao)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
          
              blurOnSubmit={false}
            />



        </KeyboardAvoidingView>
           <TouchableOpacity
                      
                    onPress={() => {EnviaNotif();
                    }}
                      style={{
                       
                        backgroundColor:'#13bc01',
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:10,
                        marginLeft: 15,
                        marginRight: 15,
                        margin: 10,
                      }}>
                         
                      <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Enviar notificação</Text>
                      
                      <View style={{width:10}} />

                  </TouchableOpacity>

      </ScrollView>

    </View>
  );
};
export default ADMSendNotifScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#2b2b2b',
    // paddingLeft: 15,
    // paddingRight: 15,
    borderColor: '#dadae8',
      marginLeft: 35,
    marginRight: 35,
    fontSize: 13,   width:'50%'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    padding: 30,
  },
});