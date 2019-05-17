import React from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { mainStyle,setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window')
let swh = width/2-setSize(20);
let sww = width-setSize(20);

class HomeSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={[styles.swiperMain]}>
        <Swiper
          width={sww}
          height={swh}
          autoplay
          loop
          paginationStyle={styles.swiperPagination}
          dot={
            <View style={[styles.swiperDot]}></View>
          }
          activeDot={
            <View style={[styles.swiperDotActive]}></View>
          }
        >
          <View style={[styles.swiperItem]}>
            
          </View>
          <View style={[styles.swiperItem]}>
            
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperMain:{
    height:swh,
    width:width,
    backgroundColor:'#e2e2e2',
  },
  swiperItem:{
    backgroundColor:'#e2e2e2',
    width:sww,
    height:swh
  },
  swiperPagination:{
    bottom:setSize(20)
  },
  swiperDot:{
    height:setSize(10),
    width:setSize(30),
    marginLeft:setSize(10),
    marginRight:setSize(10),
    backgroundColor:mainStyle.c999.color
  },
  swiperDotActive:{
    height:setSize(10),
    width:setSize(30),
    backgroundColor:mainStyle.czt.color
  }
})

export default HomeSwiper