import React, { PureComponent } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../../public/style/style';
import { CourseApplyNotice } from '../../../components/Course/CourseItem';
import BxListView from '../../../components/Pubilc/ListView';


interface CourseInfoItemProps {
  data:Array<object>,
}

class CourseArtInfo extends React.Component<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View style={[mainStyle.pa15]}>
        <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.h100,mainStyle.mat10]}>
          <Text style={[mainStyle.fs16,mainStyle.c333]}>~ 课程详情 ~</Text>
        </View>
        <View style={[mainStyle.mat10,mainStyle.mab10]}>
          <Text style={[mainStyle.fs16,mainStyle.c333]}>报名须知</Text>
        </View>
        <BxListView
        nomore={true}
        colNumber={1}
        listData={data}
        listItem={({item,index})=>(<CourseApplyNotice data={item}></CourseApplyNotice>)}> 
        </BxListView>
      </View>
    )
  }
}

export default CourseArtInfo