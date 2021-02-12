
import React, { Component , useEffect, useState }  from 'react'
import { View, Text, StyleSheet, Button, TextInput ,TouchableOpacity, Image, Alert} from "react-native";


import { AuthContext } from "../../src/context";
//import {styles} from '../components/styles';     
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  input:{

    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    fontSize: 15, 
    width:'100%'
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const LoginScreen = ({ navigation , props}) => {
  const { LoginScreen } = React.useContext(AuthContext);

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const Login = (login,senha) => {
    //console.log(cesta)
    console.log(login)
    var auxlogin = '55'+login
    console.log(auxlogin)
    LoginScreen(auxlogin,senha).then(response =>{
      console.log(response)
        if(response == 'Não foi possível completar login, senha ou contato inválido'){
          Alert.alert(
            "Falha ao entrar",
            response,
            [
              
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel"
              // },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
          );
        }
        
      })
    }

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../Image/imgcapa.jpg')}
          style={{
            width: '50%',
            height: 100,
            resizeMode: 'contain',
            margin: 30,
          }}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 15,   
            marginLeft: 35,
            marginRight: 35,
            margin: 10,
            alignItems: 'center',}}>Minha Horta</Text>
      </View>


        <View style={{flexDirection: 'row', alignItems: 'center',    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
          <Text style={{fontSize: 20,fontWeight:'bold', color:'#13bc01'}}>+55</Text>
      
            <TextInput  style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Número de contato"
               placeholderTextColor = "#8b9cb5"
               keyboardType="numeric"
               autoCapitalize = "none"
               onChangeText={login => setLogin(login)}
              />
            
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Senha"
               placeholderTextColor = "#8b9cb5"
               autoCapitalize = "none"
                onChangeText={senha => setSenha(senha)} />
          
        </View>

      

     <TouchableOpacity
              
              onPress={() => Login(login,senha)} 
              style={{
               
                backgroundColor:'#13bc01',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:5,
                marginLeft: 15,
                marginRight: 15,
                margin: 5,
              }}>
                 
              <Text style={{fontSize:15, color:"white", fontWeight:"bold"}}>Entrar</Text>
              
              <View style={{width:10}} />

    </TouchableOpacity>

        
     <TouchableOpacity
              
              onPress={() => navigation.push("RegisterScreen")}
              style={{
               
                backgroundColor:'#13bc01',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:5,
                marginLeft: 15,
                marginRight: 15,
                margin: 5,
              }}>
                 
              <Text style={{fontSize:15, color:"white", fontWeight:"bold"}}>Criar uma conta</Text>
              
              <View style={{width:10}} />
              
    </TouchableOpacity>
       
          
          


    </View>
  );
};