import React, { Component } from 'react';
import { Container, Header, Content, Spinner, ListItem, Text, Separator, Title,Radio,Icon,Input ,Right,View, Picker, Body} from 'native-base';
import tema from './../styles/thema'
import StatusB from './Components/StatusB'
import { Dimensions ,TouchableOpacity, Image} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'jucumariComprador.db' });



import Modal, {
  ModalContent,
  SlideAnimation
} from 'react-native-modals';

var width = Dimensions.get('window').width; //full width

 class Init extends Component {

  constructor(props){
    super(props);
    this.state = {
        moneda : '' ,
        load : false ,
        swipeableModal: false,
    }
  }

  UNSAFE_componentWillMount(){
    this.moneda()
  }

  onValueChange(value) {
    //console.log(value)
    switch (value) {
      case 'bs': 
        this.actulizarMoneda(1);
        this.setState({moneda : value})
      break;
    
      case 'sus':
        this.actulizarMoneda(0);
        this.setState({moneda : value})
      break;
    }
  }

  actulizarMoneda(tipo){
    db.transaction(txn =>{
      let sql = "update telefono set tipocambio = @tipo;";
      sql = sql.replace('@tipo',tipo);
      txn.executeSql(sql,[],(tx , res)=>{
        if (res.rowsAffected > 0) {
        }
      })
    })
  }

  moneda(){
    db.transaction(txn=>{
      txn.executeSql("select * from telefono",[], (tx ,res)=>{
        this.setState({moneda : res.rows.item(0).tipocambio === 1 ? 'bs' : 'sus'})
        this.setState({load : true})
      })
    })
  }
  

  render() {
   if (this.state.load) {
    return (
      <Container>
        <Header style={tema.fondoPrincipal}>
           <Title style={tema.colorDefaultLetra, {marginTop : 15}}>Home</Title>
        </Header>
        <StatusB />
        <Content>

     


          <Separator bordered>
            <Text>Registros</Text>
          </Separator>
         
          
       

          <ListItem button={true} onPress={()=>{
                        this.props.navigation.navigate('Empleado');
                      }} >
                <Icon name="user"  type="FontAwesome5"  style={{color : 'black'}} />
                <Input  editable={false}>  Empleados</Input>
              
            </ListItem>


          <ListItem button={true} onPress={()=>{
                        this.props.navigation.navigate('Cliente');
                      }} >
                <Icon name="user"  type="FontAwesome5"  style={{color : 'black'}} />
                <Input  editable={false}>  Cliente</Input>
              
            </ListItem>

            <ListItem  button={true}  onPress={()=>{
                        this.props.navigation.navigate('Actividad');
                      }} >
                <Icon name="shopping-cart"  type="FontAwesome5"  style={{color : 'black'}} />
                <Input  editable={false}> Mis Actividades</Input>
              
            </ListItem>

            <Separator bordered>
            <Text>Control</Text>
          </Separator>

          <ListItem  button={true}   onPress={()=>{
                        this.props.navigation.navigate('ActividadEstados');
                      }} >
                <Icon name="home"  type="FontAwesome5" style={{color : 'black'}} />
                <Input  editable={false}>Control de Actividades</Input>
             
            </ListItem>

          <Separator bordered>
            <Text>Vistas</Text>
          </Separator>


          <ListItem  button={true}   onPress={()=>{
                        this.props.navigation.navigate('Pert');
                      }} >
                <Icon name="home"  type="FontAwesome5" style={{color : 'black'}} />
                <Input  editable={false}>Graficas de Actividades</Input>
             
            </ListItem>


            <ListItem  button={true}   onPress={()=>{
                        this.props.navigation.navigate('ActividadMapa');
                      }} >
                <Icon name="information-circle" style={{color : 'black'}} />
                <Input  editable={false}> Rutas de Actividades</Input>
             
            </ListItem>

          {/*<Separator bordered>
             <Text>Tipo de Moneda</Text>
          </Separator>

          <ListItem >
                <Icon name="cash" style={{color : 'black'}} />
                
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Tipo de Moneda"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.moneda}
                    onValueChange={this.onValueChange.bind(this)}>
                        <Picker.Item label="BS" value="bs" />
                        <Picker.Item label="US$" value="sus" />
                </Picker>
             
            </ListItem>
          
            <Separator bordered>
             <Text>Acerca de Mosotros</Text>
          </Separator>
          <ListItem  button={true}   onPress={()=>{
                        this.setState({swipeableModal : !this.state.swipeableModal})
                      }} >
                <Icon name="help-circle" style={{color : 'black'}} />
                <Input  editable={false}> Nosotros</Input>
             
            </ListItem>*/}
        </Content>
      </Container>
    );
   } else {
    return(<Spinner style={{flex: 1,
      justifyContent: 'center',
      alignItems:'center'}}></Spinner>)
   }
  }
}

export default Init;