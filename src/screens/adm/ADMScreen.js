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
  FlatList,
  ScrollView, Button, SafeAreaView,  Platform, Dimensions,  TouchableOpacity,
  LayoutAnimation, 
} from 'react-native';
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")



import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import UserModel  from "../../../src/model/UserModel";
import PedidoModel  from "../../../src/model/PedidoModel";
import AuxModel  from "../../../src/model/AuxModel";
import BlankSpacer from "react-native-blank-spacer";

import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';




export const ADMScreen = ({navigation }) => {
   const [data, setData] = useState([]);
   const [textobotao, settextobotao] = useState('Finalizar');
   const { updatepedido } = React.useContext(AuthContext);

  const { SendPushNotification } = React.useContext(AuthContext);


   useEffect(() => {
   
  
    const pedido = PedidoModel()
    pedido.app = 'Minha horta'
    pedido.status = 'Esperando confirmação'
    //console.log(JSON.stringify(pedido))
      fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
        method: 'POST',
        body: JSON.stringify(pedido),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
            .then(resJson => {
              
             // console.log(resJson)
              if(resJson[0]!='E'){
                resJson[0].forEach(function (element) {
                
                  var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                  element.datadecriacao =  dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+ dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                   // element.datadecriacao = aux.last;
                   // element.categoria = 'Cestinha'
                   // element.app = 'Minha horta'
                   // console.log(dArr)
                });
                setData(resJson[0]);
              }else{
                setData([])
              }
          }).catch(e => setData([]));
    


   
  },[]);


  const onClickEnter = (data) => {
    navigation.navigate("Pedido", {
                screen: "Pedido",
                params: data
            });
  }  


  const onClickPedido = (data) => {
    //console.log(data)
    

    if(data.status == 'Esperando confirmação'){
      const pedido = PedidoModel()
      pedido.idpedido = data.idpedido
      pedido.app = 'Minha horta'
      pedido.status = 'Cancelado' 


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

      pedido.datademodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
       updatepedido(pedido).then(resp =>{

            const aux = AuxModel()
         
            aux.app = 'Minha horta'
            aux.status = 'Esperando confirmação' 


            aux.devicetoken = data.devicetokenuser
            aux.title = '😥Pedido cancelado!'
            aux.body = 'Seu pedido foi cancelado! Para mais informações entre em contato com o vendedor!'
            SendPushNotification(aux)



            console.log(JSON.stringify(aux))
          fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(res => res.json())
                .then(resJson => {
                  
                 // console.log(resJson)
                  if(resJson[0]!='E'){
                    resJson[0].forEach(function (element) {
                    
                      var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                      element.datadecriacao = dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+ dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                       // element.datadecriacao = aux.last;
                       // element.categoria = 'Cestinha'
                       // element.app = 'Minha horta'
                       // console.log(dArr)
                    });
                    setData(resJson[0]);
                  }else{
                    setData([])
                  }
              }).catch(e => setData([]));
       })
      //console.log(JSON.stringify(pedido))
         
      
    }else{
       pedido.status = 'Relatar problema' 
    }
   
  }  

  const onClickPedidoConfirmado = (data) => {
    console.log(data)
    const pedido = PedidoModel()
    pedido.idpedido = data.idpedido
    pedido.app = 'Minha horta'
    if(data.status == 'Esperando confirmação'){
      pedido.status = 'Confirmado' 
      
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

      pedido.datademodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
        updatepedido(pedido).then(resp =>{

            const aux = AuxModel()
         
            aux.app = 'Minha horta'
            aux.status = 'Esperando confirmação' 

            aux.devicetoken = data.devicetokenuser
            aux.title = ' 🤗Pedido confirmado!'
            aux.body = 'Agora é só esperar seu pedido ficar pronto!'
            SendPushNotification(aux)
           
            console.log(JSON.stringify(aux))
          fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(res => res.json())
                .then(resJson => {
                  
                 // console.log(resJson)
                  if(resJson[0]!='E'){
                    resJson[0].forEach(function (element) {
                    
                      var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                      element.datadecriacao = dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+ dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                       // element.datadecriacao = aux.last;
                       // element.categoria = 'Cestinha'
                       // element.app = 'Minha horta'
                       // console.log(dArr)
                    });
                    setData(resJson[0]);
                  }else{
                    setData([])
                  }
              }).catch(e => setData([]));
       })
        
          
    }else{
       pedido.status = 'Relatar problema' 
    }
   
  }  


  const onClickPedidoFinalizando = (data) => {
    console.log(data)
    const pedido = PedidoModel()
    pedido.idpedido = data.idpedido
    pedido.app = 'Minha horta'
    if(data.status == 'Confirmado'){
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

      pedido.datademodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
        updatepedido(pedido).then(resp =>{

            const aux = AuxModel()
         
            aux.app = 'Minha horta'
            aux.status = 'Confirmado' 
            

            aux.devicetoken = data.devicetokenuser
            aux.title = '🥳Pedido pronto!'
            aux.body = 'Seu pedido está saindo para entrega!'
            SendPushNotification(aux)


            console.log(JSON.stringify(aux))
          fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(res => res.json())
                .then(resJson => {
                  
                 // console.log(resJson)
                  if(resJson[0]!='E'){
                    resJson[0].forEach(function (element) {
                    
                      var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                      element.datadecriacao = dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+ dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                       // element.datadecriacao = aux.last;
                       // element.categoria = 'Cestinha'
                       // element.app = 'Minha horta'
                       // console.log(dArr)
                    });
                    setData(resJson[0]);
                  }else{
                    setData([])
                  }
              }).catch(e => setData([]));
       })
        
    }else{
       {
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

      pedido.datademodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }
       updatepedido(pedido).then(resp =>{

            const aux = AuxModel()
         
            aux.app = 'Minha horta'
            aux.status = 'Saiu para entrega' 
            console.log(JSON.stringify(aux))
          fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(res => res.json())
                .then(resJson => {
                  
                 // console.log(resJson)
                  if(resJson[0]!='E'){
                    resJson[0].forEach(function (element) {
                    
                      var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                      element.datadecriacao = dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+  dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                       // element.datadecriacao = aux.last;
                       // element.categoria = 'Cestinha'
                       // element.app = 'Minha horta'
                       // console.log(dArr)
                    });
                    setData(resJson[0]);
                  }else{
                    setData([])
                  }
              }).catch(e => setData([]));
       })
        
    }
    }
   
  }  


  const [colorclicked, setcolorclicked] = useState('#888');
  const [colorclicked2, setcolorclicked2] = useState('#888');
  const [colorclicked3, setcolorclicked3] = useState('#888');
  const onClickFeedADM = (data) => {
    console.log(data)
   
    const pedido = PedidoModel()
    pedido.app = 'Minha horta'
    pedido.status = data
     if( pedido.status == 'Confirmado'){
      settextobotao('Pronto para entregar')
      setcolorclicked('#888')
      setcolorclicked2('#13bc01')
      setcolorclicked3('#888')

     }

     if( pedido.status == 'Saiu para entrega'){
      settextobotao('Finalizar')
      setcolorclicked('#888')
      setcolorclicked2('#888')
      setcolorclicked3('#13bc01')
     }


     if( pedido.status == 'Esperando confirmação'){
      setcolorclicked('#13bc01')
      setcolorclicked2('#888')
      setcolorclicked3('#888')
      console.log(colorclicked)
     }
    //console.log(JSON.stringify(pedido))
      fetch('https://app.diwoapp.com.br/whitela/ws/feedadmpedidos.php', {
        method: 'POST',
        body: JSON.stringify(pedido),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
            .then(resJson => {
              
              //console.log(resJson)
              if(resJson[0]!='E'){
                resJson[0].forEach(function (element) {
                  var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                  element.datadecriacao = dArr[2][3]+dArr[2][4]+ dArr[2][5]+dArr[2][6]+ dArr[2][7]+ '   '+ dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                   // element.datadecriacao = aux.last;
                   // element.categoria = 'Cestinha'
                   // element.app = 'Minha horta'
                });
                setData(resJson[0]);
              }else{
                setData([])
              }
          }).catch(e => setData([]));
    


   
  }  

 



 const renderItem = ({ item }) => {
    return (


      <View style={{      flex: 1,backgroundColor:'#eee',   padding:10,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,borderRadius:4}}>

                       <TouchableOpacity        
                        onPress=
                            {() => {
                              onClickEnter(item);
                            }}>
                          <Text style={{fontSize:11, color:"#4b4b4b", marginTop: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        margin: 3, textAlign:'right',}}> {item.datadecriacao}</Text>
                        <Text style={{fontSize:13, color:"#4b4b4b", marginTop: -3,
                        marginLeft: 5,
                        marginRight: 5,
                        margin: 3,  display: 'flex',
                        fontWeight: 'bold'}}>{item.nomeuser}</Text>
                        

                      <Text  style={{fontSize: 10, alignItems:'center', color:'#4b4b4b', fontStyle: 'italic', marginLeft: 5,
                marginRight: 5,}} >{item.endereco}, {item.numeroendereco}, {item.complemento}</Text>


                    
                            <Text style={{fontSize:13, color:"#4b4b4b", marginTop: 5,
                        marginLeft: 5,
                        marginRight: 35,
                        marginBottom: 10,fontWeight: 'bold'}}>R${item.valortotal}</Text>

                     
                          <Text style={{fontSize: 12,  color:"#888",  fontWeight: "bold", marginTop: 5,
                            marginLeft: 5,
                            marginRight: 5,
                            margin: 10,}}> {item.espec}</Text>
                                
                          
                      </TouchableOpacity>
                       <TouchableOpacity        
                        onPress=
                            {() => {
                              onClickEnter(item);
                            }}>
                       
                         {/* <Text style={{fontSize:8, color:"#aaa", marginTop: 20, */}
                         {/*    marginLeft: 35, */}
                         {/*    marginRight: 35, */}
                         {/*    margin: 10,}}>{item.status}</Text> */}

                            
                      
                      </TouchableOpacity>

               

                  {item.status == 'Esperando confirmação' ? (
                     <View style={{ flexDirection: 'row', alignItems:'center' , justifyContent: 'center'}}>
                       
                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                              onClickPedido(item);
                            }}
                            style={{
                              margin:10,
                              backgroundColor:'#D11A2A',
                              alignItems:'center',
                              justifyContent:"center",
                              borderRadius:5,
                              padding:4
                            }}>
                                
                            <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Cancelar</Text>
                           
                            <View style={{width:10}} />
                          </TouchableOpacity>

                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                              onClickPedidoConfirmado(item);
                            }}
                            style={{
                             margin:10,
                              backgroundColor:'#13bc01',
                              alignItems:'center',
                              justifyContent:"center",
                              borderRadius:5,
                              padding:4
                            }}>
                                
                            <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Confirmar</Text>
                           
                            <View style={{width:10}} />
                          </TouchableOpacity>
                         
                        </View>

                           ) : ( 
                          
                           <TouchableOpacity
                             // onPress={onAddToCart}
                            onPress=
                            {() => {
                              onClickPedidoFinalizando(item);
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

//     
//       <View style={{      flex: 1,  alignItems: 'center',
//     justifyContent: 'center'}}>
//          <TouchableOpacity        
//           onPress=
//               {() => {
//                 onClickEnter(item);
//               }}>
//           <Text style={styles.boxpedido}> {item.espec}</Text>
// 
//              <TouchableOpacity
//                // onPress={onAddToCart}
//               onPress=
//               {() => {
//                 onClickPedido(item);
//               }}
//               style={{
//                
//                 backgroundColor:'#33c37d',
//                 alignItems:'center',
//                 justifyContent:"center",
//                 borderRadius:5,
//                 padding:4
//               }}>
//                   {item.status == 'Esperando confirmação' ? (
//               <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Cancelar pedido</Text>
//               ) : (
//                 <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>{item.status}</Text>
//               )}
//               <View style={{width:10}} />
//             </TouchableOpacity>
// 
// 
// 
//         </TouchableOpacity>
//       </View>
      
    );
  };

  return (
    <View style={{      flex: 1,  }}> 

              
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress={() => navigation.push("Add Produto")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Adicionar%20produto.png?alt=media&token=ab51a454-597d-4e50-b2fe-144bf5cc26d0'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Add</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress={() => navigation.push("Atualiza Produtos")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Editar%20produto.png?alt=media&token=72cea550-600a-4c11-83a2-1e90b0d52c27'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Edita preços</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress={() => navigation.push("Cria Cestinha")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Criar%20cesta.png?alt=media&token=35dde173-a15c-4f24-8570-4d5f1e7daa41'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Criar cestinhas</Text>
        
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                   onPress={() => navigation.push("Dados")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Dados.png?alt=media&token=f9788a64-5b47-4895-a5fe-fe27f9fe8444'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Dados</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                     onPress={() => navigation.push("Historico")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Hist%C3%B3rico.png?alt=media&token=abffe1aa-61bd-4c81-bcab-bf4a1e4967ec'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Histórico</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress={() => navigation.push("Clientela")}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                    <Image

                     source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/Clientes.png?alt=media&token=7d416873-f30c-4567-a671-1b7b0e6cfba1'}}
                      style={{
                        width: '70%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 10,
                      }}
                    />
                      <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, margin: 10,}}>Clientela</Text>
        
                  </TouchableOpacity>
                </View>
              </View>



              <View style={{ flexDirection: 'row' ,  padding:0, margin:0}}>
                <View style={{ flex: 1, padding:0, margin:0}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                   onPress=
                    {() => {
                      onClickFeedADM('Esperando confirmação');
                    }}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                 
                    <Text style={{fontSize: 14,  color:colorclicked,  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5,}}>Novos</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                     onPress=
                        {() => {
                          onClickFeedADM('Confirmado');
                        }}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                 
                    <Text style={{fontSize: 14,  color:colorclicked2,  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, }}>Confirmados</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress=
                        {() => {
                          onClickFeedADM('Saiu para entrega');
                        }}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                  
                      <Text style={{fontSize: 14,  color:colorclicked3,  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5,}}>Enviados</Text>
        
                  </TouchableOpacity>
                </View>
              </View>




          
{/*           <View style={{      flex: 1, padding: 0, padding:10, */}
{/*                 marginLeft: 70, */}
{/*                 marginRight: 70, */}
{/*                 margin: 10,borderRadius:4  }}> */}
{/*  */}
{/*             <FlatList */}
{/*               data={data} */}
{/*               renderItem={renderItem} */}
{/*               keyExtractor={(item,index) => index.toString()} */}
{/*               // extraData={selectedId} */}
{/*             /> */}
{/*           </View> */}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        // extraData={selectedId}
      />

    </View>
  );
};

// const Item = ({ item, onPress, style }) => (
// 
// );
//   return (
//     <SafeAreaView style={{flex: 1}}>
//           <View style={{flex:1}}>
//             {/* <FlatList */}
//             {/* keyExtractor={(item, index) => index.toString()} */}
//             {/* data={data} */}
//             {/* renderItem={renderTip}/> */}
//    
//            
//        <FlatList
//         data={data} 
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => 
//           <Text style={styles.item}>{item.espec}</Text>
// 
// 
//         }
//       />
//         </View>
//           
//   </SafeAreaView>
// 
// 
//   );
//};
export default ADMScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  boxpedido: {
    fontSize: 13,
    color: '#606070',
    padding: 10,
  },
  button_1:{
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
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
   container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  image: {
    height: 40,
    width : 40,
    borderRadius: 4,
  },
});