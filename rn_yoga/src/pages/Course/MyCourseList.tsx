import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';


interface Props {}

@inject('courseStore')
@observer
class MyCourseList extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{},{},{},{}]
    };
  }

  componentDidMount(){
    let {courseStore} = this.props
    courseStore.getOnlineCourse()
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {navigation,courseStore} = this.props
    let onlineCourse = courseStore.onlineCourse
    console.log(onlineCourse)
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="我的在线课程"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.flex1]}>
          <BxListView
          pab={setSize(30)}
          pat={setSize(30)}
          onLoadmore={()=>{
            courseStore.getOnlineCourse()
          }}
          loading={onlineCourse.total==null||onlineCourse.total>onlineCourse.data.length}
          colNumber={1}
          listData={onlineCourse.data}
          listItem={({item,index})=>(
            <CourseListItem key={index} data={item} navigation={navigation} type='online'></CourseListItem>
          )}
          ></BxListView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default MyCourseList