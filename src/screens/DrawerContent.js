import React, {useState, useEffect} from 'react';
import { View, StyleSheet , Linking} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from "../../src/context";

export function DrawerContent(props) {

    const paperTheme = useTheme();
    const [user, setUser]= useState('');

    // AsyncStorage.getItem('user').then((userdata)=>{
    //     setUser(JSON.parse(userdata))
    //   console.log(JSON.parse(userdata))
    // })
    React.useEffect(() => {
        setTimeout(() => {
          
          AsyncStorage.getItem('user').then((userdata)=>{
         // console.log(JSON.parse(userdata))
           if (userdata !== null ) {
             // We have data!
           
            setUser(JSON.parse(userdata))
            
           }
           else{
            console.log('N~ao foi logado ainda')
           
            
           }
          // console.log(cart)
         })
         .catch((err)=>{
           //alert(err)
         }) 


        }, 1000);
      }, []);


    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{user.nomeuser}</Title>
                                {/* <Caption style={styles.caption}>{user.nomeuser}</Caption> */}
                            </View>
                        </View>

    
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Feira"
                            onPress={() => {props.navigation.navigate('ProdutosScreen')}}
                        /> 
                        {user ? (
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="albums-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Pedidos"
                                onPress={() => {props.navigation.navigate('Pedidos')}}
                            />
                            
                            
                             
                        ) : (
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="home-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Home"
                                onPress={() => {props.navigation.navigate('Home')}}
                            />
                            
                        )}

                        {user.tipo == 'adm' ? (
                            // <DrawerItem 
                            //     icon={({color, size}) => (
                            //         <Icon 
                            //         name="account-outline" 
                            //         color={color}
                            //         size={size}
                            //         />
                            //     )}
                            //     label="Administracao"
                            //     onPress={() => {props.navigation.navigate('Profile')}}
                            // />person-circle-outline"></ion-icon>
                             <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="person-circle-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Administracao"
                                onPress={() => {props.navigation.navigate('ADM')}}
                            />
                            
                            
                        ) : (
                    <Drawer.Section>
                         <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="logo-whatsapp" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Fale conosco"
                                onPress={() => {
                                         
                                            Linking.openURL('https://wa.me/554197712214')

                                    }}
                            />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="star-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Avalie nosso app"
                            onPress={() => { Linking.openURL('https://play.google.com/store/apps/details?id=com.diwocompany.Minhahorta&hl=en-US&ah=7_yp73_x-4esf_a2r2X99jVBQrw')}}
                        />

                    </Drawer.Section>

                        )}
                        
                       
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences"> */}
                    {/*     <TouchableRipple onPress={() => {toggleTheme()}}> */}
                    {/*         <View style={styles.preference}> */}
                    {/*             <Text>Dark Theme</Text> */}
                    {/*             <View pointerEvents="none"> */}
                    {/*                 <Switch value={paperTheme.dark}/> */}
                    {/*             </View> */}
                    {/*         </View> */}
                    {/*     </TouchableRipple> */}
                    {/* </Drawer.Section> */}
                </View>
                 <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="log-out-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sair"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
            </DrawerContentScrollView>
           
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 13,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
