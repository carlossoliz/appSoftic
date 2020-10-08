import React, { Component } from 'react'
import { View, Container, Header, Left, Button, Icon, Title, Body, Item, Input, Textarea, Content, Picker, Right, Spinner } from 'native-base'
import {StyleSheet,Platform,Alert, StatusBar,Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker ,Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'jucumariComprador.db' });
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
const { width, height } = Dimensions.get('window');
import MapViewDirections from 'react-native-maps-directions';

import url from './Components/Config'

class Mapa extends Component{
  constructor(props){
    super(props)
    this.state ={
      direccion : 'Domicilio',
      ciudad : 'Santa Cruz' , 
      latlng: undefined,
      inicioLocalizacion : undefined ,
      load : false ,
      descripcion : '' , 
      otros : false  ,
      descripcionOtros : '' ,
      rutas : [] , 
      fecha : undefined
    }
  }

  guardarDireccion(){
       
            //  this.props.navigation.goBack();
             // this.props.route.params.onSelect({ selected: true , mapa : this.state.latlng});

             console.log(this.state.latlng);
          
  }

  componentDidMount(){
    this.UserDb()
  
  }


  UserDb(){
    db.transaction(txn=>{
        txn.executeSql('Select * from telefono;', [], (tx , result)=>{
          if (result.rows.item(0).fecha) {
            this.setState({fecha : result.rows.item(0).fecha})
           
            this.rutas();
           
          }
        })
    })
  }
 
  rutas(){
    let parametros = {
      accion : 'mostrar' ,
      fecha : this.state.fecha
    }
    fetch(url.service+'ruta', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
    response.json()).then((responseJson) => {
         this.setState({rutas : responseJson})
         this.permisos();
         
    });
  }
  async permisos(){
    if (Platform.OS === "ios") {
      let permiso =await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
     // if (permiso === 'granted') {
        this.posicion()
     // }
    } 
    if (Platform.OS === 'android') {
      let permiso =await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permiso === 'granted') {
        this.posicion()
      }
    }
  }

  posicion(){
    Geolocation.getCurrentPosition(posicion =>{
      let region = {
        latitude:  posicion.coords.latitude,
        longitude:  posicion.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
     
      this.setState({latlng : region})
      this.setState({inicioLocalizacion : region})
      this.setState({load : true})
      
    }, (err) => {
     if (Platform.OS==='android') {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 1000, fastInterval: 500})
        .then(data => {
          this.permisos();
        }).catch(err => {
        });
     }
  })
  }
    render(){
        if (this.state.load) {
          return(
            <Container >
               <Header style={{backgroundColor : '#ffc301'}}>
                      <Left>
                          <Button transparent onPress={()=>{
                                  this.props.navigation.goBack();
                                //  this.props.route.params.onSelect({ selected: true });
                                
                              //this.props.navigation.navigate('PagosTabs',{onGoBack: () => this.refresh()})
                          }}>
                              <Icon name='arrow-back'></Icon>
                          </Button>
                      </Left>
                      <Body>
                          <Title style={{fontSize : 15}}>Vistas de Actividades</Title>
                      </Body>
                      <Right>
                        <Button transparent onPress={()=>{
                           this.guardarDireccion();
                        }}>
                          <Icon name='checkmark' />
                        </Button>
                      </Right>
                  </Header>
                  <StatusBar backgroundColor="#ffc301" barStyle="light-content" />
                   <Content >
                   <View style={styles.container}>
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.inicioLocalizacion}
                      >
                      {/*<Marker draggable
                          coordinate={this.state.latlng}
                        
                          onDragEnd={(e) => {
                            //console.log(e.nativeEvent.coordinate)
                            this.setState({ latlng: e.nativeEvent.coordinate })
                          }}
                        />*/}
                       
                        {
                          this.state.rutas.map((i, key) => {
                            return (
                              <Marker  key={key} draggable
                                title ={'Actividad '+i.descripcion}
                                description={ 'estado: '+ i.estado  + '  ' + 'hora: ' + i.hora.substring(0 , 5)}
                                pinColor={i.estado == 'Creado' ? 'red' : i.estado == 'Proceso' ? 'yellow' : i.estado == 'Finalizado' ? 'green' : 'blue'}
                                coordinate={{
                                  latitude:  Number(i.latitud),
                                  longitude:  Number(i.longitud),
                                  latitudeDelta: 0.015,
                                  longitudeDelta: 0.0121,
                                }}
                        />
                            )
                          })
                        }
                      </MapView>
                   </View>
                   </Content>
            </Container>
            
          )
        } else {
          return(<Spinner style={{flex: 1,
            justifyContent: 'center',
            alignItems:'center'}}></Spinner>)
        }
    }
}
const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
export default Mapa;