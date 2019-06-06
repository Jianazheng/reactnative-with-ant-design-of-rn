import React from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { mainStyle,setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window')
let swh = width/2-setSize(20);
let sww = width-setSize(60);

interface Props {
  fullWidth:boolean
}

class HomeSwiper extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  render(){
    let {fullWidth} = this.props;
    return (
      <View>
        {
          fullWidth?<Swiper
            width={width}
            height={width}
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
            <View style={[styles.swiperItem2]}>
              
            </View>
            <View style={[styles.swiperItem2]}>
              
            </View>
          </Swiper>
          :
          <View style={[styles.swiperMain,mainStyle.aiCenter,mainStyle.jcCenter]}>
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
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperMain:{
    width:sww,
    margin:setSize(30),
    marginTop:setSize(20),
    marginBottom:setSize(20),
    overflow:'hidden',
    backgroundColor:'#fff',
    borderRadius:setSize(14)
  },
  swiperItem:{
    backgroundColor:'#e2e2e2',
    flex:1,
    borderRadius:setSize(14)
  },
  swiperItem2:{
    backgroundColor:'#e2e2e2',
    flex:1,
  },
  swiperPagination:{
    bottom:setSize(20)
  },
  swiperDot:{
    height:setSize(10),
    width:setSize(10),
    marginLeft:setSize(10),
    marginRight:setSize(10),
    borderRadius:setSize(10),
    backgroundColor:mainStyle.c999.color
  },
  swiperDotActive:{
    height:setSize(10),
    width:setSize(10),
    borderRadius:setSize(10),
    backgroundColor:mainStyle.czt.color
  }
})

export default HomeSwiper