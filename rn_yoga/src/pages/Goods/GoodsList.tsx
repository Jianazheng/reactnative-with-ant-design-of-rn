import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import NavTop from '../../router/navTop';
import HomeSearchBar from '../../components/Home/SeachBar';
import { observer, inject } from 'mobx-react';


interface Props { }
interface State {

}

@inject('goodsStore')
@observer
class GoodsList extends React.Component<Props, State> {


  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      searchBarTranslate: new Animated.Value(screenW),
      searchBarOpacity: new Animated.Value(0),
      autoFocus: false,
      conditionShow: false,
      sortShow: false,
      type: '',
      cid: ''
    };
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    let { navigation, goodsStore } = this.props;
    let { params } = navigation.state;
    goodsStore.setCate(params.cid, params.product_category_name)
      .then(suc => {
        goodsStore.getGoodsClassify()
          .then(res => {
            goodsStore.getGoodslist(false);
          })
      })

  }

  showSearchBar() {
    let { searchBarTranslate, searchBarOpacity } = this.state;
    Animated.timing(searchBarTranslate, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300
    }).start();
    Animated.timing(searchBarOpacity, {
      toValue: 1,
      easing: Easing.ease,
      duration: 300
    }).start();
  }

  hideSearchBar() {
    let { searchBarTranslate, searchBarOpacity } = this.state;
    Animated.timing(searchBarTranslate, {
      toValue: screenW,
      easing: Easing.ease,
      duration: 300
    }).start();
    Animated.timing(searchBarOpacity, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300
    }).start();
  }

  showCondition() {
    let { conditionShow } = this.state;
    this.setState({
      conditionShow: !conditionShow,
      sortShow: false
    })
  }

  showSort() {
    let { sortShow } = this.state;
    this.setState({
      conditionShow: false,
      sortShow: !sortShow
    })
  }




  render() {
    let { searchBarTranslate, searchBarOpacity, sortShow, conditionShow } = this.state
    let { navigation, goodsStore } = this.props
    let goodslist = goodsStore.goodslist
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>

        <NavTop
          navType="normal"
          title="商城"
          onPress={() => {
            this.props.navigation.goBack();
          }}
          children={(
            <View style={[mainStyle.bgcfff, mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
              <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
                this.showSearchBar();
              }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs22]}>&#xe63f;</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
                navigation.navigate('CartList')
              }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs22]}>&#xe60a;</Text>
              </TouchableOpacity>
            </View>
          )}
        ></NavTop>

        <Animated.View style={[styles.searchBar,
        { transform: [{ translateX: searchBarTranslate }], opacity: searchBarOpacity }
        ]}>
          <HomeSearchBar
            placeholder={'搜索商品'}
            autoFocus={false}
            leftBtn={(
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                <TouchableOpacity style={[mainStyle.mal10]}>
                  <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>搜索</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[mainStyle.mal10]} onPress={() => {
                  this.hideSearchBar();
                }}>
                  <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>取消</Text>
                </TouchableOpacity>
              </View>
            )}
          ></HomeSearchBar>
        </Animated.View>

        <View style={[mainStyle.row, mainStyle.h100, mainStyle.aiCenter, mainStyle.bgcfff, mainStyle.brb1e2]}>
          <TouchableOpacity
            style={[mainStyle.flex1, mainStyle.h100, mainStyle.aiCenter, mainStyle.jcCenter]}
            onPress={() => {
              this.showCondition();
            }}
          >
            <Text style={[conditionShow ? mainStyle.czt : mainStyle.c333, mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>{goodsStore.cate.product_category_name}</Text>
              {
                conditionShow ?
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ed;</Text>
                  :
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ec;</Text>
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[mainStyle.flex1, mainStyle.h100, mainStyle.aiCenter, mainStyle.jcCenter]}
            onPress={() => {
              this.showSort();
            }}
          >
            <Text style={[sortShow ? mainStyle.czt : mainStyle.c333, mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>{goodsStore.sort.str}</Text>
              {
                sortShow ?
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ed;</Text>
                  :
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ec;</Text>
              }
            </Text>
          </TouchableOpacity>
        </View>

        {
          conditionShow ?
            <Animated.View style={[mainStyle.column, styles.seacrhCondition, mainStyle.brb1e2]}>
              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.bgcfff, styles.seacrhConditionMain]}>
                {
                  goodsStore.goodsCondition.map((val, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.seacrhConditionItem, val.checked ? mainStyle.bgczt : mainStyle.bgcfff]}
                      onPress={() => {
                        goodsStore.selectGoodsCondition(i)
                          .then(res => {
                            this.showCondition();
                          })
                      }}
                    >
                      <Text style={[mainStyle.fs12, mainStyle.c666, val.checked ? mainStyle.cfff : mainStyle.c666]}>{val.product_category_name}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <TouchableOpacity
                style={[mainStyle.flex1]}
                onPress={() => {
                  this.showCondition();
                }}
              ></TouchableOpacity>
            </Animated.View>
            : null
        }
        {
          sortShow ?
            <Animated.View style={[mainStyle.column, styles.seacrhCondition, mainStyle.brb1e2]}>
              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.bgcfff, styles.seacrhConditionMain]}>
                {
                  goodsStore.goodsSort.map((val, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.seacrhConditionItem, val.checked ? mainStyle.bgczt : mainStyle.bgcfff]}
                      onPress={() => {
                        goodsStore.selectGoodsSort(i)
                          .then(res => {
                            this.showSort();
                          })
                      }}
                    >
                      <Text style={[mainStyle.fs12, mainStyle.c666, val.checked ? mainStyle.cfff : mainStyle.c666]}>{val.str}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <TouchableOpacity
                style={[mainStyle.flex1]}
                onPress={() => {
                  this.showSort();
                }}
              ></TouchableOpacity>
            </Animated.View>
            : null
        }

        <View style={[mainStyle.flex1]}>
          <BxListView
            listData={goodslist.data.slice()}
            listItem={({ item, index }) => <GoodsItem navigation={navigation} key={index.toString()} data={item} index={index}></GoodsItem>}
            nomore={false}
            colNumber={2}
            loading={goodslist.total == null || goodslist.total > goodslist.data.length}
            onLoadmore={() => {
              goodsStore.getGoodslist(false);
            }}
            pab={setSize(20)}
          >
          </BxListView>
        </View>

      </View>
    )
  }
}

interface GoodsItemProps {
  data: object,
  key: string,
  index: number,
  navigation: any
}
interface GoodsItemState {

}

let imgw = (screenW - setSize(80)) * 0.5;

class GoodsItem extends React.Component<GoodsItemProps, GoodsItemState> {

  constructor(props: GoodsItemProps, state: GoodsItemState) {
    super(props);
    this.state = {

    };
  }

  render() {
    let { navigation, index, data } = this.props;
    return (
      <TouchableOpacity
        style={[mainStyle.mat10, { overflow: 'hidden', borderRadius: setSize(8), marginLeft: index % 2 != 0 ? setSize(20) : setSize(30) }]}
        onPress={() => {
          navigation.push('GoodsInfo', { id: data.id })
        }}>
        <View style={[mainStyle.bgcfff, { width: imgw }]}>
          <Image
            style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
            mode="widthFix"
            source={{ uri: 'http://' + (data.image_url ? data.image_url.length > 0 ? data.image_url[0] : '' : '') }}
          >
          </Image>
          <View style={[mainStyle.column, { padding: setSize(20) }]}>
            <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, { height: setSize(84) }]} numberOfLines={2}>{data.product_name}</Text>
            <View style={[mainStyle.row, mainStyle.mat5]}>
              <Text style={[mainStyle.fs12, mainStyle.czt, mainStyle.lh44]}>￥</Text>
              <Text style={[mainStyle.fs16, mainStyle.czt, mainStyle.lh42]}>{data.list_price}</Text>
              <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.mal10, mainStyle.lh42]}>{data.sales_volume}人购买</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 0,
    right: setSize(20),
    zIndex: 99,
    width: screenW - setSize(120)
  },
  seacrhCondition: {
    position: 'absolute',
    top: setSize(200),
    left: 0,
    zIndex: 99,
    width: screenW,
    height: screenH - setSize(200),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  seacrhConditionMain: {
    paddingLeft: setSize(30),
    paddingRight: setSize(30),
    paddingBottom: setSize(30)
  },
  seacrhConditionItem: {
    height: setSize(60),
    width: (screenW - setSize(60)) / 3,
    marginTop: setSize(30),
    borderRadius: setSize(30)
  },
})

export default GoodsList