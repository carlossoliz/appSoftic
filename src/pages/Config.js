import React, { Component } from 'react';
import { Container, Header, Content, Spinner, ListItem, Text, Separator, Title,Radio,Icon,Input ,Right,View, Picker, Label, Button, Item} from 'native-base';
import tema from './../styles/thema'
import StatusB from './Components/StatusB'
import { Dimensions ,TouchableOpacity, Image} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'jucumariComprador.db' });

import DateTimePickerModal from "react-native-modal-datetime-picker";


import Modal, {
  ModalContent,
  SlideAnimation
} from 'react-native-modals';

var width = Dimensions.get('window').width; //full width

 class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
        fecha : undefined ,
        load : false ,
        isDatePickerVisibleFecha: false,
        swipeableModal : false
    }
  }
  handleConfirmFecha = (date) => {
           
    this.setState({fecha : new Date( date.getTime() - (date.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]})
    this.updateFecha()
    this.hideDatePickerFecha();
  };

  hideDatePickerFecha = () => {
    this.setState({isDatePickerVisibleFecha : false})
 };
  UNSAFE_componentWillMount(){
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
  


  updateFecha(){
    db.transaction(txn=>{
      let sql = "update telefono set fecha = '@fecha';";
      sql = sql.replace('@fecha' , this.state.fecha)
        txn.executeSql(sql, [], (tx , result)=>{
          if (result.rowsAffected) {
           
            console.log('modifico')
             this.setState({load : true})
          }
        })
    })
  }
  showDatePickerFecha = () => {
    this.setState({isDatePickerVisibleFecha : true})
  };
  render() {
   if (this.state.load) {
    return (
      <Container>
        <Header style={tema.fondoPrincipal}>
          <Title style={tema.headerCategoriaTitulo}>
            Softic
                        </Title>
        </Header>
        <StatusB />
        <Content>

        <Modal
          onDismiss={() => {
            this.setState({ swipeableModal: false });
          }}
          width={0.9}
          visible={this.state.swipeableModal}
          rounded
          actionsBordered
          onSwipeOut={() => {
            this.setState({ swipeableModal: false });
          }}
          onTouchOutside={() => {
            this.setState({ swipeableModal: false });
          }}
          swipeDirection={['down', 'up']}
          modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
         
        >
          <ModalContent
            style={{ backgroundColor: '#fff', paddingTop: 24 }}
          >
            <View style={{flexDirection : 'column'}}>
               <View style={{flexDirection : 'row',
                    justifyContent: 'center',
                    alignItems:'center'}}>
                  <Image source={require('../assets/logo.png')} style={{height : 120 , width : 120}}/>
                  <Input  editable={false}>Marketing Total</Input>
               </View>
               <View style={{justifyContent: 'center',
                    alignItems:'center'}}>
                 <Text>Version 1.0.1 - Marketing Total</Text>
                 <Text>© Copyright SOFTIC</Text>
                 <Text>Aplicacion Desarrollado Por</Text>
                 <Image source={require('../assets/softic.png')} style={{marginTop : 10 ,height : 50 , width : 80}}/>
               </View>
            </View>
          </ModalContent>
        </Modal>


          <Separator bordered>
            <Text>Datos Usuario</Text>
          </Separator>
         
          
       

          <ListItem button={true} onPress={()=>{
                        this.props.navigation.navigate('Perfil');
                      }} >
                <Icon name="user"  type="FontAwesome5"  style={{color : 'black'}} />
                <Input  editable={false}>  Mi Perfil</Input>
              
            </ListItem>

         
          
          


          <Separator bordered>
            <Text>Datos de la Empresa</Text>
          </Separator>


          <ListItem  button={true}   onPress={()=>{
                        this.props.navigation.navigate('PerfilEmpresa');
                      }} >
                <Icon name="home"  type="FontAwesome5" style={{color : 'black'}} />
                <Input  editable={false}> Perfil Empresa</Input>
             
            </ListItem>


            <ListItem  button={true}   onPress={()=>{
                        this.props.navigation.navigate('Sugerencia');
                      }} >
                <Icon name="information-circle" style={{color : 'black'}} />
                <Input  editable={false}> Sugerencias</Input>
             
            </ListItem>

            <Separator bordered>
             <Text>Fecha de Trabajo</Text>
          </Separator>

          <Item>
            <Label>Fecha :</Label>
             <Input editable={false} value={this.state.fecha}/>
            <Button transparent  onPress={this.showDatePickerFecha}>
                <Text>
                    Cambiar
                </Text>
            </Button>
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisibleFecha}
                    mode="date"
                    onConfirm={this.handleConfirmFecha}
                    onCancel={this.hideDatePickerFecha}
                />
            </Item>
          
            <Separator bordered>
             <Text>Acerca de Mosotros</Text>
          </Separator>
          <ListItem  button={true}   onPress={()=>{
                        this.setState({swipeableModal : !this.state.swipeableModal})
                      }} >
                <Icon name="help-circle" style={{color : 'black'}} />
                <Input  editable={false}> Nosotros</Input>
             
            </ListItem>
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

export default Config;