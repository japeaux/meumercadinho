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
  ScrollView, Button, SafeAreaView,  Platform, Dimensions,  
  LayoutAnimation, 
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

import BlankSpacer from "react-native-blank-spacer";
import { Switch , Checkbox} from 'react-native-paper';

import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import UserModel  from "../../../src/model/UserModel";
import ProdutoModel  from "../../../src/model/ProdutoModel";


import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';


const listReducer = (state, action) => {

  
  switch (action.type) {
    case 'REMOVE_ITEM':

      return {
        ...state,
        cart: state.cart.filter((item) => item.iduser !== action.id),

      };

    default:
      throw new Error();

  }
};



export const ClientelaScreen = ({navigation }) => {

  const ItemList = ({item}) => {

    const [data, setData] = useState(item);
    
 

   

    const onClickEnterCliente = (cliente) => {
      console.log(cliente)
         navigation.navigate("Cliente", {
                  screen: "Cliente",
                  params: cliente
              });
    }
    const [cart, setCart] = useState([]);
    const onClickAddNoti = (data, info) => {
  
         

       console.log(checked)
        if(!checked){

       console.log('ddasdas')
          const user = UserModel()

          user.iduser = data.iduser
          user.nomeuser = data.nomeuser
          user.devicetoken = data.devicetoken
          user.contato = data.contato
          user.Active = true
              

          const diademodificacao = new Date();

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

          user.datamodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
         
          function checkZero(data){
            if(data.length == 1){
              data = "0" + data;
            }
            return data;
          }

           AsyncStorage.getItem('notificausers').then((datacart)=>{
                 if (datacart !== null) {
                   // We have data!!
                   const cart = JSON.parse(datacart)
              

                  cart.push(user)

                

                   setCart(cart);



                   AsyncStorage.setItem('notificausers',JSON.stringify(cart));
                
                 }
                 else{
                  const cart  = []
                  cart.push(user)
                   AsyncStorage.setItem('notificausers',JSON.stringify(cart));
                   //setCart(cart);
                 }
                // console.log(cart)
               })
               .catch((err)=>{
                 alert(err)
               })
          
    
         }else{
            handleRemove(data.iduser) 
         }
        setChecked(!checked);
      }  

    const [checked, setChecked] = React.useState(false);





   const [listData, dispatchListData] = React.useReducer(listReducer, {
    cart: cart,
    isShowList: true,
  });

  
  function handleRemove(id) {
  
    dispatchListData({ type: 'REMOVE_ITEM', id });
    
    UpdateStorage(id);

  }

  function UpdateStorage(id) {

    var array = [...cart]; // make a separate copy of the array
  
    var index = array.findIndex(cart => cart.iduser === id);

    //console.log(index);

    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);

      //console.log(array)

      AsyncStorage.setItem('notificausers',JSON.stringify(array));
  

    }

  }

    return (
      <View style={{ flex: 1 }} key= {item.iduser}>
       <View style={{ flexDirection: 'row',}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress=
                            {() => {
                             onClickEnterCliente(item);
                             }}>

                              <View style={{ flexDirection: 'row',}}>
                                    <View >
                                      
                                      <Text style={{fontSize: 15,  fontWeight: "bold", alignItems:'center', width:140}}>{item.nomeuser}</Text>
                                    
                                      

                                   <View style={{ flexDirection: 'row',  alignItems:'center',  
                                            marginLeft: 5,
                                            marginRight: 5,}}>
                                      
                                      
                                   
                                      <Text style={{fontSize: 12,  }}> {item.contato}</Text>

                                         </View>
                                      
                       

                                        </View>
                                         <Text style={{fontSize: 12,  }}> {item.dataultimopedido}</Text>
                                         </View>
                      </TouchableOpacity>
                        
                          <View style={{alignItems:'flex-end'}}>
                                <View style={styles.row}>
                                    <View style={styles.checkboxContainer}>

                                    <Checkbox
                                      label="Esse é um checkbox"
                                      labelStyle={{ color: '#111111', fontSize: 16 }}
                                      status={checked ? 'checked' : 'unchecked'}
                                      onPress={() => {

                                        onClickAddNoti(item)
                                      }}
                                    />       
                                    </View>

                                  </View>  

                                      
                      
                            </View>

                        </View>
           </View>

    );
  };

   const { feed } = React.useContext(AuthContext);
   const { updateproduto } = React.useContext(AuthContext);
   const [data, setData] = useState([]);
   const [precototal, setPreco] = useState();
  
   const [cart, setCart] = useState([]);
    const [checked, setChecked] = React.useState(false);

      const SelectTodos = () => {
        console.log('kmasdkskm')
       setChecked(!checked)
      }  
   
   useEffect(() => {
     AsyncStorage.removeItem('notificausers');
    fetch('https://app.diwoapp.com.br/whitela/ws/feedclientes.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app: 'Minha horta',
        }),
      }).then(res => res.json())
          .then(resJson => {
            
            
            //resJson.map(obj=> ({ ...obj, checked: true }))

            resJson.forEach(function (element) {
              if(element.estado == 'disponível'){
                element.Active = true;
              }else{
                element.Active = false;
              }
              if(element.dataultimopedido){
                 var dArr =  element.dataultimopedido.split("-");  // ex input "2010-01-18"
                element.dataultimopedido = dArr[2][0]+dArr[2][1]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
           
              }
             
              
            });

            console.log(resJson)
           
            setData(resJson);
        }).catch(e => console.log(e));
   
  },[]);


  const [editatitpo, setEditatitpo] = useState('preco');

  const onClickFeedADM = (data) => {
    console.log('kmasdkskm')
     AsyncStorage.getItem('notificausers').then((datacart)=>{
         if (datacart !== null) {
           // We have data!!
           const cart = JSON.parse(datacart)
           console.log(cart);
          
         }
         else{
           const cart  = []
         }
       })
       .catch((err)=>{
         alert(err)
       })
    // if(data == 'Preco'){
    //   setEditatitpo('preco')
    // }else{
    //   setEditatitpo('edita')  
    // }
    
  }  

 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        // <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
          <View>
            <TouchableOpacity onPress={() =>  navigation.navigate("Manda Notificação")} >
                             {/* <Icon name="menu-outline" size={35} color={"#33c37d"} /> */}
              <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, }}>Enviar notificações</Text>
        
            </TouchableOpacity>
          </View>
      ),
    });
  }, [navigation]);
   

  return (
    <SafeAreaView style={{flex: 1}}>
    
      <View style={{ flex: 1, height:height }}>

        {/*   <View > */}
        {/*     <TouchableOpacity */}
        {/*                // onPress={onAddToCart} */}
        {/*              onPress= */}
        {/*                 {() => { */}
        {/*                   SelectTodos(); */}
        {/*                 }} */}
        {/*               style={{ */}
        {/*                 */}
        {/*                 borderRadius:5, */}
        {/*                 padding:4 */}
        {/*               }}> */}
        {/*           */}
        {/*             <Text style={{fontSize: 18,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, }}>Selectionar todos</Text> */}
        {/*  */}
        {/*           </TouchableOpacity> */}
        {/*   </View> */}




          <View style={{      flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView style={{ flex: 1 }}>
                  {data.map((item, key) => (
                <ItemList
                  key={item.iduser}
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
export default ClientelaScreen;

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