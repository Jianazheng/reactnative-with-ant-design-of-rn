import React from 'react';
import { View, Text } from 'react-native';
import { mainStyle, setSize } from '../../../public/style/style';
import { CourseInfoItem } from '../../../components/Course/CourseItem';
import BxListView from '../../../components/Pubilc/ListView';


interface CourseInfoItemProps {

}

class RelatedCourse extends React.Component<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { course } = this.props;
    return (
      <View style={[mainStyle.pa15]}>
        <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.h100, mainStyle.mat10]}>
          <Text style={[mainStyle.fs15, mainStyle.c333]}>相关课程</Text>
        </View>
        <BxListView
          nomore={true}
          colNumber={1}
          listData={course}
          listItem={({ item, index }) => (<CourseInfoItem data={item}></CourseInfoItem>)}>
        </BxListView>
      </View>
    )
  }
}

export default RelatedCourse