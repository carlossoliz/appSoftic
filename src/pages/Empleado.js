import { Body, Button, Container, Content, Header, Icon, Input, InputGroup, Left, List, ListItem, Title } from 'native-base';
import React , {Component} from 'react';
import StatusB from './Components/StatusB'
import tema from './../styles/thema'
import { Text } from 'react-native';
import url from './Components/Config';
import MultiSelect from 'react-native-multiple-select';
class Empleado extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre :  '',
            ci : undefined ,
            items : [{id : 'Encargado', nombre : 'Encargado'} , {id :'Empleado' , nombre : 'Empleado'}],
            selectedItems : [] ,
        }
    }
    guardar(){
        let parametros = {
          accion : 'insertar' ,
          nombre : this.state.nombre ,
          ci : this.state.ci ,
          rol : this.state.selectedItems.toString()

        }
        fetch(url.service+'empleado', {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/json',},body: JSON.stringify(parametros)}).then((response) => 
        response.json()).then((responseJson) => {
             console.log(responseJson)
        });
    
}

onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
    render(){
        const { selectedItems
        } = this.state;
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
                        <Title style={tema.colorDefaultLetra}>Empleado</Title>
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
                        <Input placeholder="Ci" onChangeText={(value) => this.setState({ci: value})} keyboardType={'numeric'}>{this.state.ci}</Input>
                    </InputGroup>
                    </ListItem>
                        <Icon name="home" style={tema.colorDefaultLetra} />
                        <MultiSelect styleTextDropdown={{ marginLeft : 35}} styleTextDropdownSelected={{ marginLeft : 35}}
                            hideTags
                            submitButtonColor='#ffc301'
                            items={this.state.items}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Rol"
                            searchInputPlaceholderText="Buscar..."
                            onChangeInput={ (text)=> console.log(text)}
                            displayKey="nombre"
                            single={true}
                            submitButtonText="Aceptar"
                            />
                    

                    <Button style= {tema.agregarCarrito} block onPress={ ()=>{
                            this.guardar()
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

export default Empleado;