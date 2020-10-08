import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label , Button , Text ,Title ,Spinner, Icon} from 'native-base';
import {StyleSheet,StatusBar,Alert,TouchableOpacity} from 'react-native';
//import {NavigationActions} from 'react-navigation';

import { CommonActions , StackActions} from '@react-navigation/native';
import { AccessToken, GraphRequest, GraphRequestManager , LoginManager } from 'react-native-fbsdk';
import { GoogleSignin ,statusCodes } from '@react-native-community/google-signin';
import { openDatabase } from 'react-native-sqlite-storage';
import StatusB from './Components/StatusB'
import tema from './../styles/thema'
import url from './Components/Config'
var db = openDatabase({ name: 'jucumariComprador.db' });

 class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      pass: '' ,
      empresa : url.empresa,
      sucursal : url.sucursal,
      spinner : false ,
      userInfo : null ,
      login : '' ,
      token : '' ,
      hide : true
    };
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
   // await this._getCurrentUser();
  }


  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //console.log(JSON.stringify(userInfo))
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }
  _configureGoogleSignIn() {
    GoogleSignin.configure({
     // webClientId : '761536460779-o1ubslugsvvdcabsnnbcsaevdb8u6bh1.apps.googleusercontent.com',
      webClientId: '761536460779-fe3fqcro78ufcmhlu393rnce12jcgtj3.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
    registrarTelefono(llave){
      db.transaction(function(tx) {
       let sql = "update telefono set login = '@login' , logueado = '1' ";
       sql = sql.replace('@login', llave);
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

    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({login : 'google'});
        this.setState({ userInfo, userInfo });
        this.loginCliente()
      } catch (error) {
        //console.log(JSON.stringify(error))
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
           // Alert.alert('cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert('in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // android only
            Alert.alert('play services not available or outdated');
            break;
          default:
            Alert.alert('Something went wrong', error.toString());
            this.setState({
              error,
            });
        }
      }
    };

spinnerF(si){
  if(si){
    return(<Spinner style={{flex: 1,
      justifyContent: 'center',
      alignItems:'center'}}></Spinner>);
  }else{
    return;
  }
}

loginCliente(){
    if ((this.state.correo.length > 0 && this.state.pass.length > 0) || this.state.login.length > 0) {
      this.setState({spinner: true});
      fetch(url.service+'loginClienteEmpresa', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(this.state)}).then((response) => 
        response.json()).then((responseJson) => {
          try {
            let lista = Array.from(responseJson);
            if(lista[0].id.length > 0){
              //console.log(JSON.stringify(lista[0].id[0]));
              const  listRadio = async () => {
               /* const { selectedItem  } = await DialogAndroid.showPicker('Seleccione la Empresa', null, {
                    positiveText: 'OK',
                    negativeText: 'Cancelar',
                    type: DialogAndroid.listRadio,
                    selectedId: 'apple',
                    items: lista
                });*/
               // if (selectedItem) {
                    // when negative button is clicked, selectedItem is not present, so it doesn't get here
                 //   //console.log('You picked:', selectedItem);
                    let params = {
                      e : lista[0].label.split('-')[0] ,
                      s:  lista[0].label.split('-')[1],
                      d : '12346-7888',
                      id : lista[0].id[0].idcliente
                    };
                    fetch(url.service+'jucumariCliente', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(params)}).then((response) => 
                    response.json()).then((responseJson) => {
                      //console.log(responseJson)
                           if (responseJson.llave) {
                              this.registrarTelefono(responseJson.llave);
                              this.addCliente(lista[0].id[0]);
                            }
                    })
              //  }
              }
              listRadio();
            }else{
              Alert.alert(
                'Login',
                'Los Datos Ingresados son Incorrectos',
                [
                  {text: 'Aceptar', onPress: () =>this.setState({spinner : false})},
                ],
                { cancelable: false }
              )
            }
          } catch (error) {
            Alert.alert(
              'Login',
              'Los Datos Ingresados son Incorrectos',
              [
                {text: 'Aceptar', onPress: () =>this.setState({spinner : false})},
              ],
              { cancelable: false }
            )
          }
      });
    } else {
      Alert.alert(
        'Login',
        'Debe ingresar Datos',
        [
          {text: 'Aceptar', onPress: () =>this.setState({spinner : false})},
        ],
        { cancelable: false }
      )
    }
}

 addCliente(cliente){
    db.transaction(txn=>{
      /*let sql = `insert into cliente(idcliente,nombre,nit,ci,direccion,telefono,obsv,estado,latitud,longitud,correo,pass,sexo,imagen,recuperarpass) 
      values(@idcliente,'@nombre','@nit','@ci','@direccion','@telefono','@obsv','@estado','@latitud','@longitud','@correo','','@sexo','@imagen','@recuperarpass');`;*/
      let sql = `update cliente set nombre = '@nombre' , nit = '@nit' , ci = '@ci' , direccion = '@direccion' , telefono = '@telefono' , obsv = '@obvs' ,
      estado = '@estado' , latitud = '@latitud' , longitud = '@longitud' , correo = '@correo' , pass = '@pass' ,sexo = '@sexo' ,imagen = '@imagen' ,recuperarpass = '@recuperarpass' ,idcliente = @idcliente `;
      sql = sql.replace('@nombre',cliente.nombre);
      sql = sql.replace('@nit' , cliente.nit);
      sql = sql.replace('@ci',cliente.ci);
      sql = sql.replace('@direccion',cliente.direccion);
      sql = sql.replace('@telefono',cliente.telefono);
      sql = sql.replace('@obsv',cliente.obsv);
      sql = sql.replace('@estado',cliente.estado);
      sql = sql.replace('@latitud',cliente.latitud);
      sql = sql.replace('@longitud',cliente.longitud);
      sql = sql.replace('@correo',cliente.correo);
      sql = sql.replace('@sexo',cliente.sexo);
      sql = sql.replace('@imagen',cliente.imagen);
      sql = sql.replace('@recuperarpass',cliente.recuperar);
      sql = sql.replace('@idcliente',cliente.idcliente);
      //console.log(sql)
      txn.executeSql(sql,[],(tx,res)=>{
        if (res.rowsAffected > 0) {
          this.props.navigation.goBack();
          this.props.route.params.onSelect({ selected: false });
        }else{
          
        }
      })
    })
 }
 showPassword(){
   this.setState({hide : this.state.hide ? false : true})
 }
  
  render() {
    return (
      <Container >
        <Header  style={tema.headerLogin} >
          <Title  style={tema.colorDefaultLetra}>Inicio De Sesion</Title>
        </Header>
        <StatusB/>
        <Content style= {{marginTop: 40}} >
          <Form>
         
            <Item inlineLabel>
              <Label>Correo :</Label>
              <Input onChangeText={(value) => this.setState({correo: value})} value={this.state.correo}  keyboardType="email-address"
                  autoCorrect={true}
                  autoCapitalize="none"/>
            </Item>
            <Item inlineLabel last>
              <Label >Password :</Label>
              <Input  secureTextEntry={this.state.hide}  onChangeText={(value) => this.setState({pass: value})} value={this.state.pass}/>
              <TouchableOpacity onPress={() => this.showPassword()}>
                <Icon active name='eye' />
              </TouchableOpacity>
            </Item>
              <Button style= {tema.agregarCarrito} block onPress={() =>{
                  this.loginCliente();
              }} >
                 <Text style={tema.colorDefaultLetra}>Ingresar</Text>
              </Button>
              
              <Text style={styles.TextStyle} onPress={ ()=> this.props.navigation.navigate('RecuperarPass') } >RESTABLECER LA CONTRASE$A</Text>
              <Text style={styles.TextStyle} onPress={ ()=> this.props.navigation.navigate('Registrar') } >CREAR UNA CUENTA</Text>
              <Button style={{backgroundColor:'#4285F4',marginTop: 40, padding: 10, marginLeft: 35, marginRight: 35,borderRadius : 10}} block onPress={ ()=>{
                /* LoginManager.logInWithPermissions(["public_profile" , "email"]).then((result)=> {
                        if (result.isCancelled) {
                          //console.log("Login cancelled");
                        } else {
                          AccessToken.getCurrentAccessToken().then((data) => {
                            this.setState({token : data.accessToken.toString()});

                                const infoRequest = new GraphRequest(
                                  '/me' , 
                                  {
                                    parameters: {
                                      fields : {
                                        string : 'email,name,id,picture'
                                      },
                                      access_token : {
                                        string : data.accessToken.toString()
                                      }
                                    }
                                  },
                                  this._responseInfoCallBack
                                );
                                new GraphRequestManager().addRequest(infoRequest).start();
                              }
                            )
                        }
                      },
                      (error)=> {
                        //console.log("Login fail with error: " + error);
                      }
                    );*/
              }}> 
               <Icon name='logo-facebook' ></Icon>
                <Text>Iniciar Con Facebook</Text>
              </Button>

              <Button style={{backgroundColor : '#DB4437',marginTop: 40, padding: 10, marginLeft: 35, marginRight: 35,borderRadius : 10}} block onPress={this._signIn}>
                <Icon name='logo-google'></Icon>
                <Text>Iniciar con Google</Text>
              </Button>
             
          </Form>
          {this.spinnerF(this.state.spinner)}
        </Content>
      </Container>
    );
  }

  _responseInfoCallBack = (error , result)=> {
    if (error) {
      
      alert("error de datos" + error.toString())
    } else {
      this.setState({login : 'facebook'});
      this.setState({userInfo:result});
      this.loginCliente()
     // alert("resultados" + JSON.stringify(result.email))
    }
  }
  
}


const styles = StyleSheet.create({
  header: {
    height: Platform.select({
        android: 56,
        default: 44,
      }),
      backgroundColor : '#ffc301',
  },
  title :{
    flex:0.8,
      textAlign: 'center',
      alignSelf: 'center', 
      color : 'black'
  },
  TextStyle: {
    textDecorationLine: 'underline',
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center'
  }


  
});

export default login;