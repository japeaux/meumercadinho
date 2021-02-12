// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, Button, SafeAreaView,Dimensions,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

import BlankSpacer from "react-native-blank-spacer";
import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import UserModel  from "../../../src/model/UserModel";

export const ADMClienteScreen = ({navigation , route}) => {
  
  const { nomeuser, endereco, numeroendereco, complemento, bairro, cidade, UF, cep, contato, datadecriacao, dataultimopedido, devicetoken ,email, cpfnanota, estado, genero, idade, iduser } = route.params.params;
  const [data, setData] = useState([]);
  const [dataultimopedido2, setdatadataultimopedido] = useState(dataultimopedido);

  useEffect(() => {
     var dArr =  dataultimopedido.split("-");  // ex input "2010-01-18"
    console.log(dArr)
     var dArrAux = dArr[2][3]+dArr[2][4]+dArr[2][5]+dArr[2][6]+dArr[2][7]+'  '+dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                   

   setdatadataultimopedido(dArrAux)
   console.log(dataultimopedido2)
    fetch('https://app.diwoapp.com.br/whitela/ws/getmaisvendidosbyuser.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iduser: iduser,
        }),
      }).then(res => res.json())
          .then(resJson => {
            
            //console.log(resJson)
           
            setData(resJson);
        }).catch(e => console.log(e));
   
  },[]);


  const ItemList = ({item}) => {

    const [data, setData] = useState(item);
    

    return (

      <View key= {item.idproduto}          style={{      flex: 1, padding:10,
                marginLeft: 35,
                marginRight: 35,
                margin: 1,borderRadius:4}}>
            
          <View style={{flexDirection:'row',}}>
            <Image style={styles.image} source={{ uri: item.profilepic }} />
            <View>
              
              <Text style={{fontSize:12, fontWeight:'bold', color:"#4b4b4b",
          marginLeft: 15,
          marginRight: 15,
          margin: 3,}}>
                {item.nomeproduto}
              </Text>

           <Text style={{fontSize:12, fontWeight:'bold', color:"#4b4b4b",
          marginLeft: 15,
          marginRight: 15,
          margin: 0,}}>
            {item.n} {item.valorpor} 
          </Text>
            </View>

          </View>
          

      </View>
    );
  };


  
  return (
     <SafeAreaView style={{flex: 1}}>
    
   
      <View style={{ flex: 1}}>
        
       <View style={{flexDirection:'row',}}>
        <Text style={{fontSize:14, fontWeight:'bold', color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Cliente:
        </Text>
              <Text style={{fontSize:11, color:"#4b4b4b", marginTop: 20,
              marginLeft: 105,
              marginRight: 105,
              margin: 1,fontWeight:'bold', justifyContent: 'flex-end',
              alignItems: 'center'}}>
               Último pedido {dataultimopedido2}
            
            </Text>
        </View>
         
             <Text style={{fontSize:14, color:"#4b4b4b", 
              marginLeft: 15,
              marginRight: 15,
              margin: 1,}}>
             {nomeuser}  
             </Text>
       
      <Text style={{fontSize:14, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Contato:
        </Text>
         <Text style={{fontSize:14, color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 1,}}>
         {contato}
        </Text>
  

      <Text style={{fontSize:14, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Endereço:
        </Text>
         <Text style={{fontSize:14, color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 1,}}>
         {endereco}, {numeroendereco}, {complemento}
        </Text>
  


      <Text style={{fontSize:14, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Produtos mais pedidos
        </Text>
       
          

          <View style={{      flex: 1}}>
            <ScrollView style={{ flex: 1 }}>
                  {data.map((item, key) => (
                <ItemList
                  key={item.idproduto}
                  item={item}
                />
              ))}
            </ScrollView>
         </View>

           <BlankSpacer height={64} />
      </View>

          
  </SafeAreaView>
  );
};
export default ADMClienteScreen;

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
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  image: {
    height: 50,
    width : 50,
    borderRadius: 4,
  },
});