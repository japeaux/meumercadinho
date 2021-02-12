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
  ScrollView, Button, SafeAreaView,Dimensions,
  
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import BlankSpacer from "react-native-blank-spacer";

import Loader from '../../components/Loader';
import { AuthContext } from "../../../src/context";
import PedidoModel  from "../../../src/model/PedidoModel";
var { width } = Dimensions.get("window")

export const ADMDadosScreen = ({navigation , route}) => {
  

  const [datadia, setDatadia] = useState([]);
  const [datames, setDatames] = useState([]);
  const [dataever, setDataever] = useState([]);
  
  useEffect(() => {
   //
    fetch('https://app.diwoapp.com.br/whitela/ws/getmaisvendidosdia.php', {
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
             resJson.forEach(function (element) {
                element.name = element.nomeproduto;
                element.color = getRandomColor();
                element.num = parseFloat(element.n)
                element.legendFontColor = "#7F7F7F"
                element.legendFontSize = 13
              });

            setDatadia(resJson)
           // console.log(resJson)
        }).catch(e => console.log(e));

    fetch('https://app.diwoapp.com.br/whitela/ws/getdadosmaisvendidosmes.php', {
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
            resJson.forEach(function (element) {
                element.name = element.nomeproduto;
                element.color = getRandomColor();
                element.num = parseFloat(element.n)
                element.legendFontColor = "#7F7F7F"
                element.legendFontSize = 13
              });

            setDatames(resJson)
           // console.log(resJson)
        }).catch(e => console.log(e));


    fetch('https://app.diwoapp.com.br/whitela/ws/getdadosmaisvendidos.php', {
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
            resJson.forEach(function (element) {
                element.name = element.nomeproduto;
                element.color = getRandomColor();
                element.num = parseFloat(element.n)
                element.legendFontColor = "#7F7F7F"
                element.legendFontSize = 13
              });

            setDataever(resJson)
           // console.log(resJson)
        }).catch(e => console.log(e));
   
  },[]);


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => 'rgba(26, 255, 146, ${opacity})',
    strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    decimalPlaces: 2,
    useShadowColorFromDataset: false // optional
  };


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

   



  
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{ flex: 1 }}>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>
            Produtos mais vendidos HOJE
          </Text>
          
          <PieChart
            data={datadia}
            
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="num"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute 

            
          />

       
        </View>

         <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>
            Produtos mais vendidos este mes
          </Text>
          
          <PieChart
            data={datames}
           //  width={width-10}
           //  height={500}
           // 
           //  chartConfig={chartConfig}
            // backgroundColor={"transparent"}
            // paddingLeft={"15"}
            // center={[10, 50]}

             width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              color:'red'
            }}
            accessor="num"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute 

          />

       
        </View>

         <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>
            Produtos mais vendidos 
          </Text>
          
          <PieChart
            data={dataever}
            
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              padding:10,
            }}
            accessor="num"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute 

          />

       
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};
export default ADMDadosScreen;

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
    fontSize: 18,
    padding: 30,
  },
});