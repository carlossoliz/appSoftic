import { Body, Button, Container, Content, Header, Icon, Input, InputGroup, Left, List, ListItem, Title } from 'native-base';
import React , {Component} from 'react';
import StatusB from './Components/StatusB'
import tema from './../styles/thema'
import { Text } from 'react-native';
import url from './Components/Config';
class Cliente extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre :  '',
            telefono : undefined ,
        }
    }


    guardarCliente(){
            let parametros = {
              accion : 'insertar' ,
              nombre : this.state.nombre ,
              telefono : this.state.telefono
            }
            fetch(url.service+'cliente', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
            response.json()).then((responseJson) => {
                 console.log(responseJson)
            });
        
    }
    render(){
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
                        <Title style={tema.colorDefaultLetra}>Cliente</Title>
                    </Body>
                </Header>
                <StatusB />
                <Content>
                <List>
                    <ListItem>
                    <InputGroup>
                        <Icon name="person" style={tema.colorDefaultLetra} />
                        <Input placeholder="Nombre" onChangeText={(value) => this.setState({nombre: value})} >{this.state.nombre}</Input>
                    </InputGroup>
                    </ListItem>

                    <ListItem>
                    <InputGroup>
                        <Icon name="mail" style={tema.colorDefaultLetra} />
                        <Input placeholder="Telefono" onChangeText={(value) => this.setState({telefono: value})} keyboardType={'numeric'}>{this.state.telefono}</Input>
                    </InputGroup>
                    </ListItem>
                    
                    

                    <Button style= {tema.agregarCarrito} block onPress={ ()=>{
                            this.guardarCliente()
                        }} >
                        <Text style={tema.colorDefaultLetra}>
                            Guardar
                        </Text>
                       </Button>
                </List>
                </Content>
            </Container>
        );
    }
}

export default Cliente;