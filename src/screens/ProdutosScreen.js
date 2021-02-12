// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect, useFocusEffect, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, Button, SafeAreaView,  Platform, Dimensions,  FlatList,Alert,
  LayoutAnimation, 
} from 'react-native';
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

import {Permissions, Notifications} from 'expo'



import Loader from '../components/Loader';
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";


import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';



export const ProdutosScreen = ({navigation }) => {


const ExpandableComponent = ({item, onClickFunction, onAddToCart}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (!item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);


  const [data, setData] = useState(item);
  const [cart, setCart] = useState([]);
  const [precototal, setPreco] = useState();


  const updateItemInList = (index) => {
   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // console.log('item')
    // console.log(item)
    // console.log(index)
    const array = [...item.data];
    // if (multiSelect) {
    //   // If multiple select is enabled
    //   array[index]['isExpandedItem'] = !array[index]['isExpandedItem'];
    // } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index ? (
              array[placeindex]['isExpandedItem'] = !array[placeindex]['isExpandedItem']
            ) : (
              array[placeindex]['isExpandedItem'] = false
            ),
      );
    //}
    setData(array);
  };

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



  const onClickAddCart = (data, i, key) => {
     console.log('data.itensnum')
  
    console.log(data.itensnum)
  
    console.log('text')
    console.log(text)
    if(data.itensnum==1){
      console.log('Entra')
      if(typeof text === 'object' && text !== null){
           console.log('Entra')
        // data.itensnum = parseFloat(text.text)
        i = parseFloat(text.text)
      }else{
        // data.itensnum = parseFloat(text)
        i = parseFloat(text)
      }
    }else{
      i = parseFloat(data.itensnum)
    }
  


// console.log(data)
  const itemcart = {
     idproduto: data.idproduto,
     food: data,
     quantity:  i,
     price: data.valoraux*i.toFixed(2),
     id: i,
   }

    
    
   AsyncStorage.getItem('cart').then((datacart)=>{
       if (datacart !== null) {
         // We have data!!
         const cart = JSON.parse(datacart)
         // const newdata = cart.reduce((cart, {idproduto, price}) => (cart[idproduto] = (cart[idproduto] || 0) + +price, cart), {});

         //console.log(newdata);

       

        //let groupedPeople = groupBy(cart, 'idproduto');

        cart.push(itemcart)

       //console.log(cart)

        let summedAges = cart.reduce((a, c) => {
          let filtered = a.filter(el => el.idproduto === c.idproduto);
          if(filtered.length > 0){
            a[a.indexOf(filtered[0])].price += +c.price;
            a[a.indexOf(filtered[0])].quantity += +c.quantity;
          }else{
            a.push(c);
          }
          return a;
        }, []);

      //  console.log(summedAges);


         setCart(summedAges);



         AsyncStorage.setItem('cart',JSON.stringify(summedAges));
        // console.log(summedAges)
         let preco = 0
         for(let y = 0; y < summedAges.length; y++){
           preco+=summedAges[y].price
         }
         setPreco(preco.toFixed(2))
       }
       else{
        const cart  = []
        cart.push(itemcart)
         AsyncStorage.setItem('cart',JSON.stringify(cart));
         //setCart(cart);
       }
      // console.log(cart)
     })
     .catch((err)=>{
       alert(err)
     })
     updateItemInList(key);
 }

   const [text, setText] = useState(1);



  const [state, setState] = useState([]);

  const onChangeQuan = (i,type) => {
    const dataCar = data
    let cantd = parseInt(dataCar[i].itensnum);

    if (type) {
     cantd = cantd + 1
     dataCar[i].itensnum = cantd
     setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].itensnum = cantd
     setState({dataCart:dataCar})
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     setState({dataCart:dataCar})
    }
 }




  return (
    <View style={{ flex: 1 }}>
       {/* <Text>{precototal}</Text> */}
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden', flex: 1 
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.data.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
             onPress={() => {
                updateItemInList(key);
              }}
               style={{flexDirection: 'row', flex: 1 }} 
            >

         

            <Image style={styles.image} source={{ uri: item.profilepic }} />
            
        <View>
       <Text style={{fontSize:12, fontWeight:'bold', color:"#4b4b4b",
          marginLeft: 12,
          marginRight: 15,
          margin: 3,}}>
              {item.nomeproduto}
            </Text>

         <Text  style={{fontSize: 10, alignItems:'center', color:'#4b4b4b', fontStyle: 'italic',marginLeft: 15,
          marginRight: 15,
          margin: 3,}} >
                {item.descricao}    
              </Text>

             <Text style={{fontSize:10, fontWeight:'bold', color:"#4b4b4b",
          marginLeft: 15,
          marginRight: 15,
          margin: 0,}}>
           {item.valor} {item.valorpor}
          </Text>

        </View>
                  <View>
      
        </View>
            {item.isExpandedItem ? (
              <View>
          
                {item.valorpor == 'Un.' ? (
           
              <View style={{flexDirection:'row', alignItems:'center', flex: 1 }}>
                             <TouchableOpacity onPress={() => {
                onChangeQuan(key,false);
                }}>
                            
                 <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
               </TouchableOpacity>
               <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:13}}>{item.itensnum}</Text>
               <TouchableOpacity onPress={() => {onChangeQuan(key,true);}}>
                 <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
               </TouchableOpacity>
             </View>    ) : (


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
                          
                            <Text style={{fontSize: 10,  }}> {item.valorpor}</Text>

                               </View>
             )}

            <TouchableOpacity
               // onPress={onAddToCart}
              onPress=
              {() => {
                onClickAddCart(item, item.itensnum, key);
              }}
              style={{
                width:(width/2)-40,
                backgroundColor:'#33c37d',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:4
              }}>
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Add Carrinho</Text>
              <View style={{width:10}} />
            </TouchableOpacity>


            </View>
            ) : null}

          </TouchableOpacity>



        ))}
      </View>
    </View>
  );
};


   const { feed } = React.useContext(AuthContext);
   const { SendPushNotification } = React.useContext(AuthContext);
   // componentWillMount(){
   //   AsyncStorage.removeItem('cestinhacliente');
   //   
   //  }
   const [data, setData] = useState([]);
   const [precototal, setPreco] = useState();
 
   const [mostracarrinho, setMostracarrinho] = useState();
 


   React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
       AsyncStorage.removeItem('cestinhacliente');
       AsyncStorage.getItem('cart').then((datacart)=>{
         if (datacart !== null) {
           // We have data!!
           const cart = JSON.parse(datacart)
           setCart(cart);
           let preco = 0
           for(let i = 0; i < cart.length; i++){
             preco+=cart[i].price
           }
           setPreco(preco.toFixed(2))
         }
         else{
           const cart  = []
           
           //setCart(cart);
         }
       })
       .catch((err)=>{
         alert(err)
       })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

    React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
       fetch('https://app.diwoapp.com.br/whitela/ws/feedproduto.php', {
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
            let res = resJson.reduce((re, o) => {  
              let existObj = re.find(
                obj => obj.title === o.categoria
              )

              if (existObj) {
                existObj.data.push(o)
              } else {
                re.push({
                  title: o.categoria,
                  data: [o]
                })
              }
              return re
            }, [])
           // console.log(res)
            setData(res);
        }).catch(e => console.log(e));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


    
// 
// 
//    const [token, setToken] = useState();
//  
// 
//   useEffect(() => {
// 
//     AsyncStorage.getItem('devicetoken').then((devicetoken)=>{
//       //alert(devicetoken)
//       setToken(devicetoken)
//     })
// 
//   },[]);

  useEffect(() => {
   
    fetch('https://app.diwoapp.com.br/whitela/ws/feedproduto.php', {
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
            let res = resJson.reduce((re, o) => {  
              let existObj = re.find(
                obj => obj.title === o.categoria
              )

              if (existObj) {
                existObj.data.push(o)
              } else {
                re.push({
                  title: o.categoria,
                  data: [o]
                })
              }
              return re
            }, [])
           // console.log(res)
            setData(res);
        }).catch(e => console.log(e));
   
  },[]);

   const [dataCestinha, setDatacestinha] = useState([]);

  useEffect(() => {
   
    fetch('https://app.diwoapp.com.br/whitela/ws/getcestinhas.php', {
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
            
           // console.log(resJson)
            setDatacestinha(resJson);
    }).catch(e => console.log(e));
   
    },[]);

    React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
          fetch('https://app.diwoapp.com.br/whitela/ws/getcestinhas.php', {
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
                  
                 // console.log(resJson)
                  setDatacestinha(resJson);
          }).catch(e => console.log(e));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


    const [cart, setCart] = useState([]);
  
  useEffect(() => {
    AsyncStorage.removeItem('cart');
     AsyncStorage.getItem('cart').then((datacart)=>{
       if (datacart !== null) {
         // We have data!!
         const cart = JSON.parse(datacart)
         setCart(cart);
         let preco = 0
         for(let i = 0; i < cart.length; i++){
           preco+=cart[i].price
         }
         setPreco(preco.toFixed(2))
       }
       else{
         const cart  = []
         
         //setCart(cart);
       }
     })
     .catch((err)=>{
       alert(err)
     })
  },[]);


   React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        // <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
          <View>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                             <Icon name="menu-outline" size={35} color={"#33c37d"} />
                           </TouchableOpacity>
          </View>
      ),
    });
  }, [navigation]);
   


  const [multiSelect, setMultiSelect] = useState(true);
  // 
  // if (Platform.OS === 'android') {
  //   UIManager.setLayoutAnimationEnabledExperimental(true);
  // }
 
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    const array = [...data];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    }
    //  else {
    //   // If single select is enabled
    //   array.map((value, placeindex) =>
    //     placeindex === index
    //       ? (array[placeindex]['isExpanded'] =
    //          !array[placeindex]['isExpanded'])
    //       : (array[placeindex]['isExpanded'] = false),
    //   );
    // }
    setData(array);
  };

  const Teste = () => {
    
   SendPushNotification()
  };


  const callbackFunction = (childData) => {
    console.log(childData)
        this.setPreco(childData)
  }
  const goToCart = () => {
   console.log('datacart')
   AsyncStorage.getItem('cart').then((datacart)=>{
   // alert('Errorrrrrr')
     const aux = JSON.parse(datacart)
     setMostracarrinho(datacart)
     console.log(datacart)
     if(datacart){
        if(datacart.length>2){
        
           setCart(aux);
           navigation.navigate("Carrinho", {
                      screen: "Carrinho",
                      params: aux
                    });
        
        
       }else{
         Alert.alert(
                    "Carrinho vazio",
                     "Adicione itens para ir para o carrinho",
                    [
                      
                      // {
                      //   text: "Cancel",
                      //   onPress: () => console.log("Cancel Pressed"),
                      //   style: "cancel"
                      // },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                  );
       }
     }else{
          Alert.alert(
                    "Carrinho vazio",
                     "Adicione itens para ir para o carrinho",
                    [
                      
                      // {
                      //   text: "Cancel",
                      //   onPress: () => console.log("Cancel Pressed"),
                      //   style: "cancel"
                      // },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                  );
     }
     
    
   })
  };

  const onClickPedido = (cesta) => {
    //console.log(cesta)
    navigation.navigate("Monta cestinha", {
                screen: "Monta cestinha",
                params: cesta
              });
  }

   const renderItem = ({ item }) => {
    return (
      <View style={{      flex: 1,  alignItems: 'center',
    justifyContent: 'center'}}
       >
          <Image style={styles.imagecestinha} source={{ uri: item.profilepic }} />
          <Text style={styles.text}> {item.nomeoferta}</Text>
           <Text style={{fontSize:10, color:"#4b4b4b",width:120,
          margin: 5,}}>{item.descricao}</Text>

             <Text style={{fontSize:10, color:"#4b4b4b",width:120,
          margin: 5,fontWeight:'bold',textAlign:'center'}}>{item.valoroferta}</Text>

             <TouchableOpacity
               // onPress={onAddToCart}
              onPress=
              {() => {
                onClickPedido(item);
              }}
              style={{
                backgroundColor:'#33c37d',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:4
              }}>
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Cestinha</Text>
            </TouchableOpacity>

      </View>
      
    );
  };


  return (
    
     <View style={{flex:1}}>
       
          <ScrollView >

                <View>
      <Image
           source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/MinhaHorta%2FFeature%20graphic.png?alt=media&token=1a29f657-9941-49c3-94eb-1bb884be089c'}}
                    
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
          }}
        />

                  </View>
           <View style={{flex:1}}>
            <View style={{flex:1}}>
               <FlatList
                 
                  horizontal={true}
                  data={dataCestinha}
                  renderItem={renderItem}
                  keyExtractor={(item,index) => index.toString()}
                  // extraData={selectedId}
                  />


                  </View>

            <View style={{flex:1}}>
                  <ScrollView style={{ flex: 1 }}>
                      {data.map((item, key) => (
                    <ExpandableComponent
                      key={item.title}
                     
                      onClickFunction={() => {
                        updateLayout(key);

                      }}
                      item={item}
                    />
                  ))}
                </ScrollView>
            </View>


            </View>
            
    </ScrollView>
    <TouchableOpacity
              
               onPress={() => {
                 goToCart();
              }}
              style={{
               
                backgroundColor:'#13bc01',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:5,
                marginLeft: 35,
                marginRight: 35,
                margin: 5,
              }}>
                 
              <Text style={{fontSize:15, color:"white", fontWeight:"bold"}}>Ir para carrinho</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>
    </View>




  );
};
export default ProdutosScreen;

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
  // inputStyle: {
  //   flex: 1,
  //   color: 'white',
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderWidth: 1,
  //   borderRadius: 30,
  //   borderColor: '#dadae8',
  // },


   inputStyle: {
    color: '#2b2b2b',
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#dadae8',
      marginLeft:1,
    marginRight: 1,
    fontSize: 15, 
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  flatList : {
     height: 1,
    backgroundColor: '#F5FCFF',
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
    fontSize: 12,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  image: {
    height: 90,
    width : 90,
    borderRadius: 4,
  },
  imagecestinha: {
    height: 160,
    width : 160,
    borderRadius: 4,
    margin:10,
    marginTop:0,
  },
});