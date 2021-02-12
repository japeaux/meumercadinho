
import React, { Component , useEffect, useState }  from 'react'
import { View, Text, StyleSheet, Button, TextInput , SectionList, FlatList, Image, TouchableOpacity, ScrollView, ListItem} from "react-native";
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';



const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const listReducer = (state, action) => {

  
  switch (action.type) {
    case 'REMOVE_ITEM':

      return {
        ...state,
        cart: state.cart.filter((item) => item.food.idproduto !== action.id),

      };

    default:
      throw new Error();

  }
};



export const CartScreen = ({ navigation , route}) => {
  
//   const onClickAddCart = (data, i) => {
//     console.log(i)
//     cart.splice(i, 1);
//     setCart(cart);
//     AsyncStorage.setItem('cart',JSON.stringify(cart));
// 
//     console.log(cart)
//   }


  const { CartScreen } = React.useContext(AuthContext);
 
  const [cart, setCart] = useState(route.params.params)
  const [preco, setPreco] = useState()
  
 
  useEffect(() => {
    setCart(route.params.params)
    console.log(cart)
    let preco = 0
    for(let i = 0; i < cart.length; i++){
        preco+=cart[i].price
      }
      console.log(preco)
    setPreco(preco.toFixed(2))

   },[])



   const [listData, dispatchListData] = React.useReducer(listReducer, {
    cart: route.params.params,
    isShowList: true,
  });

  
  function handleRemove(id) {
    console.log(id.idproduto)
  
    dispatchListData({ type: 'REMOVE_ITEM', id });
    
    UpdateStorage(id);

  }

  function UpdateStorage(id) {

    var array = [...cart]; // make a separate copy of the array
  
    var index = array.findIndex(cart => cart.food.idproduto === id);

    console.log(index);

    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);

      console.log(array)

      AsyncStorage.setItem('cart',JSON.stringify(array));
  
      let preco = 0
      for(let i = 0; i < array.length; i++){
        preco+=array[i].price
      }
      console.log(preco)
      setPreco(preco.toFixed(2))
    }

  }

  const List = ({ cart, onRemove }) => (
    <View>

    

      {cart.map((item, index) => (
        <Item key={index} item={item} onRemove={onRemove} />
      ))}

    </View>
    
  );

  const Item = ({ item, onRemove }) => (
    <View>
      {/* <Text> {item.quantity} X {item.food.nomeproduto} {item.price} </Text> */}
      {/* <Button type="button" onClick={() => onRemove(item.food.idproduto)}> */}
      {/*   Remove */}
      {/* </Button> */}
    </View>
  );



    

   const renderItem = ({ item, index }) => {
          return(

      <View style={{ flexDirection: 'row' , alignItems:'center', marginTop:20, marginLeft:35}}>
         <Image style={styles.image} source={{ uri: item.food.profilepic }} />
       
          <Text style={{fontSize: 13,  fontWeight: "bold", alignItems:'center'}}> {item.quantity} {item.food.valorpor} </Text>
          <Text style={{fontSize: 13,  fontWeight: "bold",  alignItems:'center'}}>{item.food.nomeproduto} </Text>
          <Text style={{fontSize: 13,  fontWeight: "bold",  alignItems:'center'}}> {` R$ ${item.price} `}</Text>

          <TouchableOpacity style={{ alignItems: 'flex-end'}}
           onPress=
                {() => {
                  handleRemove(item.idproduto);
                }}
               >
            
             <Icon name="ios-close-circle" size={35} color={"#D11A2A"} style={{ alignItems: 'flex-end'}}/>
                        
          </TouchableOpacity>
      </View>
          )


      }






  
  if (!listData.isShowList) {
    return null;
  }

  return (
    <View>

          <TouchableOpacity
              
            onPress={() => {
              navigation.navigate("Receber via Whatsapp", {
                screen: "Receber via Whatsapp",
                params: cart
              });
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
              
              <Text style={{fontSize:15, color:"white", fontWeight:"bold"}}>Confirmar</Text>
              
              <View style={{width:10}} />

            </TouchableOpacity>



      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 15,   
            marginLeft: 35,
            marginRight: 35,
            margin: 10,
            alignItems: 'center',}}>VALOR TOTAL: R$ {preco}</Text>
      </View>

      {cart.map((item, index) => (
        <Item key={index} item={item} onRemove={handleRemove} />
      ))}
      
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        // extraData={selectedId}
      />


  {/* <List cart={listData.cart} onRemove={handleRemove} /> */}
  
  </View>
  );
};

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
   container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  flatList : {
     height: 10,
    backgroundColor: '#F5FCFF',
    padding: 3,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
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