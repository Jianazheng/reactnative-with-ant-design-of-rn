import React, { PureComponent } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle, setSize } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import TabSelect from '../../components/Pubilc/TabSelect';
import { observer, inject } from 'mobx-react';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props {
  data: object,
  key: number,
  currentIndex: number,
  tabIndex: number
}
interface State { }

@inject('homeStore')
@observer
class HomeCourse extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      cateId: 0,
      updateView: true
    };
  }

  componentDidUpdate() {
    let { homeStore, data, currentIndex } = this.props;
    let { cateId } = this.state;
    if (cateId == 0) {
      if (data.length < 1) {
        return false
      }
      this.setState({
        cateId: data[0].id
      }, () => {
        homeStore.getTrainItem(data[0].id, currentIndex);
      })
    }
  }

  goto(router: string) {
    this.props.navigation.push(router);
  }

  handleTabChange(e) {
    let { homeStore, currentIndex } = this.props;
    this.setState({
      cateId: e.data.id
    }, () => {
      homeStore.getTrainItem(e.data.id, currentIndex);
    })
  }

  render() {
    let { data, homeStore, navigation, currentIndex } = this.props;
    return (
      <View style={[mainStyle.flex1]}>
        {
          data ?
            data.length > 0
              ? <View style={[mainStyle.patb10, mainStyle.palr15, mainStyle.bgcfff]}>
                <TabSelect tabs={data}
                  handleChange={(e) => {
                    this.handleTabChange(e)
                  }}></TabSelect>
              </View>
              : null
            : null
        }
        <View style={[mainStyle.pa15, mainStyle.bgcf2, mainStyle.flex1]}>
          {
            homeStore.trainItem[currentIndex].trainList.length > 0
              ? <BxListView
                nomore={true}
                listData={homeStore.trainItem[currentIndex].trainList.slice()}
                listItem={({ item, index }) =>
                  (
                    <CourseItem navigation={navigation} data={item} key={index}></CourseItem>
                  )
                }
                colNumber={1}
                loading={false}
              ></BxListView>
              : <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.h200]}>
                <Text style={[mainStyle.fs13, mainStyle.c999]}>~暂无课程~</Text>
              </View>
          }
        </View>
      </View>
    )
  }
}

interface CourseItemProps {
  data: object,
  navigation: object
}

class CourseItem extends PureComponent<CourseItemProps> {
  constructor(props: CourseItemProps) {
    super(props)
  }

  goto(router: string, params: object) {
    this.props.navigation.navigate(router, params);
  }

  render() {
    let { data } = this.props;
    return (
      <View style={[styles.CourseItems, mainStyle.row, mainStyle.jcCenter]}>
        <TouchableOpacity
          style={[mainStyle.column, mainStyle.jcBetween, styles.CourseItemInfo, mainStyle.bgcfff]}
          onPress={() => {
            this.goto('TrainInfo', { id: data.id, type: 'all' })
          }}
        >
          <View style={[mainStyle.flex1]}>
            <View style={[mainStyle.column]}>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiStart, mainStyle.mab5]}>
                <Text style={[mainStyle.c333, mainStyle.fs14]} numberOfLines={2}>{data.train_name}</Text>
                <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs22]}>&#xe64d;</Text>
              </View>
              <Text style={[mainStyle.c999, mainStyle.fs12]} numberOfLines={2}>{data.train_introduction}</Text>
            </View>
          </View>
          <View style={[mainStyle.column, mainStyle.mat10, mainStyle.mab10, mainStyle.flex1]}>
            <Text style={[mainStyle.c666, mainStyle.fs13, mainStyle.mab5]}>原价：<Text style={[mainStyle.fs15]}>￥{data.price}</Text></Text>
            <Text style={[mainStyle.mab5]}>
              <Text style={[mainStyle.c666, mainStyle.fs13]}>6月10日前报名特惠价：</Text>
              <Text style={[mainStyle.czt, mainStyle.fs15]}>{data.price}</Text>
            </Text>
            <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.mab5]}>
              {
                data.dijia != '' && data.dijia != undefined && data.dijia != null
                  ? <Text style={[mainStyle.fs12, mainStyle.bgcaa4, mainStyle.c8d0, styles.lowPrice, mainStyle.fontsilm]}>最低特价可低至：<Text style={[mainStyle.fs13]}>￥{data.dijia}</Text></Text>
                  : null
              }
              {
                data.promotion.length > 0
                  ?
                  <Text style={[mainStyle.fs13, mainStyle.czt]}>查看特惠活动</Text>
                  :
                  null
              }
            </View>
          </View>
          <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs13, mainStyle.c999]}>截止报名日期：{data.reg_end_time}</Text>
            <Text style={[mainStyle.fs13, mainStyle.c999]}>已报名{data.apply_num}人</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}



const contentWidth = width - contentPadding * 2;
const styles = StyleSheet.create({
  CourseItems: {
    width: contentWidth,
    marginBottom: setSize(30),
  },
  CourseItemInfo: {
    width: contentWidth,
    padding: setSize(30)
  },
  lowPrice: {
    borderRadius: setSize(4),
    paddingLeft: setSize(10),
    paddingRight: setSize(10),
    paddingTop: setSize(4),
    paddingBottom: setSize(4),
  }
})

export default HomeCourse