import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Text, Title, View } from 'native-base';
import React , {Component} from 'react';
import StatusB from './Components/StatusB'
import tema from './../styles/thema'
import MultiSelect from 'react-native-multiple-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import url from './Components/Config';
import {Alert} from 'react-native';

class Actividad extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre : '',
            pesimista : null,
            probable : null, 
            optimista :null,
            hora :  new Date() ,
            fecha : new Date()  ,
            items : [],
              itemsEmpleados : [],
              selectedItems : [] ,
              selectedItemsEmpleados : [] ,
              isDatePickerVisible : false ,
              isDatePickerVisibleFecha : false ,
            mapa : {} ,
            itemsClientes : [] ,
            selectedItemsClientes : []
            
        }
    }
 
   UNSAFE_componentWillMount(){
     this.empleados();
     this.actividades();
     this.clientes()
   }

 

    guardar(){
        console.log(this.state);
        let parametros = {
            accion : 'insertar',
            nombre : this.state.nombre ,
            optimista : this.state.optimista ,
            probable : this.state.probable ,
            pesimista : this.state.pesimista ,
            fecha : new Date( this.state.fecha.getTime() - (this.state.fecha.getTimezoneOffset()*60*1000)).toISOString().split('T')[0], 
            hora : this.state.hora.toLocaleTimeString().substring(0 , 5),
            predecesor : this.state.selectedItems.length > 0 ? '{'+this.state.selectedItems.toString()+'}' : -1 ,
            idcliente : this.state.selectedItemsClientes.toString()
        }

      
        fetch(url.service+'actividad', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
        response.json()).then((responseJson) => {
            if (responseJson[0].actividad_insertar > 0) {
                 this.insertarRuta(responseJson[0].actividad_insertar)
            }
        });
    }
     

    insertarRuta(idactividad ){
      let parametros = {
        accion : 'insertar' ,
        latitud : this.state.mapa.latitude ,
        longitud : this.state.mapa.longitude ,
        descripcion : this.state.nombre ,
        idactividad : idactividad
      }
      fetch(url.service+'ruta', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
      response.json()).then((responseJson) => {
          if (responseJson[0].ruta_insertar >0) {
              this.insertarEstado(idactividad,1);
          }
      });
    }

    insertarEstado(idactiviad,idestado){
      let parametros = {
        accion : 'insertar' ,
        idactividad : idactiviad ,
        idestado : idestado ,
        hora :  this.state.hora.toLocaleTimeString().substring(0 , 5)
      }
      fetch(url.service+'ActividadEstado', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
      response.json()).then((responseJson) => {
         if (responseJson[0].actividadestado_insertarp > 0) {
            this.limpiarDatos()
         }
      });
    }

    empleados(){
      let parametros = {
        accion : 'mostrar'
      }
      fetch(url.service+'empleado', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
      response.json()).then((responseJson) => {
           this.setState({itemsEmpleados : responseJson})
      });
    }

    clientes(){
      let parametros = {
        accion : 'mostrar'
      }
      fetch(url.service+'cliente', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
      response.json()).then((responseJson) => {
           this.setState({itemsClientes : responseJson})
      });
    }

    actividades(){
      let parametros = {
        accion : 'actividadFecha' ,
        fecha : this.state.fecha
      }
      fetch(url.service+'actividad', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
      response.json()).then((responseJson) => {
           this.setState({items : responseJson})
      });
    }

      onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
      };


      onSelectedItemsChangeCliente = selectedItemsClientes => {
        this.setState({ selectedItemsClientes });
      };
      onSelectedItemsChangeEmpleados = selectedItemsEmpleados => {
        this.setState({ selectedItemsEmpleados });
      };

       showDatePicker = () => {
        this.setState({isDatePickerVisible : true})
      };

      showDatePickerFecha = () => {
        this.setState({isDatePickerVisibleFecha : true})
      };

       hideDatePicker = () => {
         this.setState({isDatePickerVisible : false})
      };
      hideDatePickerFecha = () => {
        this.setState({isDatePickerVisibleFecha : false})
     };

       handleConfirm = (date) => {
           
        this.setState({hora : date})
        this.hideDatePicker();
      };
    

      handleConfirmFecha = (date) => {
           
        this.setState({fecha : date})
        this.hideDatePickerFecha();
      };

    onSelect = data => {
      console.log(data.mapa)
        if (data.mapa) {
           this.setState({mapa : data.mapa});
        }
    };
   
   limpiarDatos(){
      this.setState({nombre : ''})
      this.setState({pesimista : null})
      this.setState({probable : null})
      this.setState({optimista : null})
      this.setState({hora : new Date()})
      this.setState({fecha : new Date()})
      this.setState({items : []});
      this.setState({itemsEmpleados : []});
      this.setState({selectedItems : []});
      this.setState({selectedItemsEmpleados : []});
      this.setState({selectedItemsClientes : []});
      this.setState({itemsClientes : []});
      this.setState({mapa : {}});
      this.actividades();
      this.empleados();
      this.clientes()
      Alert.alert(
        'Mensaje',
        'Actividad Registrada',
        [
          {text: 'Aceptar', onPress: () =>{}},
        ],
        { cancelable: false }
      )
   }

    render(){
        const { selectedItems , selectedItemsEmpleados,selectedItemsClientes} = this.state;
        return(
            <Container>
                <Header style={tema.fondoPrincipal}>
                    <Left>
                        <Button transparent onPress={() => {
                        this.props.navigation.goBack();
                        }}>
                        <Icon style={tema.colorDefaultLetra} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: 45 }} >
                        <Title style={tema.colorDefaultLetra}>Actividades</Title>
                    </Body>
                </Header>
                <StatusB />
                <Content>
                    <Form  style= {{marginTop: 40}}>
                        <Item inlineLabel>
                            <Label>Nombre :</Label>
                            <Input onChangeText={(value) => this.setState({nombre: value})} value={this.state.nombre}/>
                        </Item>

                        <Item inlineLabel>
                            <Label>Optimista :</Label>
                            <Input onChangeText={(value) => this.setState({optimista: value})} value={this.state.optimista} keyboardType='numeric'/>
                        </Item>

                        <Item inlineLabel>
                            <Label>Probable :</Label>
                            <Input onChangeText={(value) => this.setState({probable: value})} value={this.state.probable} keyboardType='numeric'/>
                        </Item>

                        <Item inlineLabel>
                            <Label>Pesimista :</Label>
                            <Input  onChangeText={(value) => this.setState({pesimista: value})} value={this.state.pesimista} keyboardType='numeric'/>
                        </Item>
                      <View>
                      <MultiSelect styleTextDropdown={{ marginLeft : 15}} styleTextDropdownSelected={{ marginLeft : 15}}
                            hideTags
                            submitButtonColor='#ffc301'
                            items={this.state.items}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Predecesores"
                            searchInputPlaceholderText="Buscar..."
                            onChangeInput={ (text)=> console.log(text)}
                            displayKey="nombre"
                            submitButtonText="Aceptar"
                            />
                      </View>
            <View>
            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
            </View>
            <Item>
            <Label>Fecha :</Label>
             <Input editable={false} value={this.state.fecha.toLocaleDateString()}/>
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

            <Item>
            <Label>Hora :</Label>
             <Input editable={false} value={this.state.hora.toLocaleTimeString().substring(0 , 5)}/>
            <Button transparent  onPress={this.showDatePicker}>
                <Text>
                    Cambiar
                </Text>
            </Button>
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
            </Item>
            <View>
                      <MultiSelect styleTextDropdown={{ marginLeft : 15}} styleTextDropdownSelected={{ marginLeft : 15}}
                            hideTags
                            submitButtonColor='#ffc301'
                            items={this.state.itemsEmpleados}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelectEmpleado = component }}
                            onSelectedItemsChange={this.onSelectedItemsChangeEmpleados}
                            selectedItems={selectedItemsEmpleados}
                            selectText="Empleados"
                            searchInputPlaceholderText="Buscar..."
                            displayKey="nombre"
                            submitButtonText="Aceptar"
                            
                            />
                      </View>

                      
                      <View>
              {this.multiSelectEmpleado && this.multiSelectEmpleado.getSelectedItemsExt(selectedItemsEmpleados)}
              </View>
              
              <Item>
            <Label>Mapa :</Label>
             <Input editable={false}/>
            <Button transparent  onPress={()=>{
               this.props.navigation.navigate('Mapa' , { onSelect: this.onSelect  });
            }}>
                <Text>
                    Cambiar
                </Text>
            </Button>
               
            </Item>
            { this.state.mapa.latitude && 
                  <Item inlineLabel>
                  <Label>Latitud :</Label>
                  <Input  value={this.state.mapa.latitude.toString()}/>
              </Item>
                }

            { this.state.mapa.longitude && 
                  <Item inlineLabel>
                  <Label>Longitud :</Label>
                  <Input editable={false} value={this.state.mapa.longitude.toString()}/>
              </Item>
                }

<MultiSelect styleTextDropdown={{ marginLeft : 15}} styleTextDropdownSelected={{ marginLeft : 15}}
                            hideTags
                            submitButtonColor='#ffc301'
                            items={this.state.itemsClientes}
                            uniqueKey="idcliente"
                            ref={(component) => { this.multiSelectCliente = component }}
                            onSelectedItemsChange={this.onSelectedItemsChangeCliente}
                            selectedItems={selectedItemsClientes}
                            selectText="Cliente"
                            searchInputPlaceholderText="Buscar..."
                            onChangeInput={ (text)=> console.log(text)}
                            displayKey="nombre"
                            single={true}
                            submitButtonText="Aceptar"
                            />
              <Button style= {tema.agregarCarrito} block onPress={() =>{
                    this.guardar()
                }} >
                  <Text style={tema.colorDefaultLetra}>Guardar</Text>
              </Button>
               </Form>
                </Content>
            </Container>
        );
    }
}

export default Actividad;