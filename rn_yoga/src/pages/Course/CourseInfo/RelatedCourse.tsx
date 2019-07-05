import React, { PureComponent } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../../public/style/style';
import { CourseInfoItem } from '../../../components/Course/CourseItem';
import BxListView from '../../../components/Pubilc/ListView';
import { observer, inject } from 'mobx-react';

interface CourseInfoItemProps {
  
}

@inject('trainStore')
@observer
class RelatedCourse extends React.Component<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {trainStore} = this.props;
    let trainInfo = trainStore.trainInfo 
    return(
      <View style={[mainStyle.pa15]}>
        <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.h100,mainStyle.mat10]}>
          <Text style={[mainStyle.fs16,mainStyle.c333]}>~ 相关课程 ~</Text>
        </View>
        <BxListView
        nomore={true}
        colNumber={1}
        listData={trainInfo.relate_train}
        listItem={({item,index})=>(<CourseInfoItem data={item}></CourseInfoItem>)}> 
        </BxListView>
      </View>
    )
  }
}

export default RelatedCourse