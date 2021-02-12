import React, {useState, createRef, useEffect, useRef}  from "react";
import { NavigationContainer,Button, DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

//import {Permissions, Notifications} from 'expo'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "./src/context";

import { LoginScreen } from "./src/screens/LoginScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { AddressScreen } from "./src/screens/AddressScreen";
import { ProdutosScreen } from "./src/screens/ProdutosScreen";


import { CartScreen } from "./src/screens/CartScreen";
import { ValorConfirmaScreen } from "./src/screens/ValorConfirmaScreen";
import { ConfirmacaoScreen } from "./src/screens/ConfirmacaoScreen";
import { RealizadoScreen } from "./src/screens/RealizadoScreen";
import { PedidoScreen } from "./src/screens/PedidoScreen";
import { CestinhaEscolheItensScreen } from "./src/screens/CestinhaEscolheItensScreen";


import ADMScreen from  "./src/screens/adm/ADMScreen";
import { CriaProdutoScreen } from "./src/screens/adm/CriaProdutoScreen";
import { ADMPedidoScreen } from "./src/screens/adm/ADMPedidoScreen";
import { EditaProdutosScreen } from "./src/screens/adm/EditaProdutosScreen";
import { EditaProdutoScreen } from "./src/screens/adm/EditaProdutoScreen";
import { CriaCestinhaScreen } from "./src/screens/adm/CriaCestinhaScreen";
import { AddProdutosCestinhaScreen } from "./src/screens/adm/AddProdutosCestinhaScreen";
import { ADMDadosScreen } from "./src/screens/adm/ADMDadosScreen";
import { ADMHistoricoScreen } from "./src/screens/adm/ADMHistoricoScreen";
import { ClientelaScreen } from "./src/screens/adm/ClientelaScreen";
import { ADMClienteScreen } from "./src/screens/adm/ADMClienteScreen";
import { ADMSendNotifScreen } from "./src/screens/adm/ADMSendNotifScreen";
import { EditaCestinhaScreen } from "./src/screens/adm/EditaCestinhaScreen";



import { DrawerContent } from './src/screens/DrawerContent';

import {
  SignIn,
  CreateAccount,
  Search,
  Home,
  Details,
  Search2,
  Profile,
  Splash
} from "./src/Screens";

import LoginService from './src/services/LoginService' 
import RegisterService from './src/services/RegisterService' 
import PedidoService from './src/services/PedidoService' 
import FeedService from './src/services/FeedService'
import UpdatePedidoService from './src/services/UpdatePedidoService' 
import ADMPedidosService from './src/services/ADMPedidosService' 
import AdicionaProdutoService from './src/services/AdicionaProdutoService' 
import UpdateProdutoService from './src/services/UpdateProdutoService' 
import AdicionaCestinhaService from './src/services/AdicionaCestinhaService' 
import ColocaProdutosNaCestaService from './src/services/ColocaProdutosNaCestaService' 
import FeedCestinhaService from './src/services/FeedCestinhaService'
import PedidoProdutoService from './src/services/PedidoProdutoService'
import SendPushNotificationService from './src/services/SendPushNotificationService'
import UploadIMGService from './src/services/UploadIMGService'
import updateDevicetokenService from './src/services/updateDevicetokenService'
import SendMultiplePushNotificationService from './src/services/SendMultiplePushNotificationService'
import DeletaProdutoService from './src/services/DeletaProdutoService'
import DeletaCestinhaService from './src/services/DeletaCestinhaService'
import UpdateCestinhaService from './src/services/UpdateCestinhaService'


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ title: "Bem vindo" }}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ title: "Criando conta" }}
    />
     <AuthStack.Screen
      name="AddressScreen"
      component={AddressScreen}
      options={{ title: "Endereco" }}
    />

  </AuthStack.Navigator>
);

// const ADMStack = createStackNavigator();
// const ADMStackScreen = () => (
//   <ADMStack.Navigator>
//     {/* <ADMStack.Screen */}
//     {/*   name="ADM" */}
//     {/*   component={ADMScreen} */}
//     {/*   options={{ title: "ADM" }} */}
//     {/* /> */}
//       <ADMStack.Screen name="ADM" component={ADMScreen} options={{
//     headerLeft: null}}/>
//     {/* <ADMStack.Screen */}
//     {/*   name="RegisterScreen" */}
//     {/*   component={RegisterScreen} */}
//     {/*   options={{ title: "Criando conta" }} */}
//     {/* /> */}
//     {/*  <ADMStack.Screen */}
//     {/*   name="AddressScreen" */}
//     {/*   component={AddressScreen} */}
//     {/*   options={{ title: "Endereco" }} */}
//     {/* /> */}
// 
//   </ADMStack.Navigator>
// );

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
// 
// const HomeStackScreen = () => (
//   <HomeStack.Navigator>
//     <HomeStack.Screen name="Home" component={Home}/>
//     <HomeStack.Screen name="ProdutosScreen" component={ProdutosScreen}/>
//     <HomeStack.Screen name="Carrinho" component={CartScreen}/>
//     <HomeStack.Screen name="Pedidos" component={PedidoScreen}/>
//     <HomeStack.Screen name="ValorConfirmaScreen" component={ValorConfirmaScreen}/>
//      <HomeStack.Screen name="RealizadoScreen" component={RealizadoScreen} />
//     <HomeStack.Screen
//       name="Details"
//       component={Details}
//       options={({ route }) => ({
//         title: route.params.name
//       })}
//     />
//   </HomeStack.Navigator>
// );

// const SearchStackScreen = () => (
//   <SearchStack.Navigator>
//     <SearchStack.Screen name="Search" component={Search} />
//     <SearchStack.Screen name="Search2" component={Search2} />
//   </SearchStack.Navigator>
// );

// const ProfileStack = createStackNavigator();
// const ProfileStackScreen = () => (
//   <ProfileStack.Navigator>
//     <ProfileStack.Screen name="Profile" component={Profile} />
//   </ProfileStack.Navigator>
// );

const ProdutosStack = createStackNavigator();
const ProdutosStackScreen = () => (
  <ProdutosStack.Navigator>
    <ProdutosStack.Screen name="Inicio" component={ProdutosScreen} options={{
    headerLeft: null}}/>
    <ProdutosStack.Screen name="Carrinho" component={CartScreen} />
    <ProdutosStack.Screen name="Pedidos" component={PedidoScreen}/>
    <ProdutosStack.Screen name="Receber via Whatsapp" component={ValorConfirmaScreen} />
    <ProdutosStack.Screen name="Confirmação" component={ConfirmacaoScreen} />
    <ProdutosStack.Screen name="Pedido feito" component={RealizadoScreen} />
    <ProdutosStack.Screen name="Monta cestinha" component={CestinhaEscolheItensScreen} />

    <ProdutosStack.Screen name="ADM" component={ADMScreen}/>
    <ProdutosStack.Screen name="Add Produto" component={CriaProdutoScreen} />
    <ProdutosStack.Screen name="Pedido" component={ADMPedidoScreen} />
    <ProdutosStack.Screen name="Atualiza Produtos" component={EditaProdutosScreen} />
    <ProdutosStack.Screen name="Edita Produto" component={EditaProdutoScreen} />
    <ProdutosStack.Screen name="Cria Cestinha" component={CriaCestinhaScreen} />
    <ProdutosStack.Screen name="Add na Cestinha" component={AddProdutosCestinhaScreen} />
    <ProdutosStack.Screen name="Dados" component={ADMDadosScreen} />
    <ProdutosStack.Screen name="Historico" component={ADMHistoricoScreen} />
    <ProdutosStack.Screen name="Clientela" component={ClientelaScreen} />
    <ProdutosStack.Screen name="Cliente" component={ADMClienteScreen} />
    <ProdutosStack.Screen name="Manda Notificação" component={ADMSendNotifScreen} />
    <ProdutosStack.Screen name="Edita Cestinha" component={EditaCestinhaScreen} />
  </ProdutosStack.Navigator>
);


// 
// const TabsScreen = () => (
//   <Tabs.Navigator>
//     <Tabs.Screen name="Home" component={HomeStackScreen} />
//     <Tabs.Screen name="Search" component={SearchStackScreen} />
//   </Tabs.Navigator>
// );

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
//   <Drawer.Navigator  initialRouteName="ProdutosScreen" DrawerContent={props => <DrawerContent {...props} />}> 
//     <Drawer.Screen name="Home" component={TabsScreen} />
//     <Drawer.Screen name="ProdutosScreen" component={ProdutosStackScreen} />
//     <Drawer.Screen name="Profile" component={ProfileStackScreen} />
// 
//   </Drawer.Navigator>

  <Drawer.Navigator initialRouteName="ProdutosScreen" drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="ProdutosScreen" component={ProdutosStackScreen} />
     {/* <Drawer.Screen name="Home" component={TabsScreen} /> */}
    {/* <Drawer.Screen name="Profile" component={Profile} /> */}
    {/* <Drawer.Screen name="ADM" component={ADMScreen} /> */}
    {/* <Drawer.Screen name="ADMScreen" component={ADMStackScreen} /> */}
    {/* <Drawer.Screen name="Pedidos" component={PedidoScreen} /> */}
  </Drawer.Navigator>


);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false, 
        }}
      />
    )}
  </RootStack.Navigator>
);


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //AsyncStorage.setItem('devicetoken', token);
    //alert(token)
       
          
  
        
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications for my app, they are good.');
  }
  alert(status)
  return true;
}


export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState();
        


//         const [expoPushToken, setExpoPushToken] = useState('');
//         const [notification, setNotification] = useState(false);
//         const notificationListener = useRef();
//         const responseListener = useRef();
// 
//         useEffect(() => {
//           registerForPushNotificationsAsync().then(token => {
//               AsyncStorage.setItem('devicetoken', token);
//               alert(token)
//            });
// 
//           notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//             setNotification(notification);
//           });
// 
//           responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//             console.log(response);
//           });
// 
//           return () => {
//             Notifications.removeNotificationSubscription(notificationListener);
//             Notifications.removeNotificationSubscription(responseListener);
//           };
//         }, []);

          const [expoPushToken, setExpoPushToken] = useState('');
          const [notification, setNotification] = useState(false);
          const notificationListener = useRef();
          const responseListener = useRef();

          useEffect(() => {
            alertIfRemoteNotificationsDisabledAsync().then(respo  =>{
              if(respo){
                registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

              notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
              });

              responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
              });

              return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
              };
              }
            })
            
          }, []);
// 
// 
//   const registerForPushNotificationsAsync = async () => {
//      console.log('Oii????')
//     if (Constants.isDevice) {
//       console.log('Entrou')
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         console.log('Oi')
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         console.log('os')
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       const token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log('sdmoid')
//       console.log(token);
//       this.setState({ expoPushToken: token });
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
// 
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
//   };
// 
// 


//   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
// 
//   const CustomDefaultTheme = {
//     ...NavigationDefaultTheme,
//     ...PaperDefaultTheme,
//     colors: {
//       ...NavigationDefaultTheme.colors,
//       ...PaperDefaultTheme.colors,
//       background: '#ffffff',
//       text: '#333333'
//     }
//   }
//   
//   const CustomDarkTheme = {
//     ...NavigationDarkTheme,
//     ...PaperDarkTheme,
//     colors: {
//       ...NavigationDarkTheme.colors,
//       ...PaperDarkTheme.colors,
//       background: '#333333',
//       text: '#ffffff'
//     }
//   }
// 
//   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const authContext = React.useMemo(() => {
    return {
      LoginScreen: async (login,senha) => {
          const ret = await LoginService.login(login, senha)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
             // await SecureStore.getItemAsync('user', ret.data);
             // await SecureStore.setItemAsync('user', ret.data);
            
                if(ret.data.devicetoken!=expoPushToken){
                  if(ret.data.tipo!='adm'){
                    ret.data.devicetoken = expoPushToken
                    fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                        method: 'POST',
                        body: JSON.stringify(ret.data),
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                      
                      })
                        .then(response => response.json())
                        .then(response => {
                         
                         console.log('aksdlas')
                         console.log(response)

                       
                        })
                        .catch(error => {
                          console.log(error)
                        });
                  }else{
                        ret.data.devicetoken = expoPushToken
                        ret.data.app = 'Minha horta';
                        fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                            method: 'POST',
                            body: JSON.stringify(ret.data),
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                          
                          })
                            .then(response => response.json())
                            .then(response => {
                             
                             console.log('aksdlas')
                             console.log(response)
                           
                            })
                            .catch(error => {
                              console.log(error)
                            });
                            console.log(ret.data)
                        fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetokenadm.php', {
                            method: 'POST',
                            body: JSON.stringify(ret.data),
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                          
                          })
                            .then(response => response.json())
                            .then(response => {
                             
                             console.log('aksdlas')
                             console.log(response)

                           
                            })
                            .catch(error => {
                              console.log(error)
                            });
                  }
                }
              await AsyncStorage.setItem('user', ret.data);
              setUserToken(JSON.parse(ret.data));
              break
            case 500: 
              // console.log(ret.message)
              // setIsLoading(false);
              // setUserToken(null);
            return ret.message
              break
          }
        // setIsLoading(false);
        // setUserToken("asdf");
      },
      // LoginScreen: async (login,senha) => {
      //     const ret = await LoginService.login(login, senha)
      //     switch (ret.status) {
      //       case 200:
      //         setIsLoading(false);
      //         AsyncStorage.setItem('user', ret.data);
      //         setUserToken(JSON.parse(ret.data));
      //         break
      //       case 500: 
      //         console.log(ret.message)
      //         setIsLoading(false);
      //         setUserToken(null);
      //         break
      //     }
      //   // setIsLoading(false);
      //   // setUserToken("asdf");
      // },
      signUp: async (userData) => {
          console.log(userData)
          const ret = await RegisterService.register(userData)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
             // console.log(ret)
            //   await SecureStore.setItemAsync('user', ret.data);
               if(ret.data.devicetoken!=expoPushToken){
                  if(ret.data.tipo!='adm'){
                    ret.data.devicetoken = expoPushToken
                    fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                        method: 'POST',
                        body: JSON.stringify(ret.data),
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                      
                      })
                        .then(response => response.json())
                        .then(response => {
                         
                         console.log('aksdlas')
                         console.log(response)

                       
                        })
                        .catch(error => {
                          console.log(error)
                        });
                  }else{
                        ret.data.devicetoken = expoPushToken
                        ret.data.app = 'Minha horta';
                        fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                            method: 'POST',
                            body: JSON.stringify(ret.data),
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                          
                          })
                            .then(response => response.json())
                            .then(response => {
                             
                             console.log('aksdlas')
                             console.log(response)
                           
                            })
                            .catch(error => {
                              console.log(error)
                            });
                            console.log(ret.data)
                        fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetokenadm.php', {
                            method: 'POST',
                            body: JSON.stringify(ret.data),
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                          
                          })
                            .then(response => response.json())
                            .then(response => {
                             
                             console.log('aksdlas')
                             console.log(response)

                           
                            })
                            .catch(error => {
                              console.log(error)
                            });
                  }
                }
              await  AsyncStorage.setItem('user',ret.data);
              setUserToken(JSON.parse(ret.data));
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");
      },
      signOut: () => {
       // SecureStore.deleteItemAsync('user');
        AsyncStorage.removeItem('user');
        setIsLoading(false);
        setUserToken(null);
      },
      adicionaproduto: async (produto) => {
          console.log(produto)
          const ret = await AdicionaProdutoService.adicionaproduto(produto)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");
      },
      adicionacestinha: async (cestinha) => {
          console.log(cestinha)
          const ret = await AdicionaCestinhaService.adicionacestinha(cestinha)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              return ret.data
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");AdicionaCestinhaService
      },
      deletaproduto: async (produto) => {
      
          const ret = await DeletaProdutoService.deletaproduto(produto)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              //console.log(ret)
              return true
              break
            case 500: 
              // console.log(ret.message)
               setIsLoading(false);
              // setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");AdicionaCestinhaService
      },

      deletacestinha: async (produto) => {
      console.log(produto)
          const ret = await DeletaCestinhaService.deletacestinha(produto)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              //console.log(ret)
              return true
              break
            case 500: 
              // console.log(ret.message)
               setIsLoading(false);
              // setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");AdicionaCestinhaService
      },

      colocanacestinha: async (cestinha) => {
          //console.log(cestinha)
          const ret = await ColocaProdutosNaCestaService.colocanacestinha(cestinha)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              //setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");AdicionaCestinhaService
      },
      

      feed: async () => {
     
          const ret = await FeedService.feed();
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
             return ret.data
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              setUserToken(null);
              break
          }
      },

      feedcestinha: async (cestinha) => {
        //console.log(cestinha)
          const ret = await FeedCestinhaService.feedcestinha(cestinha);
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
             return ret.data
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              setUserToken(null);
              break
          }
      },
      pedir: async (pedido) => {
          console.log(pedido)
          const ret = await PedidoService.pedir(pedido)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              return ret.data
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      pedidoproduto: async (cart) => {
          //console.log(cestinha)
          const ret = await PedidoProdutoService.pedidoproduto(cart)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              setIsLoading(false);
              //setUserToken(null);
              break
          }

        // setIsLoading(false);
        // setUserToken("asdf");AdicionaCestinhaService
      },
      
      updatepedido: async (pedido) => {
          //console.log(pedido)
          const ret = await UpdatePedidoService.updatepedido(pedido)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              return true
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      updateproduto: async (produto) => {
          console.log(produto)
          const ret = await UpdateProdutoService.updateproduto(produto)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      updatecestinha: async (produto) => {
          console.log(produto)
          const ret = await UpdateCestinhaService.updatecestinha(produto)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      updateDevicetoken: async (user) => {
          console.log(user)
          const ret = await updateDevicetokenService.updateDevicetoken(user)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              return true
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      
       SendPushNotification: async (msg) => {
          const ret = await SendPushNotificationService.SendPushNotification(msg)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },

       SendMultiplePushNotification: async (msg) => {
          const ret = await SendMultiplePushNotificationService.SendMultiplePushNotification(msg)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },

       uploadimg: async (img) => {
          const ret = await UploadIMGService.uploadimg(img)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      
      ADMpedidos: async (pedido) => {
          console.log(pedido)
          const ret = await ADMPedidosService.ADMpedidos(pedido)
          switch (ret.status) {
            case 200:
              setIsLoading(false);
              console.log(ret)
              break
            case 500: 
              console.log(ret.message)
              //setIsLoading(false);
              //setUserToken(null);
              break
          }
      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
     //SecureStore.getItemAsync('user').then((userdata)=>{
        
      AsyncStorage.getItem('user').then((userdata)=>{
      
       if (userdata !== null ) {
         // We have data!
        alertIfRemoteNotificationsDisabledAsync().then(respo  =>{
          if(respo){
      
            registerForPushNotificationsAsync().then(token => {
              var aux = JSON.parse(userdata)
             // alert(token)
              // AsyncStorage.setItem('devicetoken', token)
              console.log(aux.devicetoken)
              if(aux.devicetoken!=token){
                if(aux.tipo!='adm'){
                  aux.devicetoken = token
                  fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                      method: 'POST',
                      body: JSON.stringify(aux),
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    
                    })
                      .then(response => response.json())
                      .then(response => {
                       
                       console.log('aksdlas')
                       console.log(response)

                     
                      })
                      .catch(error => {
                        console.log(error)
                      });
                }else{
                      aux.devicetoken = token
                      aux.app = 'Minha horta';
                      fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetoken.php', {
                          method: 'POST',
                          body: JSON.stringify(aux),
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        
                        })
                          .then(response => response.json())
                          .then(response => {
                           
                           console.log('aksdlas')
                           console.log(response)
                         
                          })
                          .catch(error => {
                            console.log(error)
                          });
                          console.log(aux)
                      fetch('https://app.diwoapp.com.br/whitela/ws/mudadevicetokenadm.php', {
                          method: 'POST',
                          body: JSON.stringify(aux),
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        
                        })
                          .then(response => response.json())
                          .then(response => {
                           
                           console.log('aksdlas')
                           console.log(response)

                         
                          })
                          .catch(error => {
                            console.log(error)
                          });
                }
              }
      
            });
          }

        });

            setUserToken('userToken')
        
        setIsLoading(false);
       }
       else{
        console.log('N~ao foi logado ainda')
       
        setUserToken()
        setIsLoading(false);
       }
      // console.log(cart)
     })
     .catch((err)=>{
       //alert(err)
     }) 


    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
     
  );
};