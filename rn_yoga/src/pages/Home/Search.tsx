import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, Animated, Easing, Alert, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import NavTop from '../../router/navTop';
import HomeSearchBar from '../../components/Home/SeachBar';
import { observer, inject } from 'mobx-react';


interface Props { }
interface State {

}

@inject('trainStore', 'publicStore')
@observer
class Search extends React.Component<Props, State> {


  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      keyword: '',
      search: false,
    };
  }

  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    let { navigation, trainStore } = this.props;
    let { params } = navigation.state;
    console.log(params);
    // this.setState({ keyword: params.k })
    // trainStore.getSearchList(true);
  }
  componentWillUnmount() {
  }

  handleSearch(keyword: string) {
    let { trainStore } = this.props
    trainStore.setKeyword(keyword, true);
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }


  render() {
    let { keyword, search } = this.state
    let { navigation, trainStore, publicStore: { iosmt } } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7, { marginTop: iosmt }]}>
        <HomeSearchBar
          placeholder={'搜索培训课程'}
          autoFocus={false}
          onChange={(e) => {
            this.setState({ keyword: e })
          }}
          onSubmit={(e) => {
            this.setState({ keyword: e, search: true })
            this.handleSearch(e)
          }}
          leftBtn={(
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <TouchableOpacity
                style={[mainStyle.mal10]}
                onPress={() => {
                  this.handleSearch(keyword)
                }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>搜索</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[mainStyle.mal10]} onPress={() => {
                trainStore.setKeyword('', false);
                this.setState({ keyword: '', search: false });
                navigation.goBack();
              }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>取消</Text>
              </TouchableOpacity>
            </View>
          )}
        ></HomeSearchBar>

        <View style={[mainStyle.flex1]}>
          {search ? <View style={[mainStyle.pa15, mainStyle.bgcfff, mainStyle.fs14]}>
            <Text>共有{trainStore.trainSearch.total}条相关内容</Text>
          </View> : null}
          {
            trainStore.trainSearch.data
              ? <BxListView
                listData={trainStore.trainSearch.data.slice()}
                listItem={({ item, index }) => <GoodsItem navigation={navigation} key={index.toString()} data={item} index={index}></GoodsItem>}
                nomore={false}
                colNumber={1}
                loading={trainStore.trainSearch.total == null || (trainStore.trainSearch.total > trainStore.trainSearch.data.length)}
                onLoadmore={() => {
                  trainStore.getSearchList(false);
                }}
                pab={setSize(20)}
                nomoretxt={' '}
              >
              </BxListView>
              : null
          }
        </View>

      </View >
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

let imgw = setSize(220);

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
        style={[mainStyle.mat10, { overflow: 'hidden' }]}
        onPress={() => {
          navigation.push('TrainInfo', { id: data.id })
        }}>
        <View style={[mainStyle.bgcfff, mainStyle.pa15, mainStyle.row, mainStyle.jcBetween]}>
          <Image
            style={[{ width: imgw, height: imgw }, mainStyle.bgcf2, { borderRadius: setSize(8) }]}
            mode="widthFix"
            source={{ uri: 'http://' + (data.image_url ? data.image_url.length > 0 ? data.image_url[0] : '' : '') }}
          >
          </Image>
          <View style={[mainStyle.column, mainStyle.mal15, mainStyle.flex1, mainStyle.jcBetween]}>
            <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, { height: setSize(84) }]} numberOfLines={2}>{data.train_name}</Text>
            <View style={[mainStyle.row, mainStyle.mat5,]}>
              <Text style={[mainStyle.c999, mainStyle.fs12]}>{data.train_introduction}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.mat5, mainStyle.jcBetween]}>
              <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.lh42]}>报名截止时间：{data.reg_end_time}</Text>
              {/* <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.mal10, mainStyle.lh42]}>{data.reply}人报名</Text> */}
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

export default Search