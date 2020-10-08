import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Title,Left,Icon,Body ,Right,InputGroup,Button, Input,Spinner} from 'native-base';
import { View, Dimensions } from 'react-native';
import StatusB from './Components/StatusB'
import tema from './../styles/thema'

import MapView, { Polyline, Marker } from "react-native-maps";

import { openDatabase } from 'react-native-sqlite-storage';
import url from './Components/Config'
var db = openDatabase({ name: 'jucumariComprador.db' });

var {width ,height} = Dimensions.get('window'); //full width

class PerfilEmpresa extends Component {
 
    constructor(props) {
        super(props);
        this.state = {            
          lista : [] , 
          load: false ,
          llave : '' 
        };        
    }

    UNSAFE_componentWillMount(){
        this.UserDb();
      }

      UserDb(){
        db.transaction(txn=>{
            txn.executeSql('Select * from telefono;', [], (tx , result)=>{
              if (result.rows.item(0).login) {
                this.setState({llave : result.rows.item(0).login})
                this.listaEmpresa();
                
              }
            })
        })
      }

    listaEmpresa(){
        let datos = {
            accion : 'getEmpresa',
            llave : this.state.llave
        }
        fetch(url.service+'empresa', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(datos)}).then((response) => 
        response.json()).then((responseJson) => {
                this.setState({lista :  Array.from(responseJson)[0]});
                this.setState({load : true })
                ////console.log(this.state.lista.nombre)
        });
    }




  render() {

    if (this.state.load) {
        return (
            <Container>
            <Header style={tema.fondoPrincipal}>
              <Left>
                <Button transparent onPress={() => {
                  this.props.navigation.goBack();
                }}>
                  <Icon style={tema.colorDefaultLetra} name='arrow-back' />
                </Button>
              </Left>
              <Body  >
                <Title style={tema.colorDefaultLetra}> Datos de la Empresa </Title>
              </Body>
            </Header>
            <StatusB />
            <Content>
    
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: width, height: 80, justifyContent: 'center', alignItems: 'center' }} >
                  <Input style={{ fontWeight: "bold" }}  editable={false}>{this.state.lista.nombre}</Input>
                </View>
    
              </View>
    
    
    
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: width / 2, height: 40, justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ fontWeight: "bold" }}>Whatsapp :</Text>
                </View>
                <View style={{ width: width / 2, height: 40, justifyContent: 'center' }}  >
                  <Text>{this.state.lista.telefono}</Text>
                </View>
              </View>
    
            
    
    
    
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: width / 2, height: 40, justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ fontWeight: "bold" }}>Direccion :</Text>
                </View>
                <View style={{ width: width / 2, height: 80, justifyContent: 'center' }}  >
                  <Text>{this.state.lista.direccion}</Text>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: width, height: 80, justifyContent: 'center', alignItems: 'center' }} >
            <Input style={{ fontWeight: "bold" }}  editable={false}>{this.state.lista.ciudad} - {this.state.lista.pais}</Input>
                </View>
    
              </View>
    
    
    
              <MapView
                style={{ height: height*0.25}}
                initialRegion={{
                  latitude: -17.841579, 
                    longitude: -63.259904,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
                }}
              >
                <Marker
                  coordinate={{
                    latitude: -17.841579, 
                    longitude: -63.259904
                  }}
                  title="Mifacodi"
                  description="Km 9 doble via la guardia, misiones del Carmen"
                />
              </MapView>
            </Content>
          </Container>
        )
    }else{
        return (<Spinner style={{flex: 1,
          justifyContent: 'center',
          alignItems:'center'}}></Spinner>)
    }

    
  }
}

export default PerfilEmpresa;