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

import BlankSpacer from "react-native-blank-spacer";

import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';




export const ADMHistoricoScreen = ({navigation }) => {
   const [data, setData] = useState([]);
   useEffect(() => {
   
  
    const pedido = PedidoModel()
    pedido.app = 'Minha horta'
    pedido.status = 'Entregue'
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
              resJson[0].forEach(function (element) {
            
                var dArr =  element.datadecriacao.split("-");  // ex input "2010-01-18"
                element.datadecriacao = dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
                 // element.datadecriacao = aux.last;
                 // element.categoria = 'Cestinha'
                 // element.app = 'Minha horta'
              });
              console.log(resJson)
              if(resJson[0]!='E'){

                setData(resJson[0]);
              }else{
                setData([])
              }
          }).catch(e => setData([]));
    


   
  },[]);


 



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
    margin: 10,width:200}}> {item.espec}</Text>
        
            
        </TouchableOpacity>

         <View>
           <Text style={{fontSize:13, color:"#aaa", marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>{item.status}</Text>

    
      
              <Text style={{fontSize:14, color:"#4b4b4b", marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,}}>R${item.valortotal}</Text>
          </View>


    </View>
   
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

export default ADMHistoricoScreen;

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