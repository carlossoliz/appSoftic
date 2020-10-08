import React, { Component } from 'react';
import {StyleSheet,View,Text,Image,StatusBar,Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Spinner} from 'native-base'
//import {NavigationActions} from 'react-navigation';

import { CommonActions } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import url from './Components/Config'
import tema from './../styles/thema'
var db = openDatabase({ name: 'jucumariComprador.db' });
var { height } = Dimensions.get('window');

class slider extends Component{
  constructor(props) {
    super(props);
    this.state = {
      correo: 'demo',
      pass: 'demo' ,
      empresa : url.empresa,
      sucursal : url.sucursal ,
      load : true
    }
  }

  
  registrarTelefono(llave){
    db.transaction(function(tx) {
      let fecha = new Date();
     let sql = "update telefono set login = '@login' , logueado = '1' , fecha = '@fecha' ";
     sql = sql.replace('@login', llave);
     sql = sql.replace('@fecha', new Date(fecha.getTime() - (fecha.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]);
      tx.executeSql(sql,(tx, results) => {
          //console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            //console.log('telefono update')
          } else {
            alert('Registration Failed');
          }
        }
      );
    });
  }

  loginCliente(){
    
      this.setState({spinner: true});
     
         
          
                              this.registrarTelefono('hola');
                              this.addCliente('');
                     
          
    
}

 addCliente(cliente){
    
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Principal', params: {inicio  : true} },
              ], 
            })
          );
 }
  
  _onDone = () => {
    //this.props.navigation.reset([NavigationActions.navigate({ routeName: 'login'})], 0);
    this.setState({load : false});
    db.transaction(txn=>{
      txn.executeSql("update telefono set splash = 1;",[],(tx , result)=>{
        /*this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0 ,
            routes: [
              { name: 'login' } 
            ],
          })
        );*/
        this.loginCliente()
      })
    })
    
  }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
       <StatusBar backgroundColor={item.backgroundColor} barStyle="light-content"  />
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={{height : '55%' ,  resizeMode: 'contain'}}  />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _renderDoneButton= ()=>{
    return (
      <View style={styles.buttonCircle}>
        <Text style={tema.splashButton}>Iniciar</Text>
      </View>
    );
  }

  _renderSkipButton = ()=>{
    return (
      <View style={styles.buttonCircle}>
        <Text style={tema.splashButton}>Saltar</Text>
      </View>
    );
  }

  _renderPrevButton =()=>{
    return (
      <View style={styles.buttonCircle}>
        <Text style={tema.splashButton}>Atras</Text>
      </View>
    );
  }

  _renderNextButton =()=>{
    return (
      <View style={styles.buttonCircle}>
        <Text style={tema.splashButton}>Siguiente</Text>
      </View>
    );
  }
  render() {
     if (this.state.load) {
      return (
        <AppIntroSlider  renderItem={this._renderItem} slides={slides}  
        renderDoneButton={this._renderDoneButton} 
        renderSkipButton={this._renderSkipButton} 
        renderPrevButton={this._renderPrevButton} 
        renderNextButton={this._renderNextButton} 
        showPrevButton showSkipButton onDone={this._onDone}/>
      );
     } else {
      return (<Spinner style={{flex: 1,
        justifyContent: 'center',
        alignItems:'center'}}></Spinner>)
     }
  }
}
const slides = [
  {
    key: 'somethun',
    title: 'ENCUENTRA TODO LO QUE BUSCAS',
    text: 'Puedes ver todos los productos que tenmos y hacer tu pedido',
    image: require('../assets/1.png'),
    backgroundColor: '#ffc301',
  },
  {
    key: 'somethun-dos',
    title: 'PAGA CON TARJETA',
    text: 'Puedes realizar pagos de forma segura con tu tarjeta de compras por internet',
    image: require('../assets/2.png'),
    backgroundColor: '#ffc301',
  },
  {
    key: 'somethun1',
    title: 'ESPERA EL PRODUCTO EN TU CASA',
    text: 'Realiza tu pedido y esperalo en tu casa cuidandote a ti y a los demas.',
    image: require('../assets/3.png'),
    backgroundColor: '#ffc301',
  }
];
const styles = StyleSheet.create({
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 80,
    marginTop: Platform.select({
      android: 30,
      ios: 44,
    }),
  },
});
export default slider;