import React, { Component , useEffect, useState }  from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, Button, SafeAreaView, Alert, Linking,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  inputStyle: {
    flex: 1,
    color: '#2b2b2b',
    // paddingLeft: 15,
    // paddingRight: 15,
    borderColor: '#dadae8',
      marginLeft: 35,
    marginRight: 35,
    fontSize: 20,   width:'50%'
  },
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const AddressScreen = ({ navigation , route}) => {
  const { LoginScreen } = React.useContext(AuthContext);

  const [numeroendereco, setnumeroendereco] = useState('')
  const [complemento, setcomplemento] = useState('')
  const [endereco, setendereco] = useState('')
  const [UF, setUF] = useState('')
  const [cidade, setcidade] = useState('')
  const [bairro, setbairro] = useState('')
  const { signUp } = React.useContext(AuthContext);

  const { nomeuser, idade, contato, password } = route.params.params;

   

  const GoWpp = () =>{
    var auxnum = ' https://www.diwotech.com/pol%C3%ADtica-de-privacidade' 
    Linking.openURL(auxnum)
  }


    const Sign = () => {
       const userData = UserModel()
       
      userData.nomeuser = nomeuser
      userData.contato = contato
      userData.password = password
      userData.idade = idade
 
   if(numeroendereco){
       Alert.alert(
            "Atenção",
             "Preencha todos os campos",
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
   }else{
            userData.endereco = endereco
            userData.UF = UF
            userData.cidade = cidade
            userData.bairro = bairro
            userData.numeroendereco = numeroendereco
            userData.complemento = complemento
         
          signUp(userData).then(response =>{
            console.log(response)
            // if(response == 'Não foi possível completar login, senha ou contato inválido'){
            //   Alert.alert(
            //     "Falha ao entrar",
            //     response,
            //     [
            //       
            //       // {
            //       //   text: "Cancel",
            //       //   onPress: () => console.log("Cancel Pressed"),
            //       //   style: "cancel"
            //       // },
            //       { text: "OK", onPress: () => console.log("OK Pressed") }
            //     ],
            //     { cancelable: true }
            //   );
            // }
            
          })
   }
     
  }

  return (

    <View style={{flex: 1}} >
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
       
        <KeyboardAvoidingView enabled>

             <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
              Seu endereço
           </Text>
          <View style={{ flexDirection: "row",
        height: 100,
        paddingLeft: 20,marginVertical:0}} >  
             <GooglePlacesAutocomplete

                  placeholder='Procurar'
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(details);
                    if(data){
                      if(data.terms){
                          setendereco(data.terms[0].value);
                          setbairro(data.terms[1].value);
                          setcidade(data.terms[2].value);
                          setUF(data.terms[3].value);
                        }else{
                             Alert.alert(
                              "Endereço inválido",
                               "Preencha com um endereço válido",
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
                    }

                  
                    
                    
                  }}
                  query={{
                    key: 'AIzaSyDmS3W_0uMWgKE-fF7Dkhw-bIKDz3ZxpXk',
                    language: 'pt',
                  }}
                   requestUrl={{
                    useOnPlatform: 'web', // or "all"
                    url:
                      'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                  }}
                />
        </View>
   <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  
    marginLeft: 35,
    marginRight: 35,}}>
              Número da sua residência
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={numeroendereco => setnumeroendereco(numeroendereco)}
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
    <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
              Complemento
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={numeroendereco => setnumeroendereco(numeroendereco)}
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />

      


          <View style={{
               
                backgroundColor:'#eee',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:10,
                marginLeft: 35,
                marginRight: 35,
                margin: 10,
              }}>

              <Text style={{fontSize:12, color:"black"}}>Ao criar a sua conta você confirma que leu a nossa Política de Privacidade e os termos específicos aplicáveis no Brasil</Text>
            

   <Text style={{fontSize:13,color:"#33c37d", }}   onPress={() => GoWpp()}>Política de Privacidade</Text>
             <TouchableOpacity
              
            onPress={() => {Sign();
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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Próximo</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>


        </View>

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
//    <View style={{flex: 1}} >
// 
//    
//        
//           <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
//     marginLeft: 35,
//     marginRight: 35,
//     margin: 10,}}>
//               Número da sua residência
//            </Text>
//             <TextInput
//               style={styles.inputStyle}
//               onChangeText={numeroendereco => setnumeroendereco(numeroendereco)}
//               underlineColorAndroid="#f000"
//               placeholder="Digite aqui"
//               placeholderTextColor="#8b9cb5"
//               autoCapitalize="sentences"
//               returnKeyType="next"
//               onSubmitEditing={() =>
//                 emailInputRef.current &&
//                 emailInputRef.current.focus()
//               }
//               blurOnSubmit={false}
//             />
//     <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
//     marginLeft: 35,
//     marginRight: 35,
//     margin: 10,}}>
//               Complemento
//            </Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={numeroendereco => setnumeroendereco(numeroendereco)}
//               underlineColorAndroid="#f000"
//               placeholder="Digite aqui"
//               placeholderTextColor="#8b9cb5"
//               autoCapitalize="sentences"
//               returnKeyType="next"
//               onSubmitEditing={() =>
//                 emailInputRef.current &&
//                 emailInputRef.current.focus()
//               }
//               blurOnSubmit={false}
//             />
// 
//             {/* <TextInput style = {styles.input} */}
//             {/*    underlineColorAndroid = "transparent" */}
//             {/*    placeholder = "Numero do endereco" */}
//             {/*    placeholderTextColor = "#9a73ef" */}
//             {/*    autoCapitalize = "none" */}
//             {/*     onChangeText={complemento => setcomplemento(complemento)} */}
//             {/*     /> */}
//             {/*  */}
//             {/* <TextInput style = {styles.input} */}
//             {/*    underlineColorAndroid = "transparent" */}
//             {/*    placeholder = "Complemento" */}
//             {/*    placeholderTextColor = "#9a73ef" */}
//             {/*    autoCapitalize = "none" */}
//             {/*    onChangeText={complemento => setcomplemento(complemento)} /> */}
//           
// 
//       
//       <Button
//         title="Proximo"
//         onPress={() => console.log(userData)}
//       />
//     </View>
  );
};