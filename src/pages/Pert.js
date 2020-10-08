import React , {Component} from 'react';
import {WebView} from 'react-native-webview';
import { View, Text, Container, Header, Title, Left, Button, Body, Right, Icon, Spinner } from 'native-base';
import {StyleSheet} from 'react-native'
import StatusB from './Components/StatusB'
import tema from './../styles/thema'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'jucumariComprador.db' });
class Pert extends Component{
    constructor(props){
        super(props);
        this.state = {
          fecha : undefined ,
          load : false
        }
    }

    componentDidMount(){
      this.UserDb()
      
      
    }
    UserDb(){
      db.transaction(txn=>{
          txn.executeSql('Select * from telefono;', [], (tx , result)=>{
            if (result.rows.item(0).fecha) {
              this.setState({fecha : result.rows.item(0).fecha})
              console.log(this.state.fecha)
              this.setState({load : true})
            }
          })
      })
    }
    handleNavigationStateChange = navState => {
        ////console.log(navState);
      };
    render(){
        const injectedJs = `
      window.postMessage(window.location.href);
    `;
       if (this.state.load) {
          return(
                <Container>
                <Header style ={tema.fondoPrincipal}>
                    <Left>
                        <Button transparent onPress={()=>{
                            this.props.navigation.pop();
                        }}>
                            <Icon name='arrow-back'></Icon>
                        </Button>
                    </Left>
                        <Body>
                          <Title>
                              Diagrama De Actividades
                          </Title>
                            </Body>
                    </Header>
                    <StatusB />
            <View style={styles.conatiner}>
              <WebView originWhitelist={['*']} 
                source={{ uri: 'https://softic.webcindario.com/GoJS/samples/PERT.html?fecha='.concat(this.state.fecha)}} 
                //ref ={WEBVIEW_REF}
                //automaticallyAdjustContentInsets={false}
                allowUniversalAccessFromFileURLs
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                mixedContentMode="compatibility"
                allowingReadAccessToURL={true}
                allowFileAccess={true}
                ref={true}

                injectedJavaScript={injectedJs}
                scalesPageToFit
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
                onNavigationStateChange={this.handleNavigationStateChange}
      
              />
            </View>
          </Container>
          )
       } else {
        return (<Spinner style={{flex: 1,
          justifyContent: 'center',
          alignItems:'center'}}></Spinner>)
       }
    }
}
const styles = StyleSheet.create({
    conatiner: {
      flex: 1
    }
  });
  export default Pert;