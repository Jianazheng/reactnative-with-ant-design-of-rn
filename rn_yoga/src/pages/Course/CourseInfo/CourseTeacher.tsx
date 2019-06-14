import React, { PureComponent } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../../public/style/style';
import BxListView from '../../../components/Pubilc/ListView';
import { CourseTeacherItem } from '../../../components/Course/TeacherItem';


interface CourseInfoItemProps {
  data:Array<object>,
}

class CourseTeacher extends React.Component<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View style={[mainStyle.pa30,mainStyle.patb10,mainStyle.flex1]}>
        <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.h100,mainStyle.mat10,mainStyle.mab10]}>
          <Text style={[mainStyle.fs16,mainStyle.c333]}>~ 教师介绍 ~</Text>
        </View>
        <BxListView
        nomore={true}
        colNumber={1}
        listData={data}
        listItem={({item,index})=>(<CourseTeacherItem data={item}></CourseTeacherItem>)}> 
        </BxListView>
      </View>
    )
  }
}

export default CourseTeacher