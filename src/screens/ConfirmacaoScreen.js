
import React, { Component , useEffect, useState }  from 'react'
import { View, Text, StyleSheet, Button, TextInput , SectionList, FlatList, Image, TouchableOpacity, ScrollView, ListItem} from "react-native";
import { Checkbox } from 'react-native-paper';
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";
import PedidoModel  from "../../src/model/PedidoModel";
import AuxModel  from "../../src/model/AuxModel";

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
  input:{

    marginLeft: 75,
    marginRight: 35,
    margin: 5,
    fontSize: 15, 
    width:'100%'
  },
});


const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);


export const ConfirmacaoScreen = ({ navigation , route}) => {
   const { pedir } = React.useContext(AuthContext);
   const { pedidoproduto } = React.useContext(AuthContext);

  const { SendPushNotification } = React.useContext(AuthContext);

  const { CartScreen } = React.useContext(AuthContext);
 
  const [user, setUser] = useState([])
  const [cart, setCart] = useState([])
 

  const [preco, setPreco] = useState()
  const [lista, setLista] = useState()
   const [devicetokennegocio, setdevicetokennegocio] = useState()

  const { receberviawpp , TypeCompra, CestinhaPreco} = route.params.params;


  useEffect(() => {

    AsyncStorage.getItem('user').then((userdata)=>{
       if (userdata !== null) {
         // We have data!!
         const user = JSON.parse(userdata)
         setUser(user);
         console.log(user)
       }
       else{
         const user  = [];
        // AsyncStorage.setItem('user',JSON.stringify(user));
       }
     })
     .catch((err)=>{
       alert(err)
     })
      if(TypeCompra == 'cestinha'){
        AsyncStorage.getItem('cestinhacliente').then((cartdata)=>{
          if (cartdata !== null) {
              // We have data!!
            const cart = JSON.parse(cartdata)
            setCart(cart);
            let listapedido = '';
            for(let i = 0; i < cart.length; i++){
              listapedido = listapedido +cart[i].itensnum+' '+ cart[i].valorpor + ' ' + cart[i].nomeproduto + '\n '
              setdevicetokennegocio(cart[i].devicetokennegocio)
            } 
            setdevicetokennegocio(cart[0].devicetokennegocio)         
            setLista(listapedido)
            setPreco(parseInt(CestinhaPreco).toFixed(2))

          }else{
            const cart  = [];
          }
        }).catch((err)=>{
          alert(err)
        })
      }else{
        AsyncStorage.getItem('cart').then((cartdata)=>{
          if (cartdata !== null) {
           // We have data!!
            const cart = JSON.parse(cartdata)
            setCart(cart);
            let preco = 0;
            let listapedido = '';
            for(let i = 0; i < cart.length; i++){
              preco+=cart[i].price
              listapedido = listapedido +cart[i].quantity+' '+ cart[i].food.valorpor + ' ' + cart[i].food.nomeproduto + '\n '
            }
            setdevicetokennegocio(cart[0].food.devicetokennegocio) 
            setLista(listapedido)
            setPreco(preco.toFixed(2))
          }else{
            const cart  = [];
          }
        }).catch((err)=>{
          alert(err)
        })
      }
    },[])



  const [checked, setChecked] = useState(false);
  const [troco, setTroco] = useState(0);
  const [checkedCPF, setCheckedCPF] = React.useState(false);

  const [cpf, setcpf] = useState();
    const pedido = PedidoModel()
       
    //pedido.idofertas = nomeuser
    // pedido.nomeoferta = contato
    pedido.valoroferta = parseFloat(preco).toFixed(2)
    // pedido.metodopagamento = idade
    // pedido.datadecriacao = endereco
    // pedido.idnegocio = UF
    // pedido.nomenegocio = cidade
    // pedido.devicetokenuser = bairro
    //pedido.devicetokennegocio = numeroendereco

// 
//    pedido.cpfnanota = cpfnanota
    pedido.valortotal = parseFloat(preco).toFixed(2)
//     pedido.valorentrega = contato
    pedido.espec = lista
//     pedido.observacao = idade
//     pedido.espec = endereco
//     pedido.qntositems = UF
//     pedido.contatouser = cidade
    pedido.receberviawpp = receberviawpp
// 
//     
//     pedido.iduser = numeroendereco
//     pedido.nomeuser = complemento
//     pedido.bairro = complemento
//     pedido.endereco = numeroendereco
//     pedido.numeroendereco = complemento
//     pedido.complemento = numeroendereco
//     pedido.app = complemento
//   
// 
  const goNext = () => {
    if(!checked){
      pedido.metodopagamento = 'Dinheiro'
    }else{
      pedido.metodopagamento = 'Cartão de crédito'
    }
    if(!checkedCPF){
      pedido.cpfnanota = 'Sim'
       pedido.cpf = cpf
    }else{
      pedido.cpfnanota = 'Não'
    }
    pedido.troco = troco
    pedido.espec = lista
    //console.log(user)
    pedido.iduser = user.iduser
    pedido.nomeuser = user.nomeuser
    pedido.bairro = user.bairro
    pedido.endereco = user.endereco
    pedido.numeroendereco = user.numeroendereco
    pedido.complemento = user.complemento
    pedido.contatouser = user.contato
    pedido.devicetokenuser = user.devicetoken
    pedido.app = 'Minha horta'
    pedido.status = 'Esperando confirmação'
    

    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    pedido.datadecriacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
    
    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }
    console.log(cart)
    

    const aux = AuxModel()
    aux.devicetoken = devicetokennegocio
    aux.title = ' 🤑Novo Pedido!'
    aux.body = 'Abra o app e confirme o novo pedido!'
    SendPushNotification(aux)
   

    console.log(pedido)
    pedir(pedido).then(resp => {
      const auxcart =JSON.parse(resp)
      cart.forEach(function (element) {
        element.quantidade = element.itensnum;
        element.iduser = user.iduser;
        element.nomeuser = user.nomeuser
        element.contato = user.contato
        element.idpedido = auxcart[0].idpedido
        element.app = 'Minha horta';
      });
      pedidoproduto(cart)
    })
    navigation.navigate("Pedido feito", {
                screen: "Pedido feito",
                params: cart
              });
   
  };





  return (
     
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
                 
                <Text style={{fontSize:15, color:"white", fontWeight:"bold"}}>Finalizar compra</Text>
              
              <View style={{width:10}} />

            </TouchableOpacity>

 <Text  style={{fontSize: 13,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 20,  marginLeft: 35,
                marginRight: 35,}}>
             Escolha como quer pagar (Pagamento na entrega)
           </Text>
     
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>

          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#111111', fontSize: 16 }}
            status={!checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />       
          </View>
        
          <Text  style={{fontSize: 15, alignItems:'center', color:'#4b4b4b'}}>Dinheiro</Text>

          
        </View>  
        {!checked ? (
          <View>
           <Text  style={{fontSize: 13, alignItems:'center', color:'#4b4b4b', marginTop: 5,
    marginLeft: 55,
    marginRight: 35,
    margin: 5, fontStyle: 'italic', }}>Troco para? (caso n deixe em branco)</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "R$ 0,00"
               placeholderTextColor = "#8b9cb5"
               autoCapitalize = "none"
               onChangeText={troco => setTroco(troco)} />      
          </View>
                           
                             
                        ) : (
                        <Text ></Text>
                        )}
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
        
          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#000', fontSize: 16 }}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
                
          />

          </View>
          <Text  style={{fontSize: 15, alignItems:'center', color:'#4b4b4b'}}>Cartão de crédito</Text>
        </View>

    
      

        
 <Text  style={{fontSize: 13,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 20,  marginLeft: 35,
                marginRight: 35,}}>CPF na nota?</Text>

        <View style={styles.row}>
          <View style={styles.checkboxContainer}>

          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#111111', fontSize: 16 }}
            status={!checkedCPF ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedCPF(!checkedCPF);
            }}
          />       
          </View>

          <Text  style={{fontSize: 15, alignItems:'center', color:'#4b4b4b'}}>Sim</Text>
        </View>  
               {!checkedCPF ? (
          <View>
           <Text  style={{fontSize: 13, alignItems:'center', color:'#4b4b4b', marginTop: 5,
    marginLeft: 55,
    marginRight: 35,
    margin: 5, fontStyle: 'italic', }}>CPF</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "000.000.000-00"
                   keyboardType="numeric"
               placeholderTextColor = "#8b9cb5"
               autoCapitalize = "none"
               onChangeText={cpf => setcpf(cpf)} />      
          </View>
                           
                             
                        ) : (
                        <Text ></Text>
                        )}



        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
        
          <Checkbox
            label="Esse é um checkbox"
            labelStyle={{ color: '#000', fontSize: 16 }}
            status={checkedCPF ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedCPF(!checkedCPF);
            }}
                
          />

          </View>
            <Text  style={{fontSize: 15, alignItems:'center'}}>Não</Text>
        </View>
        
        

              <Text  style={{fontSize: 12, alignItems:'center', color:'#4b4b4b', fontStyle: 'italic', marginLeft: 55,
                marginRight: 55,}} >As entregas serão feitas de segunda a sexta da ...</Text>



      </View>




    
  );
};