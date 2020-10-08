import React, {Component} from 'react';
import Empleado from './Empleado';

import tema from './../styles/thema'

import {
    Container,
    Footer,
    FooterTab,
    Button,
    Icon,
    Text,
  } from 'native-base';
  import {StyleSheet,BackHandler, Alert} from 'react-native';
import Init from './Ini';
import Config from './Config';
import Actividad from './Actividad';
  //import { withNavigationFocus } from 'react-navigation';


class Principal extends Component{
    constructor(props) {
        super(props);
        this.state = { footerTab: 1,
            categoria : true ,
            ofertas : false ,
            favoritos : false ,
            configuracion : false ,
            footerTab: 1,
            backPressed: 1 ,
            principal : true ,
            colortab : 'black'
           };
           BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
           ////console.log(JSON.stringify(this.props))
      }

     
      onSelect = data => {
      
      };
      handleBackButton = () => {
        ////console.log(JSON.stringify(this.props))
        if (!this.props.route.params) {
          Alert.alert(
            'Exit Aplicacion',
            'Desea Salir de la Aplicacion?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'No'
            }, {
                text: 'Si',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
         )
         return true;
        }
       } 
    
    
       componentDidMount() {
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
       }
       
       componentWillUnmount() {
         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
       }


      renderTab = (number) => {
        switch (number) {
        case 1:
            return (
              <Init navigation={this.props.navigation}/>
            )
         break;

        case 2:
            return (
              <Empleado navigation={this.props.navigation}/>
            )
        break;

        case 3:
            return (
              <Actividad navigation={this.props.navigation}/>
            )
        break;

        case 4:
            return (
              //<Camera navigation={this.props.navigation}/>
              <Config/>
            )
        break;

          default:
            return (
              <Categoria />
            )
        }
      }

      changeTab = (number) => {
        if (this.state.footerTab !== number) {
          this.setState({ footerTab: number });
        }
      };



      changeTabColor(type){
        return type ? 'black' : '#ffc301'
      }
      render() {
        return (
          <Container>
            <Container style={styles.container}>
              
            {this.renderTab(this.state.footerTab)} 
            </Container>
            <Footer  >
              <FooterTab  style={tema.fondoPrincipal} >
                <Button style={{backgroundColor : this.changeTabColor(this.state.categoria)}} vertical active={this.state.categoria} onPress={
                    ()=>{
                        this.setState({categoria : true , ofertas : false , favoritos: false , configuracion : false})
                        this.changeTab(1);
                    }
                 }>
                  <Icon style={tema.colorDefaultLetra} active={this.state.categoria} name="home" />
                  <Text style={tema.fontCategoriaPrincipal}>Inicio</Text>
                </Button>
    
                <Button style={{backgroundColor : this.changeTabColor(this.state.ofertas)}} vertical active={this.state.ofertas} onPress={
                    ()=>{
                        this.setState({categoria : false , ofertas : true , favoritos: false , configuracion : false})
                        this.changeTab(2);
                    }
                 }>
                  <Icon style={tema.colorDefaultLetra} active={this.state.ofertas} name="person" />
                  <Text style={tema.fontCategoriaPrincipal}>Empleados</Text>
                </Button>
    
                <Button style={{backgroundColor : this.changeTabColor(this.state.favoritos)}} vertical active={this.state.favoritos} onPress={
                    ()=>{
                        this.setState({categoria : false , ofertas : false , favoritos: true , configuracion : false})
                        this.changeTab(3);
                    }
                 }>
                  <Icon style={tema.colorDefaultLetra} active={this.state.favoritos} name="walk" />
                  <Text style={tema.fontCategoriaPrincipal}>Actividades</Text>
                </Button>
    
                <Button style={{backgroundColor : this.changeTabColor(this.state.configuracion)}}  vertical active={this.state.configuracion} onPress={
                    ()=>{
                        this.setState({categoria : false , ofertas : false , favoritos: false , configuracion : true})
                        this.changeTab(4);
                    }
                 }>
                  <Icon style={tema.colorDefaultLetra} active={this.state.configuracion} name="hammer" />
                  <Text style={tema.fontCategoriaPrincipal}>Confg.</Text>
                </Button>
                
              </FooterTab>
            </Footer>
          </Container>
        );
      }
}
const styles = StyleSheet.create({
   
    title :{
      flex:0.8,
        textAlign: 'center',
        alignSelf: 'center', 
    },
    search :{
        marginRight: -290,
        textAlign: 'center'
    }
  });
export default Principal;