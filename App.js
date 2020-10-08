import React , {Component }from 'react';
import 'react-native-gesture-handler';
//import { createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import slider from './src/pages/splash';
import Principal from './src/pages/Principal';
import { openDatabase } from 'react-native-sqlite-storage';
import { Spinner } from 'native-base';
import Mapa from './src/pages/Mapa';
import Actividad from './src/pages/Actividad';
import ActividadMapa from './src/pages/ActividadMapa';
import ActividadEstados from './src/pages/ActividadEstados';
import Empleado from './src/pages/Empleado';
import Cliente from './src/pages/Cliente';
import Pert from './src/pages/Pert';
import Config from './src/pages/Config';
var db = openDatabase({ name: 'jucumariComprador.db' });


const Stack = createStackNavigator();


class js extends Component{
    constructor(props){
        super(props);
        this.state = {
          splash : false ,
          navegacion : 'splash'
        };
        this.createDb();
    }
  
    createDb(){
        db.transaction(txn=>{
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='telefono'",[],(tx , res)=>{
               if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS telefono', []);
                tx
                txn.executeSql(`create table if not EXISTS telefono(idtelefono integer PRIMARY KEY AUTOINCREMENT ,
                  splash varchar(2) ,
                  login text ,
                  logueado varchar(2) ,
                  estado varchar(2) ,
                  tipocambio integer ,
                  fecha date 
                );`,[]);
             
                txn.executeSql(`INSERT INTO telefono ( splash , login , logueado , estado,tipocambio) VALUES (?,?,?,?,?)`,['0', '0','0', '1',1]);
              
                this.setState({'splash' : true})
               }else{
                 txn.executeSql("select * from telefono;",[],(tx ,result)=>{
                   if (result.rows.item(0).splash == 1) {
                      if (result.rows.item(0).logueado == 1) {
                        this.setState({navegacion : 'Principal'});
                      }else{
                        this.setState({navegacion : 'login'});
                      }
                   } 
                   this.setState({'splash' : true})
                 })

               }
               
            })
        })
    }

    render(){
      if (this.state.splash) {
        return(
          <NavigationContainer>
          <Stack.Navigator initialRouteName={this.state.navegacion}>
            <Stack.Screen name="slider" component={slider}  options={{ headerShown: false }}/>
            <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }}/>
            <Stack.Screen name="Pert" component={Pert} options={{ headerShown: false }}/>
            <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: false }}/>
            <Stack.Screen name="Actividad" component={Actividad} options={{ headerShown: false }}/>
            <Stack.Screen name="ActividadMapa" component={ActividadMapa} options={{ headerShown: false }}/>
            <Stack.Screen name="ActividadEstados" component={ActividadEstados} options={{ headerShown: false }}/>
            <Stack.Screen name="Empleado" component={Empleado} options={{ headerShown: false }}/>
            <Stack.Screen name="Cliente" component={Cliente} options={{ headerShown: false }}/>
            <Stack.Screen name="Config" component={Config} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
        );
      } else {
        return(<Spinner></Spinner>)
      }
    }
}
export default js;