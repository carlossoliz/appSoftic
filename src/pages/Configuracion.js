import React , {Component} from 'react';
import {WebView} from 'react-native-webview';
import { View, Text, Container, Header, Title } from 'native-base';
import {StyleSheet} from 'react-native'
class Configuracion extends Component{
    render(){
        return(
           <Container>
             <Header>
               <Title>
                 Configuracion
               </Title>
             </Header>
             <View style={styles.conatiner}>
              <WebView originWhitelist={['*']} 
                source={{ uri: html }} 
                //ref ={WEBVIEW_REF}
                //automaticallyAdjustContentInsets={false}
                allowUniversalAccessFromFileURLs
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                mixedContentMode="compatibility"
                allowingReadAccessToURL={true}
                allowFileAccess={true}
                ref={true}
              />
            </View>
           </Container>
        );
    }
}
//const html = 'http://dev.jucumari.bo/khipu'
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>js-cloudimage-360-view</title>
    <meta charset="UTF-8" />
    <style>
      .cloudimage-360 .cloudimage-360-prev, .cloudimage-360 .cloudimage-360-next {
        padding: 8px;
        background: rgb(244, 244, 244);
        border: none;
        border-radius: 4px;
      }

      .cloudimage-360 .cloudimage-360-prev:focus, .cloudimage-360 .cloudimage-360-next:focus {
        outline: none;
      }

      .cloudimage-360 .cloudimage-360-prev {
        display: none;
        position: absolute;
        z-index: 100;
        top: calc(50% - 15px);
        left: 20px;
      }

      .cloudimage-360 .cloudimage-360-next {
        display: none;
        position: absolute;
        z-index: 100;
        top: calc(50% - 15px);
        right: 20px;
      }

      .cloudimage-360 .cloudimage-360-prev:before, .cloudimage-360 .cloudimage-360-next:before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        background: 50% 50% / cover no-repeat;
      }

      .cloudimage-360 .cloudimage-360-prev:before {
        background-image: url('https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/assets/img/arrow-left.svg');
      }

      .cloudimage-360 .cloudimage-360-next:before {
        background-image: url('https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/assets/img/arrow-right.svg');
      }

      .cloudimage-360 .cloudimage-360-prev.not-active, .cloudimage-360 .cloudimage-360-next.not-active {
        opacity: 0.4;
        cursor: default;
      }
    </style>
  </head>

  <body>
    <!-- simply iniatialize it with class name "cloudimage-360", server folder path, file name and amount of images -->
    <p>1. Repeat images after last image</p>
    <div
      class="cloudimage-360"
      data-folder="dev.jucumari.bo/empresas/salvatierra/sucursal2/image/16/360/"
      data-filename="{index}.jpg"
      data-amount="36"
      data-magnifier="3"
    >
      <button class="cloudimage-360-prev"></button>
      <button class="cloudimage-360-next"></button>
    </div>

    <!-- Add script tag with CDN link to js-cloudimage-360-view lib after all content in body tag -->
    <script src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.1.0/js-cloudimage-360-view.min.js"></script>
  </body>
</html>

`

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  }
});
export default Configuracion;