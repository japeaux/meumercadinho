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
  ScrollView, Button, SafeAreaView,Linking,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import PedidoModel  from "../../../src/model/PedidoModel";
import AuxModel  from "../../../src/model/AuxModel";

export const ADMPedidoScreen = ({navigation , route}) => {
  
  const { updatepedido } = React.useContext(AuthContext);
  const { nomeuser, endereco, numeroendereco, complemento, bairro, cidade, metodopagamento, troco, valortotal, valoroferta, valorentrega, status ,receberviawpp, cpfnanota, idpedido, espec, observacao, datadecriacao, datamodificacao, contatouser, devicetokennegocio, devicetokenuser, cpf } = route.params.params;
  const [textobotao, settextobotao] = useState('Finalizar');

  const { SendPushNotification } = React.useContext(AuthContext);


  useEffect(() => {
   if( status == 'Confirmado'){
      settextobotao('Pronto para entregar')
     }
     if(status == 'Saiu para entrega'){
      settextobotao('Finalizar')
     }
   })
  const pedido = PedidoModel()

    pedido.nomeuser = nomeuser
    pedido.endereco = endereco
    pedido.numeroendereco = numeroendereco
    pedido.complemento = complemento
    pedido.bairro = bairro
    pedido.cidade = cidade
    pedido.metodopagamento = metodopagamento
    pedido.troco = troco
    pedido.valortotal = valortotal


    pedido.valoroferta = valoroferta
    pedido.valortotal = valortotal
    pedido.valorentrega = valorentrega
    
    pedido.receberviawpp = receberviawpp
    pedido.cpfnanota = cpfnanota
    pedido.idpedido = idpedido
    pedido.cpf = cpf
    
    pedido.espec = espec
    pedido.observacao = observacao
    pedido.datadecriacao = datadecriacao
    pedido.datamodificacao = datamodificacao
    pedido.contatouser = contatouser
    pedido.devicetokennegocio = devicetokennegocio
    pedido.devicetokenuser = devicetokenuser
  
    

  const UpdateEstado = (data) => {
    console.log(data)
    

            const aux = AuxModel()
         
            aux.app = 'Minha horta'
            aux.status = data

    pedido.idpedido = idpedido
    pedido.app = 'Minha horta'
    pedido.status = data

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

    pedido.datamodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
    
    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }
     updatepedido(pedido)
    if(data == 'Confirmado'){
        aux.devicetoken = devicetokenuser
        aux.title = ' 🤗Pedido confirmado!'
        aux.body = 'Agora é só esperar seu pedido ficar pronto!'
        SendPushNotification(aux)
            navigation.push("ADM");

    }else{
        aux.devicetoken = devicetokenuser
        aux.title = '😥Pedido cancelado!'
        aux.body = 'Seu pedido foi cancelado! Para mais informações entre em contato com o vendedor!'
        SendPushNotification(aux)
           navigation.push("ADM");
    }

 
   
  }  

  const GoWpp = () =>{
    console.log(contatouser)
    var auxnum = 'https://wa.me/' + contatouser
    Linking.openURL(auxnum)
  }

  const UpdateEstadoPronto = (data) => {
    console.log(data)
    const pedido = PedidoModel()
    pedido.idpedido = idpedido
    console.log(status)

    const aux = AuxModel()
 
    aux.app = 'Minha horta'
    aux.status = data

    if(status == 'Confirmado'){


      pedido.idpedido = idpedido
      pedido.app = 'Minha horta'
      pedido.status = 'Saiu para entrega'

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

      pedido.datamodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
       updatepedido(pedido)

            aux.devicetoken = devicetokenuser
            aux.title = '🥳Pedido pronto!'
            aux.body = 'Seu pedido está saindo para entrega!'
            SendPushNotification(aux)

       navigation.push("ADM");
   
    }else{



      pedido.idpedido = idpedido
      pedido.app = 'Minha horta'
      pedido.status = 'Entregue'

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

      pedido.datamodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
       updatepedido(pedido)
        navigation.push("ADM");
    }
  
   
  }  








  
  return (
    
    <View style={{flex: 1}} >
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>

      <View >

       <Text style={{fontSize:13, fontWeight:'bold', color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Cliente:
        </Text>
         <Text style={{fontSize:13, color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 1,}}>
         {nomeuser}      {datadecriacao}
        </Text>
   

      <Text style={{fontSize:13, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Endereço:
        </Text>
         <Text style={{fontSize:13, color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 1,}}>
         {endereco}, {numeroendereco}, {complemento}
        </Text>
  

      <Text style={{fontSize:13, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>
          Método de pagamento:
        </Text>
         <Text style={{fontSize:13, color:"#4b4b4b", 
          marginLeft: 15,
          marginRight: 15,
          margin: 1,}}> 
          {metodopagamento}     R${valortotal}
        </Text>


        {receberviawpp == 'Sim' ? (
             <Text style={{fontSize:13, fontWeight:'bold',color:"#33c37d", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}   onPress={() => GoWpp()}>Enviar nota por WhatsApp</Text>
      
          ) : (
             <Text style={{fontSize:13, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}></Text>
          )}

          {cpfnanota == 'Sim' ? (

              <View>

                     <Text style={{fontSize:13,color:"#4b4b4b", marginTop: 20,
                  marginLeft: 15,
                  marginRight: 15,
                  margin: 10,}}   >CPF na nota</Text>
                  <Text style={{fontSize:13, color:"#4b4b4b", 
                  marginLeft: 15,
                  marginRight: 15,
                  margin: 1,}}> 
                  {cpf}
                  </Text>
             
              </View>

      
          ) : (
             <Text style={{fontSize:13, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}></Text>
          )}
       
         <Text style={{fontSize:13, fontWeight:'bold',color:"#4b4b4b", marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
          margin: 10,}}>LISTA DE COMPRAS</Text>


        <Text style={{fontSize: 15,  color:"#888",  fontWeight: "bold", marginTop: 1,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,}}> {espec}</Text>
        
            

       
     
      </View>



         <View style={{flex: 1, alignItems:'center'}} >


      {status == 'Esperando confirmação' ? (
                     <View style={{ flexDirection: 'row' }}>
                       
                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                                UpdateEstado('Cancelado');
                            }}
                            style={{
                              margin:10,
                              backgroundColor:'#D11A2A',
                              alignItems:'center',
                              justifyContent:"center",
                              borderRadius:5,
                              padding:4
                            }}>
                                
                            <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Cancelar pedido</Text>
                           
                            <View style={{width:10}} />
                          </TouchableOpacity>

                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                                UpdateEstado('Confirmado');
                            }}
                            style={{
                             margin:10,
                              backgroundColor:'#13bc01',
                              alignItems:'center',
                              justifyContent:"center",
                              borderRadius:5,
                              padding:4
                            }}>
                                
                            <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Confirmar pedido</Text>
                           
                            <View style={{width:10}} />
                          </TouchableOpacity>
                         
                        </View>

                           ) : ( 
                          
                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                               UpdateEstadoPronto('Pronto')

                            }}
                            style={{
                             margin:10,
                              backgroundColor:'#13bc01',
                              alignItems:'center',
                              justifyContent:"center",
                              borderRadius:5,
                              padding:4
                            }}>
                                
                            <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>{textobotao}</Text>
                           
                            <View style={{width:10}} />
                          </TouchableOpacity>
                       )} 
          </View>

{/*     {status == 'Esperando confirmação' ? ( */}
{/*  */}
{/*       <View style={{ flexDirection: 'row' , alignItems:'center'}}> */}
{/*         <View style={styles.button_1}> */}
{/*           <Button */}
{/*             title="Cancelar pedido" */}
{/*               onPress= */}
{/*               {() => { */}
{/*                 UpdateEstado('Cancelar'); */}
{/*               }} */}
{/*          /> */}
{/*          </View> */}
{/*          <View style={styles.button_1}> */}
{/*            <Button */}
{/*              title="Confirmar" */}
{/*             onPress= */}
{/*               {() => { */}
{/*                 UpdateEstado('Confirmar'); */}
{/*               }} */}
{/*            /> */}
{/*          </View> */}
{/*        </View> */}
{/*      ) : ( */}
{/*  */}
{/*        // {status == 'Confirmados' ? ( */}
{/*           <Button style={styles.buttonStyle} */}
{/*             activeOpacity={0.5} */}
{/*             title="Pedido pronto" */}
{/*             onPress={() => { */}
{/*              UpdateEstado('Pronto') */}
{/*             }} */}
{/*           /> */}
{/*       //  ) : ( */}
{/*         //   <Button style={styles.buttonStyle} */}
{/*         //     activeOpacity={0.5} */}
{/*         //     title="Finalizar" */}
{/*         //     onPress={() => { */}
{/*         //      UpdateEstado('Finalizar') */}
{/*         //     }} */}
{/*         //   /> */}
{/*         // )} */}
{/*  */}
{/*       )} */}

      </ScrollView>
    </View>
  );
};
export default ADMPedidoScreen;

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
    fontSize: 13,
    padding: 30,
  },
});