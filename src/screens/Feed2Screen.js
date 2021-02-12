import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    SectionList,Text
} from "react-native";

import { AuthContext } from "../../src/context";

export default class Feed2Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: true,
        }
    }

    componentDidMount() {
        this.fetchCats();
    }

    fetchCats() {
        this.setState({ refreshing: true });
        
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

                console.log(res)
                this.setState({ data: res });
                this.setState({ refreshing: false });
            }).catch(e => console.log(e));



    }

    getListViewItem = (item) => {  
        alert(item);  
    }  

    renderItemComponent = (data) =>
       
          <TouchableOpacity style={styles.container}  style={{flexDirection: 'row'}} onPress={this.getListViewItem.bind(this, data.nomeproduto)}>
            <Image style={styles.image} source={{ uri: data.profilepic }} />
            <View>
              <Text style={styles.text} >{data.nomeproduto}</Text>
              <Text style={styles.subtext}>{data.descricao}</Text>
            </View>
          </TouchableOpacity>
          
    ItemSeparator = () => <View style={{
        height: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
    }}
    />

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
    }

    render() {
      return (
        <View style={styles.container}>
          <SectionList
            sections={this.state.data}
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>  this.renderItemComponent(item)}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',width : '100%',
    borderRadius: 4,
  },
  header:{
    paddingTop: 2,  
    paddingLeft: 10,  
    paddingRight: 10,  
    paddingBottom: 2,  
    fontSize: 22,  
    fontWeight: 'bold',  
    color: "#fff",  
    backgroundColor: '#8fb1aa',  
  },
  text:{
        
    padding: 10,  
    fontSize: 16,  
    fontWeight: 'bold',  
  },
  subtext:{
    fontSize: 12,
     marginLeft: 10 ,
    color: "#489165",  
  },
  image: {
    height: 40,
    width : 40,
    borderRadius: 4,
  },
});