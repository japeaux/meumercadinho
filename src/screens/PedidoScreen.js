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



import Loader from '../components/Loader';
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";
import PedidoModel  from "../../src/model/PedidoModel";

import AuxModel  from "../../src/model/AuxModel";


import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';




export const PedidoScreen = ({navigation }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([])

    const { SendPushNotification } = React.useContext(AuthContext);
   const { updatepedido } = React.useContext(AuthContext);
   useEffect(() => {
   
    AsyncStorage.getItem('user').then((userdata)=>{
       if (userdata !== null) {
         // We have data!!
         const user = JSON.parse(userdata)
         setUser(user);
         //console.log(user)
           fetch('https://app.diwoapp.com.br/feedmeuspedidos.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  iduser: user.iduser,
                }),
              }).then(res => res.json())
                  .then(resJson => {
                   resJson[0].forEach(function (element) {
                    
                    var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                    element.datadecriacao = dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                     // element.datadecriacao = aux.last;
                     // element.categoria = 'Cestinha'
                     // element.app = 'Minha horta'
                  });
                 
                    setData(resJson[0]);
                }).catch(e => console.log(e));
       }
       else{
         const user  = [];
        // AsyncStorage.setItem('user',JSON.stringify(user));
       }
     })
     .catch((err)=>{
       alert(err)
     })

  },[]);

  const onClickPedido = (data) => {
 
    const pedido = PedidoModel()
    pedido.idpedido = data.idpedido
    if(data.status == 'Esperando confirmação'){
      pedido.status = 'Cancelado pelo cliente' 
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
      fetch('https://app.diwoapp.com.br/feedmeuspedidos.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iduser: user.iduser,
        }),
      }).then(res => res.json())
          .then(resJson => {

                const aux = AuxModel()
                aux.devicetoken = data.devicetokennegocio
                aux.title = '😥Pedido cancelado'
                aux.body = 'Abra o app para mais informações'
                SendPushNotification(aux)
          
            //console.log(resJson)
            setData(resJson[0]);
        }).catch(e => console.log(e));
    }else{
       pedido.status = 'Relatar problema' 
    }
   
  }  

 



 const renderItem = ({ item }) => {
    return (
      <View style={{      flex: 1,backgroundColor:'#eee',   padding:10,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,borderRadius:4}}>
      <View style={{      flex: 1, flexDirection: 'row', }}>
         <TouchableOpacity>
            <Text style={styles.boxpedido}> {item.datadecriacao}</Text>
       
            <Text style={{fontSize: 12,  color:"#888",  fontWeight: "bold", marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    margin: 10,width:120,}}> {item.espec}</Text>
        
            
        </TouchableOpacity>
         <View style={{      flex: 1, padding: 0, }}>
           <Text style={{fontSize:12, color:"#aaa", marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>{item.status}</Text>

    
      
              <Text style={{fontSize:18, color:"#4b4b4b", marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,}}>R${item.valortotal}</Text>
          </View>


    </View>
    {item.status != 'Entregue' && item.status != 'Cancelado'  && item.status != 'Cancelado pelo cliente' ? (
             <TouchableOpacity
               // onPress={onAddToCart}
              onPress=
              {() => {
                onClickPedido(item);
              }}
              style={{
               
                backgroundColor:'#13bc01',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:4
              }}>
                  
              <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Cancelar pedido</Text>
             
              <View style={{width:10}} />
            </TouchableOpacity>

              ) : (
                <Text style={{fontSize:18, color:"black", fontWeight:"bold"}}>{item.status}</Text>
              )}
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Menu" onPress={() => navigation.toggleDrawer()} /> */}
      {/* <Button title="Volta" onPress={() => navigation.navigate("Inicio")}/> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        // extraData={selectedId}
      />
    </SafeAreaView>
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
export default PedidoScreen;

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
    fontSize: 16,
    color:'#13bc01',
    padding: 10,

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