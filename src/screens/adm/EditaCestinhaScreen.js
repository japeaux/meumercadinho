// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity, Alert,
  ScrollView, Button, SafeAreaView,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';


import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import ProdutoModel  from "../../../src/model/ProdutoModel";
import AuxModel  from "../../../src/model/AuxModel";

import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
   var firebaseConfig = {
    apiKey: "AIzaSyBfC7Jg-OqA-KcS4op0S6HOhvpmmZfKL7A",
    authDomain: "meuhf-c5e81.firebaseapp.com",
    projectId: "meuhf-c5e81",
    storageBucket: "meuhf-c5e81.appspot.com",
    messagingSenderId: "436776784430",
    appId: "1:436776784430:web:db59cc91442cdfd0c135bf",
    measurementId: "G-X6PX436V25"
  };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;
export const EditaCestinhaScreen = ({navigation , route}) => {
  const { uploadimg } = React.useContext(AuthContext);

 const { updatecestinha } = React.useContext(AuthContext);

 const { deletacestinha } = React.useContext(AuthContext);
 
 



  const { nomeoferta, descricao, valorinicial, profilepic, itensnum, valoroferta, idofertas} = route.params.params;
 const [selectedValue, setSelectedValue] = useState("Legumes");


  const [nomeproduto1, setnomeproduto] = useState();
  const [descricao1, setdescricao] = useState();
  const [valor1, setvalor] = useState();
  const [profilepic1, setprofilepic] = useState();
    const [itensnum1, setitensnum] = useState();
  
  const aux = AuxModel()

  aux.idofertas = idofertas

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState();
  
  const [checked, setChecked] = React.useState(false);

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();


  const [image, setImage] = useState(null);
  useEffect(() => {
      setImage(profilepic)
      setnomeproduto(nomeoferta)
      setdescricao(descricao)
      setvalor(valorinicial)
       
     setitensnum(itensnum)
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
      
    }
  };

   async function CriaProduto(){
 
      var auxtext = '/MinhaHorta/'+nomeoferta
      console.log(auxtext)
      var ref = await firebase.storage().ref().child(auxtext);
      //var starsRef = ref.child('images/stars.jpg');
      ref.getDownloadURL()
      .then((url) => {
        // Insert url into an <img> tag to "download"]c
        console.log(url)
        setprofilepic(url)
        Criar(url)
        return url
      })
      .catch((error) => {
            return error
    
      })
    }

    async function Criar(url){
      const produto = ProdutoModel()


      console.log(url)
      console.log(valor1)

      produto.nomeoferta = nomeproduto1
      produto.descricao = descricao1
      produto.valoroferta = 'R$' +  parseFloat(valor1).toFixed(2)
      produto.valorinicial = parseFloat(valor1).toFixed(2)
    
      produto.profilepic = url
      produto.app = 'Minha horta'
      produto.itensnum = itensnum1
      produto.idofertas = idofertas


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
      console.log(produto)

      updatecestinha(produto)
      navigation.push('Atualiza Produtos')
   
    }


  
  //uploadImage = async(uri) => {
  async function uploadImage(url){
    const response = await fetch(url);
    const blob = await response.blob();
    var auxtext = '/MinhaHorta/'+nomeproduto
    var ref = await firebase.storage().ref().child(auxtext);
   // var snapshot = await ref.put(blob)
   // console.log(ref)
    // console.log(snapshot)
    // Get the download URL
    

    return  ref.put(blob);
  }
 
  const TiraImage = async () => {

    let result = await  ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


    const goNext = () => {
      console.log(image)
       if (image == profilepic) {
         CriaProduto();

       }else{
         uploadImage(image).then((response)=>{
          //console.log(JSON.stringify(response));
          CriaProduto();

        }).catch((error)=>{
          console.log(JSON.stringify(error));
           CriaProduto();
        })
       }
      
     
   
  };

  const deletarItem = () => {
       Alert.alert(
            "Atenção",
            'Deletando item, certeza que quer fazer isso?',
            [
              
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Excluir", onPress: () => {
                console.log(idofertas)
               deletacestinha(idofertas).then(resp =>{ navigation.push('Atualiza Produtos')})
               
              }}
            ],
            { cancelable: true }
          );
      
      
     
   
  };

 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

          <View>
            <TouchableOpacity onPress={() =>  deletarItem()} >
  
              <Icon name="trash-outline" size={35} color={"#D11A2A"} />
            </TouchableOpacity>
          </View>
      ),
    });
  }, [navigation]);
   



  
  return (
    
    <View style={{flex: 1}} >
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>




        <View style={{alignItems: 'center'}}>


        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />


        <View style={{ flexDirection: 'row' , alignItems:'center', marginTop:10, marginLeft:5}}>
           <TouchableOpacity
                 onPress={pickImage}
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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Escolher imagem</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>
           <TouchableOpacity
               onPress={TiraImage}
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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Tirar foto</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>


{/*         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
{/*           <Button title="Escolher uma imagem" onPress={pickImage} /> */}
{/*         </View> */}
{/*  */}
{/*  */}
{/*          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
{/*           <Button title="Tirar foto" onPress={TiraImage} /> */}
{/*         </View> */}


        </View>

        </View>




        <KeyboardAvoidingView enabled>

           <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
             Nome do produto
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nomeproduto1) => setnomeproduto(nomeproduto1)}
              underlineColorAndroid="#f000"
              value={nomeproduto1}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
          
              blurOnSubmit={false}
            />

{/*  */}
{/*           <Text style={styles.buttonTextStyle}> */}
{/*            */}
{/*            </Text> */}
{/*           <View style={styles.SectionStyle}> */}
{/*  */}
{/*             <TextInput */}
{/*               style={styles.inputStyle} */}
{/*             */}
{/*               underlineColorAndroid="#f000" */}
{/*               placeholder="Digite aqui" */}
{/*               placeholderTextColor="#8b9cb5" */}
{/*               autoCapitalize="sentences" */}
{/*               returnKeyType="next" */}
{/*               onSubmitEditing={() => */}
{/*                 emailInputRef.current && */}
{/*                 emailInputRef.current.focus() */}
{/*               } */}
{/*               blurOnSubmit={false} */}
{/*             /> */}
{/*           </View> */}
            <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
             Descricao do produto
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (descricao1) => setdescricao(descricao1)
              }
              underlineColorAndroid="#f000"
              value = {descricao1}
                // placeholder='{descricao1}'
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
          
              blurOnSubmit={false}
            />




                  <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
                    Valor do produto
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (valor1) => setvalor(valor1)
              }
              underlineColorAndroid="#f000"
              value={valor1}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              
              keyboardType = 'numeric'
              blurOnSubmit={false}
            />

    <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
                   Quantidade de produtos a escolher
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (itensnum1) => setitensnum(itensnum1)
              }
              underlineColorAndroid="#f000"
              value={itensnum1}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              
              keyboardType = 'numeric'
              blurOnSubmit={false}
            />




             <TouchableOpacity
                 onPress={() => {
             goNext()
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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Salvar</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>



        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default EditaCestinhaScreen;

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
    color: '#2b2b2b',
    // paddingLeft: 15,
    // paddingRight: 15,
    borderColor: '#dadae8',
      marginLeft: 35,
    marginRight: 35,
    fontSize: 15,   width:'50%'
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

});