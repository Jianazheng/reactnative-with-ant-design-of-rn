import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { mainStyle, setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window')
let swh = width / 2 - setSize(20);
let sww = width - setSize(60);

interface Props {
  fullWidth: boolean,
  img: Array<object>
}

class HomeSwiper extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let { fullWidth, img } = this.props;
    return (
      <View style={[mainStyle.bgcfff]}>
        {
          fullWidth ? <Swiper
            key={img.length}
            style={{ backgroundColor: mainStyle.bgcf2.backgroundColor }}
            width={width}
            height={width}
            loop
            showsPagination
            autoplayTimeout={3}
            paginationStyle={styles.swiperPagination}
            dot={
              <View style={[styles.swiperDot]}></View>
            }
            activeDot={
              <View style={[styles.swiperDotActive]}></View>
            }
          >
            {
              img.map((val, i) => (
                <View key={i} style={[styles.swiperItem2]}>
                  <Image key={i} resizeMode="cover" style={[{ height: width, width: width }]} source={{ uri: 'http://' + val }}></Image>
                </View>
              ))
            }
          </Swiper>
            :
            <View style={[styles.swiperMain, mainStyle.aiCenter, mainStyle.jcCenter]}>
              <Swiper
                key={img.length}
                autoplay={true}
                style={{ backgroundColor: mainStyle.bgcf2.backgroundColor }}
                width={sww}
                height={swh}
                loop
                showsPagination
                autoplayTimeout={3}
                paginationStyle={styles.swiperPagination}
                dot={
                  <View style={[styles.swiperDot]}></View>
                }
                activeDot={
                  <View style={[styles.swiperDotActive]}></View>
                }
              >
                {
                  img.map((val, i) => (
                    <View key={i} style={[styles.swiperItem]}>
                      <Image resizeMode="cover" key={i} style={[{ height: swh, width: sww }]} source={{ uri: 'http://' + val.image_url }}></Image>
                    </View>
                  ))
                }
              </Swiper>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperMain: {
    width: sww,
    marginLeft: setSize(30),
    marginRight: setSize(30),
    marginTop: 0,
    marginBottom: setSize(20),
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: setSize(14)
  },
  swiperItem: {
    //backgroundColor:'#e2e2e2',
    flex: 1,
    borderRadius: setSize(14)
  },
  swiperItem2: {
    backgroundColor: '#e2e2e2',
    flex: 1,
  },
  swiperPagination: {
    bottom: setSize(20)
  },
  swiperDot: {
    height: setSize(10),
    width: setSize(10),
    marginLeft: setSize(10),
    marginRight: setSize(10),
    borderRadius: setSize(10),
    backgroundColor: mainStyle.c999.color
  },
  swiperDotActive: {
    height: setSize(10),
    width: setSize(10),
    marginLeft: setSize(10),
    marginRight: setSize(10),
    borderRadius: setSize(10),
    backgroundColor: mainStyle.czt.color
  }
})

export default HomeSwiper