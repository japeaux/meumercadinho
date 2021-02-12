
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
  ScrollView, Button, SafeAreaView,  Platform, Dimensions,  FlatList,SectionList,
  LayoutAnimation, Alert,
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
import CestinhaModel  from "../../../src/model/CestinhaModel";

import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';


const listReducer = (state, action) => {

  
  switch (action.type) {
    case 'REMOVE_ITEM':

      return {
        ...state,
        cart: state.cart.filter((item) => item.idproduto !== action.id),

      };

    default:
      throw new Error();

  }
};

export const AddProdutosCestinhaScreen = ({navigation, route }) => {
    const { feed } = React.useContext(AuthContext);
   const { adicionacestinha } = React.useContext(AuthContext);
   const { colocanacestinha } = React.useContext(AuthContext);


   const [data, setData] = useState([]);
   const [precototal, setPreco] = useState();
   const [layoutHeight, setLayoutHeight] = useState(0);


   const [text, setText] = useState();

   const { nomeoferta, descricao, regras, valorinicial, valoroferta, idnegocio, nomenegocio, itensnum, tipoespec, app, datadecriacao, profilepic } = route.params.params;

    const cestinha = CestinhaModel()

    cestinha.nomeoferta = nomeoferta
    cestinha.descricao = descricao
    cestinha.regras = regras
    cestinha.valorinicial = valorinicial
    cestinha.valoroferta = valoroferta
    cestinha.idnegocio = idnegocio
    cestinha.nomenegocio = nomenegocio
    cestinha.itensnum = itensnum
    cestinha.tipoespec = tipoespec
    cestinha.app = app
    cestinha.datadecriacao = datadecriacao
    cestinha.profilepic = profilepic

   const groupBy = (objectArray, property) => {
      return objectArray.reduce(function (total, obj) {
          let key = obj[property];
          if (!total[key]) {
              total[key] = [];
          }
          total[key].push(obj);
          return total;
      }, {});
  }


   useEffect(() => {
    feed().then(resp => setData(JSON.parse(resp)))
   
  },[]);




  
  const goToCart = () => {
    adicionacestinha(cestinha).then(resp =>  {
      const aux = JSON.parse(resp)
      cart.forEach(function (element) {
         element.regras = aux.last;
         element.categoria = 'Cestinha'
         element.app = 'Minha horta'
      });
      colocanacestinha(cart)
    })
    navigation.push("ADM");
  };

  const onClickUpdateProduto = (data, info) => {
  
   
    const produto = ProdutoModel()

    produto.idproduto = data.idproduto
    produto.nomeproduto = data.nomeproduto
    produto.descricao = data.descricao
    produto.valor = data.valor
    produto.valoraux = data.valoraux
    produto.valorpor = data.valorpor
    produto.categoria = data.categoria
    produto.estado = data.estado
    produto.profilepic = data.profilepic

    if(!text){
      produto.itensnum = '1'
    }else{
      produto.itensnum = text.text
    }
    

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

    produto.datamodificacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
   
    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }

    setCart([...cart, produto])
    setText()
    AsyncStorage.setItem('cestinha',JSON.stringify(cart));
    
   
  }  

 const [cart, setCart] = useState([]);
    useEffect(() => {
      //AsyncStorage.removeItem('cart');
       AsyncStorage.getItem('cestinha').then((datacart)=>{
         if (datacart !== null) {
           // We have data!!
           const cart = JSON.parse(datacart)
           setCart(cart);
          
         }
         else{
           const cart  = []
         }
       })
       .catch((err)=>{
         alert(err)
       })
    },[]);
  



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
  
    var index = array.findIndex(cart => cart.idproduto === id);

    //console.log(index);

    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);

      //console.log(array)

      AsyncStorage.setItem('cestinha',JSON.stringify(array));
  

    }

  }




 
   const renderItem = ({ item }) => (

       <View style={{ flexDirection: 'row' , alignItems:'center', marginTop:15, marginLeft:15}}>
         
          <Text style={{fontSize: 12, alignItems:'center'}}> {item.nomeproduto}  {item.itensnum} {item.valorpor}  </Text>
         
                     

                       
          <TouchableOpacity style={{ alignItems: 'flex-end'}}
           onPress=
                {() => {
                  handleRemove(item.idproduto);
                }}
               >
            
             <Icon name="ios-close-circle" size={35} color={"#D11A2A"} style={{ alignItems: 'flex-end'}}/>
                        
          </TouchableOpacity>
      </View>

      
    );


  
    if (!listData.isShowList) {
      return null;
    }


  return (
    <View style={{flex: 1}}>

      <View style={{ flexDirection: 'row' }}>
        
        <View style={{ flex: 1, height:height }}>

          <View style={{      flex: 1}}>
              <Text  style={{fontSize: 13,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 20,}}>Monte sua cestinha</Text>
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                // renderItem={({ item }) => <Item title={item} />}
                renderItem = {({item}) => (
                  // <View style={{      flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
                  
                   <View style={{ flexDirection: 'row'}}>
                      <TouchableOpacity 
                             onPress=
                                  {() => {
                                      onClickUpdateProduto(item, item.itensnum);
                                  }}
                                 >
                              
                               <Icon name="ios-add-circle" size={35} color={"#33c37d"}  style={{ alignItems: 'flex-end'}}/>
                                          
                            </TouchableOpacity>
                           <Image style={styles.image} source={{ uri: item.profilepic }} />
                         

                         <View style={{ flexDirection: 'row',}}>
                          <View >
                            <Text style={{fontSize: 12,  fontWeight: "bold", alignItems:'center', width:140}}>{item.nomeproduto}</Text>
                          
                            

                         <View style={{ flexDirection: 'row',  alignItems:'center',  
                                  marginLeft: 5,
                                  marginRight: 5,}}>
                            
                            
                            <TextInput
                                  style={styles.inputStyle}
                                  onChangeText={(text) => setText({text})}
                                  underlineColorAndroid="#f000"
                                  placeholder={item.itensnum}
                                  placeholderTextColor="#8b9cb5"
                                  autoCapitalize="sentences"
                                  returnKeyType="next"
                                  
                                  keyboardType = 'numeric'
                                  blurOnSubmit={false}
                                />
                          
                            <Text style={{fontSize: 10,  }}>{item.itensnum} {item.valorpor}</Text>

                               </View>
                            
                               </View>
                          <View >
                                
                            </View>

                        </View>
                       
                          
                    </View>

                  )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text  style={{fontSize: 13,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 10,}}> { title }</Text>
                )}
              />

          </View>

          <BlankSpacer height={64} />

        </View>

        <View style={{ flex: 1, height:height }}>
          
          <Text  style={{fontSize: 13,  fontWeight: "bold", alignItems:'center',backgroundColor: '#F5FCFF',
    padding: 20,}}>Minha Cestinha</Text>
           {cart != []?  (  
          <View style={{      flex: 1}}>
     
              <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData = {cart}
              />  
          </View>

        ):null}

        <TouchableOpacity
              
              onPress={() => {
                goToCart();
              }}
              style={{
               
                backgroundColor:'#13bc01',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:10,
                marginLeft: 15,
                marginRight: 15,
                margin: 10,
              }}>
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Criar cestinha</Text>
              
              <View style={{width:10}} />

            </TouchableOpacity>
          <BlankSpacer height={64} />

        </View>

        {/* <Button style={styles.buttonStyle} */}
        {/*     activeOpacity={0.5} */}
        {/*     title="Criar cestinha" */}
        {/*     onPress={() => { */}
        {/*       goToCart(); */}
        {/*     }} */}
        {/*   /> */}

           
      </View>
         
         
 
          
  </View>


  );
};
export default AddProdutosCestinhaScreen;



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
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  // inputStyle: {
  //   flex: 1,
  //   color: 'black',
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderWidth: 0,
  //   borderColor: '#dadae8',
  //   width:120,
  // },

   inputStyle: {
    color: '#2b2b2b',
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#dadae8',
      marginLeft:1,
    marginRight: 1,
    fontSize: 13, 
    width:'40%',
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
    fontSize: 15,
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