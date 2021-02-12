import React, { Component , useEffect, useState }  from "react";
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView , Image} from "react-native";

import { AuthContext } from "./context";

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
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({ navigation }) => (

  <ScreenContainer>
    


    <Text>Master List Screen</Text>
    <Button
      title="React Native by Example"
      onPress={() =>
        navigation.push("Details", { name: "React Native by Example " })
      }
    />

    <Button
      title="RAQUIIII"
      onPress={() =>
        navigation.push("ProdutosScreen")
      }
    />


    <Button
      title="React Native School"
      onPress={() =>
        navigation.push("Details", { name: "React Native School" })
      }
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </ScreenContainer>
);

export const Details = ({ route }) => (
  <ScreenContainer>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Search = ({ navigation }) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button title="Search 2" onPress={() => navigation.push("Search2")} />
    <Button
      title="React Native School"
      onPress={() => {
        navigation.navigate("Home", {
          screen: "Details",
          params: { name: "React Native School" }
        });
      }}
    />
  </ScreenContainer>
);

export const Search2 = () => (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>
);

export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const Splash = () => (
  <ScreenContainer>
        <Image
           source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/meuhf-c5e81.appspot.com/o/splash.png?alt=media&token=a802c511-44c3-417a-ac67-c728253b6a3e'}}
                    
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
  </ScreenContainer>
);

export const SignIn = ({ navigation , props}) => {
  const { signIn } = React.useContext(AuthContext);

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')


  return (
    <ScreenContainer>
       
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={login => setLogin(login)}
                />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
                onChangeText={senha => setSenha(senha)} />
          

      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn(login,senha)} />
      <Button
        title="Create Account"
        onPress={() => navigation.push("RegisterScreen")}
      />
    </ScreenContainer>
  );
};

export const CreateAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};