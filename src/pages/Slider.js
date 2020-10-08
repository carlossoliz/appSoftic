import React from "react";
import { Text, TouchableOpacity, View ,Image,Dimensions} from "react-native";
import Swiper from "react-native-web-swiper";
const { width, height } = Dimensions.get('window');
export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?tree",
        "https://source.unsplash.com/1024x768/?nature",
        'https://placeimg.com/640/640/beer',
        'https://placeimg.com/640/640/people',
        'https://placeimg.com/640/640/nature',
        'https://i.imgur.com/UYiroysl.jpg'
         // Network image
      ]
    };
  }
    render() {
        return (
              <View style={{flex:1}}>
                  <Swiper
                    horizontal
                    loop
                    timeout={2}
                    from={1}
                    minDistanceForAction={0.1}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '>',
                      nextTitleStyle: { color: 'white', fontSize: 30, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                          <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>
                            {'<'}
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  >
                      {this.state.images.map((item, key) => {
                        return (
                          <View key={key}>
                          <Image source={{uri: item}} style={{height: 300, width}}/>
                          </View>
                        )
                      })}
                  </Swiper>
              </View>
        )
    }
}