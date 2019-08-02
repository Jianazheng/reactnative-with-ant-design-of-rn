import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxTabView from '../../components/ScrollTabs/TabView';


interface Props { }

let imgw = (screenW - setSize(120)) * 0.28;

@inject('publicStore')
@observer
class MyFinish extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      arr: [{}, {}, {}, {}, {}, {}]
    };
  }

  componentDidMount() {
    let { publicStore, navigation } = this.props
    publicStore.getFinish('train')
      .then(res => { })
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  handleLoad(e) {
    let { publicStore } = this.props
    publicStore.getFinish(e == 0 ? 'train' : 'online')
      .then(res => { })
  }

  _renderItem = (data, type) => (
    <TouchableOpacity style={[mainStyle.flex1, mainStyle.bgcfff, mainStyle.pa15]}
      onPress={() => {
        this.goto('OutlineCourse', { id: data.id })
      }}>
      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brr1f2]}>
        <Image
          style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
          mode="widthFix"
          source={{ uri: 'http://' + data.img }}>
        </Image>
        <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1, mainStyle.mal15, { height: imgw }]}>
          <Text style={[mainStyle.fs13, mainStyle.c333]}>{type == 'train' ? data.train_name : data.course_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    let { navigation, publicStore: { myfinish } } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={'我的已完成课程'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <View style={[mainStyle.flex1]}>
          <BxTabView
            height={screenH - setSize(240)}
            tabWidth={screenW - setSize(160)}
            currentPageIndex={0}
            canScroll={true}
            tabs={[{ title: '培训课程' }, { title: '在线课程' }]}
            tabAlign={'center'}
            tabChange={(e) => {
              this.handleLoad(e)
            }}
          >
            <View>
              <BxListView
                pab={setSize(30)}
                pat={setSize(30)}
                nomore={true}
                loading={myfinish['train'].data.length > 0}
                colNumber={1}
                listData={myfinish['train'].data}
                listItem={({ item, index }) => (
                  this._renderItem(item, 'train')
                )}
              ></BxListView>
            </View>
            <View>
              <BxListView
                pab={setSize(30)}
                pat={setSize(30)}
                nomore={true}
                loading={myfinish['online'].data.length > 0}
                colNumber={1}
                listData={myfinish['online'].data}
                listItem={({ item, index }) => (
                  <CourseListItem key={index} data={item} navigation={navigation} type='online'></CourseListItem>
                )}
              ></BxListView>
            </View>
          </BxTabView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default MyFinish