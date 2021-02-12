
import React, { Component , useEffect, useState }  from 'react'
import { View, Text, StyleSheet, Button, TextInput , SectionList, FlatList, Image, TouchableOpacity, ScrollView, ListItem} from "react-native";
import { Checkbox } from 'react-native-paper';
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";
import PedidoModel  from "../../src/model/PedidoModel";

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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
   row: {
 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  checkboxContainer: {
     marginLeft: 35,
    padding: 5,
  },
  label: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);


export const ValorConfirmaScreen = ({ navigation , route}) => {
 

  const { CartScreen } = React.useContext(AuthContext);
  const { TypeCompra, CestinhaPreco } = route.params.params;
// 
//   const [cart, setCart] = useState(route.params.params)
//   console.log(cart)
// 
//   useEffect(() => {
//     setCart(route.params.params)
//    },[cart])

  const pedido = PedidoModel()
       
    //pedido.idofertas = nomeuser
    // pedido.nomeoferta = contato
    // pedido.valoroferta = preco
    // pedido.metodopagamento = idade
    // pedido.datadecriacao = endereco
    // pedido.idnegocio = UF
    // pedido.nomenegocio = cidade
    // pedido.devicetokenuser = bairro
    // pedido.devicetokennegocio = numeroendereco
// 
// 
//     pedido.cpfnanota = complemento
//     pedido.valortotal = nomeuser
//     pedido.valorentrega = contato
//     pedido.troco = password
//     pedido.observacao = idade
//     pedido.espec = endereco
//     pedido.qntositems = UF
//     pedido.contatouser = cidade
//     pedido.receberviawpp = bairro
// 
//     
//     pedido.iduser = numeroendereco
//     pedido.nomeuser = complemento
//     pedido.bairro = complemento
//     pedido.endereco = numeroendereco
//     pedido.numeroendereco = complemento
//     pedido.complemento = numeroendereco
//     pedido.app = complemento
   
  const [checked, setChecked] = React.useState(false);
  

  const goNext = () => {
    if(!checked){
      pedido.receberviawpp = 'Sim'
    }else{
      pedido.receberviawpp = 'Não'
    }
    if(TypeCompra == 'cestinha'){
      pedido.TypeCompra = TypeCompra
      pedido.CestinhaPreco = CestinhaPreco
    }
    console.log(pedido)
    navigation.navigate("Confirmação", {
                screen: "Confirmação",
                params: pedido
            });
   
  };


  return (
      <ScreenContainer>

         <View style={{flex:1}}>

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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Continuar</Text>
              
              <View style={{width:10}} />

            </TouchableOpacity>

     
         
      <Text  style={{fontSize: 11,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 20,  marginLeft: 35,
                marginRight: 35,}}>Você deseja ser informado do valor exato* da sua compra, pelo comercio, após a sua compra?</Text>
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>

          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#111111', fontSize: 13}}
            status={!checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />       
          </View>

           <Text  style={{fontSize: 12, alignItems:'center', color:'#13bc01',width:300}}>Sim, quero receber o valor exato na compra via Whatsapp</Text>
        </View>  

        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
        
          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#000', fontSize: 13 }}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
                
          />

          </View>
          <Text  >Não</Text>
        </View>

      <Text  style={{fontSize: 10, alignItems:'center', color:'#4b4b4b', fontStyle: 'italic', marginLeft: 55,
                marginRight: 55,}} >O valor mostrado no app é um valor aproximado. O valor exato da sua compra pode variar de acordo com a pessagem dos itens.</Text>



      </View>

    </ScreenContainer>
    
  );
};

