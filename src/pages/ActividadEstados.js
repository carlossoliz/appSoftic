import { Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Separator, Spinner, Tab, TabHeading, Tabs, Text, Title, View } from 'native-base';
import React , {Component} from 'react';
import { StatusBar } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import tema from './../styles/thema'
import url from './Components/Config'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'jucumariComprador.db' });
class ActividadEstados extends Component{
    constructor(props){
        super(props);
        this.state = {
            items : [] ,
            load : false ,
            itemsEstado : [] ,
            initialPage: 0, 
            activeTab: 1, 
            descripcionSelect : '',
            estadoSelect : undefined ,
            horaSelect : undefined ,
            selectedItems : [] ,
            itemSelect : undefined ,
            fecha : undefined
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
                this.actividades()
              }
            })
        })
      }
    actividades(){
        let parametros = {
            accion : 'mostrar' ,
             fecha : this.state.fecha
        }
        fetch(url.service+'ruta', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
        response.json()).then((responseJson) => {
             this.setState({items : responseJson})
             console.log(this.state.items)
             this.estado()
        });
    }

    estado(){
        let parametros = {
            accion : 'mostrar' 
        }
        fetch(url.service+'estado', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
        response.json()).then((responseJson) => {
             this.setState({itemsEstado : responseJson})
             this.setState({load : true})
        });
    }

    mostrarItem(item){
       this.setState({itemSelect : item})
       this.setState({descripcionSelect : item.descripcion})
       this.setState({estadoSelect : item.estado})
       this.setState({horaSelect : item.hora})
       this.setState({ activeTab: 1 })
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
      };


    guardar(){ 
        let fecha = new Date();
            let parametros = {
              accion : 'insertar' ,
              idactividad : this.state.itemSelect.idactividad ,
              idestado :this.state.selectedItems.toString() ,
              hora :  new Date( fecha.getTime() - (fecha.getTimezoneOffset()*60*1000)).toISOString().split('T')[1].substring(0,5)
            }
             fetch(url.service+'ActividadEstado', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
            response.json()).then((responseJson) => {
               console.log(responseJson)
            });
    }
    render(){
        const { selectedItems } = this.state;
       if (this.state.load) {
           return(
                    <Container>
                    <Header style={{backgroundColor : '#ffc301'}}>
                        <Left>
                            <Button transparent onPress={()=>{ 
                                this.props.navigation.pop()
                            }}>
                                <Icon name='arrow-back'></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{fontSize : 15}}>Control de Actividades</Title>
                        </Body>
                    </Header>
                    <StatusBar backgroundColor="#ffc301" barStyle="light-content" />
                    <Content>
                    <Tabs tabBarUnderlineStyle={tema.fondoPrincipal}  initialPage={this.state.initialPage} page={this.state.activeTab} style={tema.fondoPrincipal}>
                          
                      <Tab tabStyle={{backgroundColor : 'white'}} activeTabStyle={{backgroundColor : 'white'}} disabled={this.state.tab1} heading={<TabHeading style={{backgroundColor : 'white'}} ><Text style={{color : 'black'}}>Pedidos</Text></TabHeading>} >
                          <List  dataArray={this.state.items}   renderRow={(item) =>
                                <ListItem onPress={()=>{ this.mostrarItem(item)}}>
                                    <Body>
                                        <Text>Actividad: {item.descripcion}</Text>
                                        <Text note  style={{color: item.estado == 'Creado' ? 'red' : item.estado == 'Proceso' ? 'yellow' : item.estado == 'Finalizado' ? 'green' : 'blue', alignSelf: 'flex-start'}}>{item.estado}</Text>
                                        <Text note>{item.hora.substring(0 , 5)}</Text>
                                </Body>
                                
                                </ListItem>

                            } keyExtractor={(item, index) => index.toString()}>
                            </List>
                        </Tab>

                        <Tab  tabStyle={{backgroundColor : 'white'}} activeTabStyle={{backgroundColor : 'white'}} disabled={this.state.tab1} heading={<TabHeading style={{backgroundColor : 'white'}} ><Text style={{color : 'black'}}>Detalle</Text></TabHeading>} >
                            <Content>
                                <Separator bordered>
                                <Text>Actividad</Text>
                                </Separator>
                                <ListItem >
                            
                            <Body>
                                        <Text>Actividad: {this.state.descripcionSelect}</Text>
                                        <Text>Hora : <Text note>{this.state.horaSelect}</Text></Text>
                                        <Text>Estado : <Text note style={{color: this.state.estadoSelect == 'Creado' ? 'red' : this.state.estadoSelect== 'Proceso' ? 'yellow' : this.state.estadoSelect == 'Finalizado' ? 'green' : 'blue', alignSelf: 'flex-start'}}>{this.state.estadoSelect}</Text></Text>
                       
                            </Body>
                            </ListItem>
                            <View>
                      <MultiSelect styleTextDropdown={{ marginLeft : 30}} styleTextDropdownSelected={{ marginLeft : 15}}
                            hideTags
                            submitButtonColor='#ffc301'
                            items={this.state.itemsEstado}
                            uniqueKey="id"
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Estados"
                            searchInputPlaceholderText="Buscar..."
                            onChangeInput={ (text)=> console.log(text)}
                            displayKey="descripcion"
                            submitButtonText="Aceptar"
                            single={true}
                            />
                            </View>

                            <Button style= {tema.agregarCarrito} block onPress={() =>{
                                this.guardar()
                            }} >
                            <Text style={tema.colorDefaultLetra}>Guardar</Text>
                        </Button>
                        </Content>
                       </Tab>
                     </Tabs>
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

export default ActividadEstados;