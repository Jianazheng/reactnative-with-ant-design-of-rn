import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { mainStyle, setSize } from '../../public/style/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';

let { width, height } = Dimensions.get('window')
let swh = width / 2 - setSize(20);
let sww = width - setSize(60);

interface Props {
  fullWidth: boolean,
  img: Array<object>,
  navigation: object,
  children: JSX.Element
}

class HomeSwiper extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      current: 0,
      currentTime: 0,
      seekableDuration: 0
    }
  }

  handleTo(index: number) {
    let { img, navigation } = this.props
    let { content, attr_id } = img[index]
    //attr_id:"关联类型ID，type:1-商品，2-培训，3-在线课程，4-资讯，0-自定义链接"
    switch (attr_id) {
      case '1':
        navigation.navigate('GoodsInfo', { id: content })
        break;
      case '2':
        navigation.navigate('TrainInfo', { id: content })
        break;
      case '3':
        navigation.navigate('CourseInfo', { id: content })
        break;
      case '4':
        navigation.navigate('NotiveDetail', { id: content })
        break;
      default:
        navigation.navigate('WebArea', { url: content })
        break;
    }
  }

  getMin(time: number) {
    let CM = Math.ceil(time / 60)
    let CS = Math.ceil(time) % 60
    return (CM > 1 ? '0' + CM : '00') + ':' + (CS > 9 ? CS : '0' + CS)
  }

  handlePlay() {
    //this.refs['Video']
  }

  render() {
    let { fullWidth, img, children } = this.props
    let { current, seekableDuration, currentTime } = this.state
    let ct, st = '--'
    ct = this.getMin(currentTime)
    st = this.getMin(seekableDuration)
    let reg = RegExp(/.mp3|.mp4|.avi|.flv/)
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
                  {
                    reg.test(val)
                      ?
                      <View style={[mainStyle.bgc000, mainStyle.positonre]}>
                        <Video
                          ref="Video"
                          controls
                          style={[{ height: width, width: width }]}
                          source={{ uri: 'http://' + val }}
                          poster={img.length > 1 ? 'http://' + img[1] : ''}
                          repeat={false}
                          resizeMode={'contain'}
                          onProgress={({ currentTime, seekableDuration }) => {
                            this.setState({
                              currentTime, seekableDuration
                            })
                          }}
                        ></Video>
                      </View>
                      :
                      <Image
                        resizeMode="cover"
                        style={[{ height: width, width: width }]}
                        source={{ uri: 'http://' + val }}
                      ></Image>
                  }

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
                // onTouchEnd={() => {
                //   this.handleTo(current)
                // }}
                onIndexChanged={(current) => this.setState({ current })}
              >
                {
                  img.map((val, i) => (
                    <View
                      key={i}
                      style={[styles.swiperItem]}
                    >
                      <TouchableOpacity onPress={() => { this.handleTo(current) }}>
                        <Image
                          resizeMode="cover"
                          style={[{ height: swh, width: sww }]}
                          source={{ uri: 'http://' + val.image_url }}
                        ></Image>
                      </TouchableOpacity>
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
  },
})

export default HomeSwiper