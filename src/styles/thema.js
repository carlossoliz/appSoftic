'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

    fondoPrincipal : {
        backgroundColor : '#ffc301'
    },

  colorPrincipal : {
      color :'#ffc301'
  },

    colorDefaultLetra : {
        color : 'white'
    },
    fontCategoriaPrincipal : {
        fontSize : Platform.select({
          ios :  10 ,
          android : 8
        }) ,
        color : 'white'
    },
    headerCategoria: {
      height: Platform.select({
          android: 56,
          ios: 75,
        }),
        backgroundColor : '#ffc301',
    },
    headerCategoriaView: {
      height: Platform.select({
          android: 100,
          ios: 105,
        }),
        backgroundColor : '#ffc301',
    },
    headerCategoriaTitulo:{
      color: 'white',
      fontSize : 20 , 
      marginLeft : 10 ,
      height: Platform.select({
        android: 56,
        default: 44,
      }),
    },
    headerLogin: {
      height: Platform.select({
          android: 56,
          default: 44,
        }),
        backgroundColor : '#ffc301',
    },
    headerBuscador:{
      backgroundColor : '#ffc301',flexDirection : 'column' , height : 120
    },
    tituloBuscador:{
      marginLeft : 20 , marginTop : 7,color : 'white'
    },
    
    carouselCardNext:{
      color: '#ffc301', fontSize: 30, fontWeight: '500'
    },
    agregarCarrito:{
      backgroundColor : '#ffc301' ,marginTop: 20, padding: 10, marginLeft: 35, marginRight: 35,borderRadius :10
    },
    iconosCheck:{
      backgroundColor : '#ffc301', color : 'white',padding: 4, marginLeft: 10, marginRight: 10,borderRadius :5
    },
    splashButton:{
      fontSize : 20 ,color : 'white', backgroundColor: 'transparent',marginTop: 15
    }

});