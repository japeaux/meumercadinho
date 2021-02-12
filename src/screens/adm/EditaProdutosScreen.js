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
  ScrollView, Button, SafeAreaView,  Platform, Dimensions,  FlatList,Alert,
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


const ExpandableComponent = ({item, onClickFunction, onAddToCart}) => {
  //Custom Component for the Expandable List
  const { updateproduto } = React.useContext(AuthContext);
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
  const [state, setState] = useState([]);
  const [text, setText] = useState();
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



  const onClickUpdateProduto = (data, info) => {
  //   console.log(data)
  //   console.log(text.text)
  // 
   
    const produto = ProdutoModel()

    produto.idproduto = data.idproduto
    produto.nomeproduto = data.nomeproduto
    produto.descricao = data.descricao
    produto.valor = 'R$' + data.valor
    produto.valoraux = data.valoraux
    produto.valorpor = data.valorpor
    produto.categoria = data.categoria
    produto.estado = data.estado

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
    console.log(produto.datamodificacao)
    

    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }

    console.log(info)

    if(info == 'indisponível'){
      produto.estado = 'disponível'
      console.log('entreo')
      updateproduto(produto)
    }else{   console.log('dasd')
      if(info == 'disponível'){
        produto.estado = 'indisponível'
        updateproduto(produto)
      }else{
        if(text){
        
          produto.valoraux =parseFloat(text.text).toFixed(2)
          produto.valor = "R$"+parseFloat(text.text).toFixed(2)
          console.log(produto)
          updateproduto(produto)
        }
        
      }
    }
   
   
  }  

   const [isSwitchOn, setIsSwitchOn] = React.useState(true);


  return (
    <View style={{ flex: 1 }}>
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

             <View style={{ flexDirection: 'row', justifyContent:'center'}}    key={key}>
                      <TouchableOpacity 
                             onPress=
                                  {() => {
                                     onClickUpdateProduto(item, item.valoraux);
                                  }}
                                 >
                              
                               <Icon name="refresh-circle-outline" size={35} color={"#33c37d"}  style={{ alignItems: 'flex-end'}}/>
                                          
                            </TouchableOpacity>
                           <Image style={styles.image} source={{ uri: item.profilepic }} />
                         

                         <View style={{ flexDirection: 'row',}}>
                          <View >
                            <Text style={{fontSize: 15,  fontWeight: "bold", alignItems:'center', width:140}}>{item.nomeproduto}</Text>
                          
                            

                         <View style={{ flexDirection: 'row',  alignItems:'center',  
                                  marginLeft: 5,
                                  marginRight: 5,}}>
                            
                            
                            <Text style={{fontSize: 12,  }}>  R$</Text>
                            <TextInput
                                  style={styles.inputStyle}
                                  onChangeText={(text) => setText({text})}
                                  underlineColorAndroid="#f000"
                                  placeholder={item.valoraux}
                                  placeholderTextColor="#8b9cb5"
                                  autoCapitalize="sentences"
                                  returnKeyType="next"
                                  
                                  keyboardType = 'numeric'
                                  blurOnSubmit={false}
                                />
                         
                            <Text style={{fontSize: 12,  }}> {item.valorpor}</Text>

                               </View>
                            
             

              
                               </View>
                          <View style={{alignItems:'center'}}>
                                  <Switch
                                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                    value={item.Active} //  i would like to check just one of these 
                                    // testID={index}
                                    onValueChange={(value) =>    {  
                                     
                                      if( item.Active==true ){
                                        item.Active = false;
                                        onClickUpdateProduto(item, 'disponível');
                                      }else{
                                        item.Active = true;
                                        onClickUpdateProduto(item, 'indisponível');
                                      }

                                      console.log(item.Active)
                                       fetch('https://app.diwoapp.com.br/whitela/ws/feedprodutotodos.php', {
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
                                                
                                              });

                                              console.log(resJson.estado)
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
                                              //console.log(res)
                                              setData(res);
                                          }).catch(e => console.log(e));
                                     

                                      //setState({ checked: value })
                                      }}
                                      />

                                      
                         {item.estado == 'disponível' ? (
                          <Text style={{fontSize:12,     color: '#2b2b2b', fontWeight:"bold"}}>Disponível</Text>
                          ):(
                            
                              <Text style={{fontSize:12,     color: '#8f8f8f', fontWeight:"bold"}}>Indisponível</Text>
                             
                          )}
                            </View>

                        </View>
                       
                          
                    </View>



        ))}
      </View>
    </View>
  );
};






export const EditaProdutosScreen = ({navigation }) => {
   const { feed } = React.useContext(AuthContext);
   const { updateproduto } = React.useContext(AuthContext);
   const [data, setData] = useState([]);
   const [precototal, setPreco] = useState();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
         
    fetch('https://app.diwoapp.com.br/whitela/ws/feedprodutotodos.php', {
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
            
            console.log('dnansnd')
            //resJson.map(obj=> ({ ...obj, checked: true }))

            resJson.forEach(function (element) {
              if(element.estado == 'disponível'){
                element.Active = true;
              }else{
                element.Active = false;
              }
              
            });

            console.log(resJson)
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
            console.log(res)
            setData(res);
        }).catch(e => console.log(e));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  
   useEffect(() => {
   
    fetch('https://app.diwoapp.com.br/whitela/ws/feedprodutotodos.php', {
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
              
            });

            console.log(resJson)
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
            console.log(res)
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





  const [multiSelect, setMultiSelect] = useState(true);

 
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

  const SomaPreco = (item) => {
    
   console.log(item)
  };

  const callbackFunction = (childData) => {
    console.log(childData)
        this.setPreco(childData)
  }
  const goToCart = () => {

   AsyncStorage.getItem('cart').then((datacart)=>{
     const aux = JSON.parse(datacart)
     setCart(aux);
     navigation.navigate("Carrinho", {
                screen: "Carrinho",
                params: aux
              });
   })
  };


const ExpandableEditaComponent = ({item, onClickFunction, onAddToCart}) => {
  //Custom Component for the Expandable List
  const { updateproduto } = React.useContext(AuthContext);
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

  const [text, setText] = useState();
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

    const goNext = (produto) => {
      console.log(produto)
         navigation.navigate("Edita Produto", {
                  screen: "Edita Produto",
                  params: produto
              });
    }



 const updateItemInList = (index) => {
   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
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

 


  const onClickUpdateProduto = (data, info) => {
    console.log(data)
     console.log(text.text)

   
    const produto = ProdutoModel()

    produto.idproduto = data.idproduto
    produto.nomeproduto = data.nomeproduto
    produto.descricao = data.descricao
    produto.valor = data.valor
    produto.valoraux = data.valoraux
    produto.valorpor = data.valorpor
    produto.categoria = data.categoria
    produto.estado = data.estado

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
    console.log(produto.datamodificacao)
    

    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }



    if(info == 'indisponível'){
      produto.estado = 'disponível'
      updateproduto(produto)
    }else{
      if(info == 'disponível'){
        produto.estado = 'indisponível'
        updateproduto(produto)
      }else{
        produto.valoraux = text.text
        produto.valor = "R$"+text.text
        console.log(produto)
        updateproduto(produto)
      }
    }
   
   
  }  

  const [checked, setChecked] = React.useState(false);

  const [selectedValue, setSelectedValue] = useState("Legumes");


   const [isSwitchOn, setIsSwitchOn] = React.useState(true);


  return (
   <View style={{ flex: 1 }}>
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
                //updateItemInList(key);
                    goNext(item);
              }}
               style={{flexDirection: 'row', flex: 1 }} 
            >

         

            <Image style={styles.image} source={{ uri: item.profilepic }} />
            <Text style={styles.text}>
              {item.nomeproduto}
            </Text>

           

          </TouchableOpacity>



        ))}
      </View>
    </View>
  );
};



    const goNextCestinha = (produto) => {
      console.log(produto)
         navigation.navigate("Edita Cestinha", {
                  screen: "Edita Cestinha",
                  params: produto
              });
    }



  const [editatitpo, setEditatitpo] = useState('preco');


  const onClickFeedADM = (data) => {
    if(data == 'Preco'){
      setEditatitpo('preco')
      
    }else{
      setEditatitpo('edita')  
    }
    
  }  

   const renderItem = ({ item }) => {
    return (
      <View style={{      flex: 1,backgroundColor:'#eee',   padding:10,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,borderRadius:4}}>
      
            <TouchableOpacity
                    style={styles.content}
                     onPress={() => {
                        //updateItemInList(key);
                            goNextCestinha(item);
                      }}
                       style={{flexDirection: 'row', flex: 1 }} 
                    >

                 

                    <Image style={styles.image} source={{ uri: item.profilepic }} />
                    <Text style={styles.text}>
                      {item.nomeoferta}
                    </Text>

                   

                  </TouchableOpacity>
     
   
    </View>
    );
  };

 


  return (
    <SafeAreaView style={{flex: 1}}>
    
      <View style={{ flex: 1, height:height }}>
  <View style={{ flexDirection: 'row' ,  padding:0, margin:0}}>
                <View style={{ flex: 1, padding:0, margin:0}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                      onPress=
                 {() => {
                onClickFeedADM('Preco');
              }}
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                 
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5,}}>Atualizar Preços</Text>
        
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>

                  <TouchableOpacity
                       // onPress={onAddToCart}
                    onPress=
                            {() => {
                onClickFeedADM('Edita');
              }}
          
                      style={{
                       
                        alignItems:'center',
                        justifyContent:"center",
                        borderRadius:5,
                        padding:4
                      }}>
                 
                    <Text style={{fontSize: 13,  color:"#888",  fontWeight: "bold", marginTop: 1, marginLeft: 5, marginRight: 5, }}>Editar produtos</Text>
        
                  </TouchableOpacity>
                </View>

              </View>



        {editatitpo == 'preco' ? (

          <View style={{      flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView style={{ flex: 1 }}>
                  {data.map((item, key) => (
                <ExpandableComponent
                  key={item.title}
                  
                  onAddToCart ={() => {
                    SomaPreco(key);

                  }}
                  onClickFunction={() => {
                    updateLayout(key);

                  }}
                  item={item}
                />
              ))}
            </ScrollView>
         </View>
        ) : (
          <View style={{      flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView style={{ flex: 1 }}>
                  {data.map((item, key) => (
                <ExpandableEditaComponent
                  key={item.title}
                  
                  onAddToCart ={() => {
                    SomaPreco(key);

                  }}
                  onClickFunction={() => {
                    updateLayout(key);
                
                  }}
                  item={item}
                />
              ))}
                        <TouchableOpacity
                    style={styles.content}
                     onPress={() => {
                        //updateItemInList(key);
                        //    goNextCestinha();
                      }}
                       style={{flexDirection: 'row', flex: 1 }} 
                    >

                 

                    <Text style={{fontSize: 13, backgroundColor: '#F5FCFF',
    padding: 20,color:'black',width:300}}>
                    Cestinhas
                    </Text>

                   

                  </TouchableOpacity>

              <FlatList
                data={dataCestinha}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
                // extraData={selectedId}
              />
                 
            </ScrollView>
         </View>
        )}

           <BlankSpacer height={64} />
      </View>

          
  </SafeAreaView>


  );
};
export default EditaProdutosScreen;

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