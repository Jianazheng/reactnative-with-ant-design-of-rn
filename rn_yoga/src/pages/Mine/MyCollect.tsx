import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native';
import { mainStyle, screenH, setSize, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';


interface Props { }
interface State {
  tabs: Array<object>
}

@inject('publicStore')
@observer
class MyCollect extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  TORELOADCOLLECTLIST: object;

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      tabs: [{ title: '培训课程' }, { title: '在线课程' }, { title: '商品' }]
    }
  }

  componentDidMount() {
    let { publicStore } = this.props
    publicStore.getCollectData(1, true)
      .then(res => {

      })
    this.TORELOADCOLLECTLIST = DeviceEventEmitter.addListener('TORELOADCOLLECTLIST', res => {
      publicStore.getCollectData(res + 1, true)
    })
  }

  componentWillUnmount() {
    this.TORELOADCOLLECTLIST.remove()
  }

  render() {
    let { tabs } = this.state
    let { publicStore } = this.props
    let collectData = publicStore.collectData
    return (
      <View style={[mainStyle.column, mainStyle.flex1, mainStyle.bgcf2]}>
        <NavTop
          navType="normal"
          title="我的收藏"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <BxTabView
          height={screenH - setSize(240)}
          currentPageIndex={0}
          canScroll={true}
          tabAlign={'center'}
          tabs={tabs}
          tabChange={(e) => {
            publicStore.getCollectData(e + 1, false)
          }}
        >
          <View style={[mainStyle.patb15]}>
            <BxListView
              listData={toJS(collectData[0].data)}
              nomore={false}
              colNumber={1}
              loading={collectData[0].total == null || collectData[0].total > collectData[0].data.length}
              onLoadmore={() => {
                publicStore.getCollectData(1, false)
              }}
              pab={setSize(20)}
              listItem={({ item, index }) => <CollectItem type="outline" navigation={this.props.navigation} data={item}></CollectItem>}
            ></BxListView>
          </View>
          <View style={[mainStyle.patb15]}>
            <BxListView
              listData={toJS(collectData[1].data)}
              nomore={false}
              colNumber={1}
              loading={collectData[1].total == null || collectData[1].total > collectData[1].data.length}
              onLoadmore={() => {
                publicStore.getCollectData(2, false)
              }}
              listItem={({ item, index }) => <CollectItem type="online" navigation={this.props.navigation} data={item}></CollectItem>}
            ></BxListView>
          </View>
          <View style={[mainStyle.flex1, mainStyle.mab15, { paddingLeft: setSize(10), paddingRight: setSize(10) }]}>
            <BxListView
              listData={toJS(collectData[2].data)}
              nomore={false}
              colNumber={2}
              loading={collectData[2].total == null || collectData[2].total > collectData[2].data.length}
              onLoadmore={() => {
                publicStore.getCollectData(3, false)
              }}
              listItem={({ item, index }) => <CollectItem type="goods" navigation={this.props.navigation} data={item}></CollectItem>}
            ></BxListView>
          </View>
        </BxTabView>
      </View>
    )
  }
}

interface CollectItemState {

}

interface CollectItemProps {
  data: object,
  navigation: any,
  type: 'outline' | 'online' | 'goods'
}

@inject('publicStore')
@observer
class CollectItem extends React.Component<CollectItemState, CollectItemProps>{
  constructor(props: CollectItemProps) {
    super(props)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  handleCancelCollect(data: object, index: number) {
    let { publicStore } = this.props
    publicStore.setCollection(data.common_id, data.type, '')
      .then(res => {
        DeviceEventEmitter.emit('TORELOADCOLLECTLIST', index)
      })
  }

  render() {
    let { type, data } = this.props;
    switch (type) {
      case 'outline':
        return (
          <View style={[mainStyle.row, mainStyle.pa15, mainStyle.bgcfff, mainStyle.brb1f2, mainStyle.aiStart, mainStyle.jcBetween]}>
            <TouchableOpacity
              onPress={() => {
                this.goto('TrainInfo', { id: data.common_id });
              }}
              style={[styles.outline]}>
              <Image
                style={[styles.outlineImg]}
                resizeMode="cover"
                source={{ uri: 'http://' + (data.train ? data.train.image_url ? data.train.image_url.length > 0 ? data.train.image_url[0] : '' : '' : '') }}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mal15]}>
              <TouchableOpacity
                style={[mainStyle.h70, mainStyle.mab10, mainStyle.mat5]}
                onPress={() => {
                  this.goto('TrainInfo', { id: data.common_id });
                }}>
                <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, mainStyle.mab5]} numberOfLines={2}>{data.train.train_name}</Text>
              </TouchableOpacity>
              <Text style={[mainStyle.c999, mainStyle.fs12]}>{data.train.train_start_time}</Text>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
                <View style={[mainStyle.row, mainStyle.aiEnd]}>
                  <Text style={[mainStyle.fs12, mainStyle.c999]}>{data.train.apply_num}人报名</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  this.handleCancelCollect(data, 0)
                }}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, { top: setSize(0) }]}>
                    <Text style={[mainStyle.icon, mainStyle.fs14, mainStyle.czt]}>&#xe65b;</Text>
                    <Text style={[mainStyle.fs11, mainStyle.c333, mainStyle.lh44, mainStyle.mal5]}>取消收藏</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
        break;
      case 'online':
        return (
          <View style={[mainStyle.row, mainStyle.pa15, mainStyle.bgcfff, mainStyle.brb1f2, mainStyle.aiStart, mainStyle.jcBetween]}>
            <TouchableOpacity
              style={[styles.outline]}
              onPress={() => {
                this.goto('CourseInfo', { id: data.common_id });
              }}>
              <Image
                style={[styles.outlineImg]}
                resizeMode="cover"
                source={{ uri: 'http://' + (data.course ? data.course.image_url ? data.course.image_url.length > 0 ? data.course.image_url[0] : '' : '' : '') }}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mal15]}>
              <TouchableOpacity
                style={[mainStyle.h70, mainStyle.mab10, mainStyle.mat5]}
                onPress={() => {
                  this.goto('CourseInfo', { id: data.common_id });
                }}>
                <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, mainStyle.mab5]} numberOfLines={2}>{data.course != undefined ? data.course.course_name : ''}</Text>
              </TouchableOpacity>
              <View style={[mainStyle.row]}>
                <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.bgcf7,
                {
                  borderRadius: setSize(12),
                  paddingLeft: setSize(14),
                  paddingRight: setSize(14),
                  paddingTop: setSize(2),
                  paddingBottom: setSize(2)
                }
                ]}>{data.course != undefined ? data.course.lesson : ''}课时</Text>
              </View>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
                <View style={[mainStyle.row, mainStyle.aiEnd]}>
                  <Text style={[mainStyle.fs14, mainStyle.czt]}>￥{data.course != undefined ? data.course.course_price : ''}</Text>
                  <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.mal15]}>{data.course != undefined ? data.course.reply : ''}人报名</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  this.handleCancelCollect(data, 1)
                }}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, { top: setSize(0) }]}>
                    <Text style={[mainStyle.icon, mainStyle.fs14, mainStyle.czt]}>&#xe65b;</Text>
                    <Text style={[mainStyle.fs11, mainStyle.c333, mainStyle.lh44, mainStyle.mal5]}>取消收藏</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
        break;
      case 'goods':
        return (
          <View style={[mainStyle.column, mainStyle.mat15, mainStyle.bgcfff, styles.goods]}>
            <TouchableOpacity
              onPress={() => {
                this.goto('GoodsInfo', { id: data.common_id });
              }}
              style={[styles.goodsImg]}>
              <Image
                style={[styles.goodsImg]}
                resizeMode="cover"
                source={{ uri: 'http://' + (data.product ? data.product.image_url ? data.product.image_url.length > 0 ? data.product.image_url[0] : '' : '' : '') }}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.pa5_10]}>
              <View style={[mainStyle.h70, mainStyle.mab10, mainStyle.mat5]}>
                <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, mainStyle.mab5]} numberOfLines={2}>{data.product.product_name}</Text>
              </View>
              <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mab5]}>
                <View style={[mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs11, mainStyle.czt, mainStyle.lh44]}>￥</Text>
                  <Text style={[mainStyle.fs14, mainStyle.czt, mainStyle.lh44]}>{data.product.list_price}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  this.handleCancelCollect(data, 2)
                }}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, { top: setSize(0) }]}>
                    <Text style={[mainStyle.icon, mainStyle.fs14, mainStyle.czt]}>&#xe65b;</Text>
                    <Text style={[mainStyle.fs11, mainStyle.c333, mainStyle.lh44, mainStyle.mal5]}>取消收藏</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
        break;
    }
  }
}

let goodsImg = (screenW - setSize(80)) / 2;
let outlineImg = screenW * 0.26;

const styles = StyleSheet.create({
  outline: {
    width: outlineImg,
    borderRadius: setSize(8),
    overflow: 'hidden',
  },
  outlineImg: {
    backgroundColor: mainStyle.bgcf2.backgroundColor,
    width: outlineImg,
    height: outlineImg
  },
  goods: {
    width: goodsImg,
    borderRadius: setSize(8),
    overflow: 'hidden',
    marginLeft: setSize(20)
  },
  goodsImg: {
    backgroundColor: mainStyle.bgcf2.backgroundColor,
    width: goodsImg,
    height: goodsImg
  },
})

export default MyCollect