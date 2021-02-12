
import React, { Component , useEffect, useState }  from 'react'
import { View, Text, StyleSheet, Button, TextInput , SectionList, FlatList, Image, TouchableOpacity, ScrollView, ListItem} from "react-native";

import { Checkbox } from 'react-native-paper';

import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";

import AsyncStorage from '@react-native-community/async-storage';

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
  scrollView: {
    height: '20%',
    width: '80%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);


export const RealizadoScreen = ({ navigation , route}) => {
 

  const { CartScreen } = React.useContext(AuthContext);
 
  const [cart, setCart] = useState(route.params.params)
  console.log(cart)

  useEffect(() => {
    setCart(route.params.params)
   },[cart])



  function UpdateStorage(id) {

    var array = [...cart]; // make a separate copy of the array
  
    var index = array.findIndex(cart => cart.food.idproduto === id);

    console.log(index);

    if (index !== -1) {
      array.splice(index, 1);
      // console.log(array)
      setCart(array);


      AsyncStorage.setItem('cart',JSON.stringify(array));
  
  
    }

  }
  async function uploadImageAsync(uri) {
        await AsyncStorage.removeItem(key);
        return true;
    }

  const goNext = () => {
    // 
    // uploadImageAsync('cart').then((response)=>{
    //     console.log(response);
    //   }).catch((error)=>{
    //   });
      AsyncStorage.removeItem('cart');
    navigation.push('Inicio')
   
  };


 


  // const { nomeuser, idade, contato, password } = route.params.params;

//     const userData = UserModel()
//        
//     userData.nomeuser = nomeuser
//     userData.contato = contato
//     userData.password = password
//     userData.idade = idade
// 
//     userData.endereco = endereco
//     userData.UF = UF
//     userData.cidade = cidade
//     userData.bairro = bairro
//     userData.numeroendereco = numeroendereco
//     userData.complemento = complemento
  
const [checked, setChecked] = React.useState(false);



  return (
      <ScreenContainer>
         <View style={{flex:1}}>
       <View style={{alignItems: 'center',marginTop:80, }}>
        <Image
           source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Avi%C3%A3o%20de%20papel.png?alt=media&token=7c95a8a3-eff4-4f44-a760-ee1389d2fd04'}}
                    
          style={{
            width: '50%',
            height: 100,
            resizeMode: 'contain',
            margin: 30,
          }}
        />
      </View>


           
    <View style={{alignItems: 'center'}}>
           <Text  style={{fontSize: 15, alignItems:'center', color:'#13bc01', marginLeft: 55,
                marginRight: 55,marginTop:30, fontWeight:'bold'}} >Pedido feito com sucesso</Text>

          <Text  style={{fontSize: 13, alignItems:'center', color:'#4b4b4b', marginLeft: 55,
                marginRight: 55,marginTop:15,}} >Aguarde a confirmação do seu pedido e caso solicitado, o valor exato da sua compra via Whatsapp
              </Text>
          <Text  style={{fontSize: 13, alignItems:'center', color:'#4b4b4b', marginLeft: 55,
                marginRight: 55,marginTop:15,justifyContent:'center'}} >
                  Você pode verificar e cancelar em 'Meus Pedidos'
                </Text>
    </View>


    

           <TouchableOpacity
                        
                         onPress={() => {
                          goNext();
                        }}
                        style={{
                         
                          backgroundColor:'#13bc01',
                          alignItems:'center',
                          justifyContent:"center",
                          borderRadius:5,
                          padding:10,
                          marginLeft: 35,
                          marginRight: 35,
                          margin: 10,
                        }}>
                           
                          <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Entendi</Text>
                        
                        <View style={{width:10}} />

                      </TouchableOpacity>
                   
        </View>

      </ScreenContainer>
    
  );
};