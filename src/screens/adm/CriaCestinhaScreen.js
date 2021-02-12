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
  TouchableOpacity,
  ScrollView, Button, SafeAreaView,Alert,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';

import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import CestinhaModel  from "../../../src/model/CestinhaModel";
import * as firebase from 'firebase';

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
  firebase.app(); // if already initialized, use that one
}

export const CriaCestinhaScreen = ({navigation , props}) => {
  const { adicionacestinha } = React.useContext(AuthContext);


  const [nomeoferta, setnomeoferta] = useState('');
  const [descricao, setdescricao] = useState('');
  const [valor, setvalor] = useState('');
  const [categoria, setcategoria] = useState('');
  const [numitens, setnumitens] = useState('');
  

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  
  const [checked, setChecked] = React.useState(false);

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const [image, setImage] = useState(null);


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

   async function Faz(){
    console.log(nomeoferta)
      var auxtext = '/MinhaHorta/'+nomeoferta
      var ref = await firebase.storage().ref().child(auxtext);
      //var starsRef = ref.child('images/stars.jpg');
      ref.getDownloadURL()
      .then((url) => {
        // Insert url into an <img> tag to "download"]c
      console.log(url)
      const cestinha = CestinhaModel()
      cestinha.nomeoferta = nomeoferta
      cestinha.descricao = descricao
      cestinha.regras = numitens
      cestinha.valorinicial = parseFloat(valor).toFixed(2)
      cestinha.valoroferta = 'R$' + parseFloat(valor).toFixed(2)
      cestinha.idnegocio = '99999'
      cestinha.nomenegocio = 'Minha horta'
      cestinha.itensnum = numitens
      cestinha.tipoespec = 'Produto'
      cestinha.app = 'Minha horta'
      cestinha.profilepic = url

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

      cestinha.datadecriacao = year + "-" + month + "-" +day + " " + hour + ":" + minutes + ":" + seconds;
      
      function checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }

    

      navigation.navigate("Add na Cestinha", {
                screen: "Add na Cestinha",
                params: cestinha
              });
      // adicionacestinha(produto)


        return url
      })
      .catch((error) => {
            return error
    
      })
    }

  
    async  function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    var auxtext = '/MinhaHorta/'+nomeoferta
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
      if(image == ''  ||  valor == ''  ||  numitens == ''  ){
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
           
       uploadImage(image).then((response)=>{
        console.log(JSON.stringify(response));
        Faz();

      }).catch((error)=>{
        console.log(JSON.stringify(error));
         Faz();
      })
    }
      
   
  };



// 
//   const [filePath, setFilePath] = useState({});
// 
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs camera permission',
//           },
//         );
//         // If CAMERA Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else return true;
//   };
// 
//   const requestExternalWritePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'External Storage Write Permission',
//             message: 'App needs write permission',
//           },
//         );
//         // If WRITE_EXTERNAL_STORAGE Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         alert('Write permission err', err);
//       }
//       return false;
//     } else return true;
//   };
// 
//   const captureImage = async (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//       videoQuality: 'low',
//       durationLimit: 30, //Video max duration in seconds
//       saveToPhotos: true,
//     };
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchCamera(options, (response) => {
//         console.log('Response = ', response);
// 
//         if (response.didCancel) {
//           alert('User cancelled camera picker');
//           return;
//         } else if (response.errorCode == 'camera_unavailable') {
//           alert('Camera not available on device');
//           return;
//         } else if (response.errorCode == 'permission') {
//           alert('Permission not satisfied');
//           return;
//         } else if (response.errorCode == 'others') {
//           alert(response.errorMessage);
//           return;
//         }
//         console.log('base64 -> ', response.base64);
//         console.log('uri -> ', response.uri);
//         console.log('width -> ', response.width);
//         console.log('height -> ', response.height);
//         console.log('fileSize -> ', response.fileSize);
//         console.log('type -> ', response.type);
//         console.log('fileName -> ', response.fileName);
//         setFilePath(response);
//       });
//     }
//   };
// 
//   const chooseFile = (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//     };
//     launchImageLibrary(options, (response) => {
//       console.log('Response = ', response);
// 
//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       console.log('base64 -> ', response.base64);
//       console.log('uri -> ', response.uri);
//       console.log('width -> ', response.width);
//       console.log('height -> ', response.height);
//       console.log('fileSize -> ', response.fileSize);
//       console.log('type -> ', response.type);
//       console.log('fileName -> ', response.fileName);
//       setFilePath(response);
//     });
//   };
// 


  
  return (
    
    <View style={{flex: 1}} >
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>



        <View style={{alignItems: 'center'}}>
      {/* <Text style={styles.titleText}> */}
      {/*   Adiocine um produto novo */}
      {/* </Text> */}
      {/*  */}

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



        <View style={{alignItems: 'center'}}>
   
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        {/* <Image */}
        {/*   source={{uri: filePath.uri}} */}
        {/*   style={styles.imageStyle} */}
        {/* /> */}
        {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
        {/* <TouchableOpacity */}
        {/*   activeOpacity={0.5} */}
        {/*   style={styles.buttonStyle} */}
        {/*   onPress={() => captureImage('photo')}> */}
        {/*   <Text style={styles.textStyle}> */}
        {/*     Launch Camera for Image */}
        {/*   </Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity */}
        {/*   activeOpacity={0.5} */}
        {/*   style={styles.buttonStyle} */}
        {/*   onPress={() => captureImage('video')}> */}
        {/*   <Text style={styles.textStyle}> */}
        {/*     Launch Camera for Video */}
        {/*   </Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity */}
        {/*   activeOpacity={0.5} */}
        {/*   style={styles.buttonStyle} */}
        {/*   onPress={() => chooseFile('photo')}> */}
        {/*   <Text style={styles.textStyle}>Choose Image</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity */}
        {/*   activeOpacity={0.5} */}
        {/*   style={styles.buttonStyle} */}
        {/*   onPress={() => chooseFile('video')}> */}
        {/*   <Text style={styles.textStyle}>Choose Video</Text> */}
        {/* </TouchableOpacity> */}
      </View>
        </View>






        <KeyboardAvoidingView enabled>

           <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
         Nome da cestinha
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nomeoferta) => setnomeoferta(nomeoferta)}
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
          
              blurOnSubmit={false}
            />



           <Text style={{fontSize: 12, color:'#13bc01',  fontWeight: "bold",  marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,}}>
          Descricao da cestinha (opcional)
           </Text>
            <TextInput
              style={styles.inputStyle}
                   onChangeText={
                (descricao) => setdescricao(descricao)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
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
                (valor) => setvalor(valor)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
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
                   Quantidade de itens para o cliente escolher
           </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                  (numitens) => setnumitens(numitens)
              }
              underlineColorAndroid="#f000"
              placeholder="Digite aqui"
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
                 
              <Text style={{fontSize:13, color:"white", fontWeight:"bold"}}>Criar</Text>
              
              <View style={{width:10}} />

          </TouchableOpacity>





        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default CriaCestinhaScreen;

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
    fontSize: 13,   width:'50%'
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