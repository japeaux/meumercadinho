// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,Alert,
  ScrollView, Button, SafeAreaView
} from 'react-native';

import Loader from '../components/Loader';
import { AuthContext } from "../../src/context";
import UserModel  from "../../src/model/UserModel";

export const RegisterScreen = ({navigation , props}) => {
  const { signUp } = React.useContext(AuthContext);

  const [nomeuser, setnomeuser] = useState('');
  const [contato, setcontato] = useState('');
  const [password, setpassword] = useState('');
  const [idade, setidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const goNext = () => {
    if(nomeuser == ''  ||  password == '' || contato == '' ){
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
      navigation.navigate("AddressScreen", {
                screen: "AddressScreen",
                params: userData
              });
    }
    
    
    //navigation.navigate("Receber via Whatsapp");
  };


   const userData = UserModel()
       
    userData.nomeuser = nomeuser
    userData.contato = '55'+ contato
    userData.password = password
    userData.idade = idade
  
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
              Seu nome
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nomeuser) => setnomeuser(nomeuser)}
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
              Sua idade
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (idade) => setidade(idade)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              keyboardType="numeric"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />

       <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
              Seu número de whatspp ou contato
           </Text>
           <View style={{flexDirection: 'row', alignItems: 'center',    marginTop: 1,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
            <Text style={{fontSize: 15,fontWeight:'bold', color:'#13bc01'}}>+55</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (contato) => setcontato(contato)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
               keyboardType="numeric"
          
              blurOnSubmit={false}
            />

        </View>

            <Text style={{fontSize: 15, color:'#13bc01',  fontWeight: "bold",  marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
              Sua senha
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (password) => setpassword(password)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
             
              returnKeyType="next"
          
              blurOnSubmit={false}
            />



             <TouchableOpacity
              
            onPress={() => {
            goNext();
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
                 
              <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Próximo</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>




        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

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
    paddingLeft: 15,
    paddingRight: 15,
      marginLeft: 35,
    marginRight: 35,
  },
  inputStyle: {
    flex: 1,
    color: '#2b2b2b',
    // paddingLeft: 15,
    // paddingRight: 15,
    borderColor: '#dadae8',
      marginLeft: 35,
    marginRight: 35,
    margin: 10,
    fontSize: 20,   width:'100%'
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
});