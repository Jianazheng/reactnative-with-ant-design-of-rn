import React from 'react';
import { View, Text } from 'react-native';
import { mainStyle, setSize } from '../../../public/style/style';
import { CourseInfoItem2 } from '../../../components/Course/CourseItem';
import BxListView from '../../../components/Pubilc/ListView';


interface CourseInfoItemProps {

}

class RelatedCourse extends React.Component<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { course, navigation, backid } = this.props;
    return (
      <View style={[mainStyle.pa15]}>
        <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.h100, mainStyle.mat10]}>
          <Text style={[mainStyle.fs15, mainStyle.c333]}>相关课程</Text>
        </View>
        {
          course?
          course.map((item, i) => {
              return (<CourseInfoItem2 key={i} navigation={navigation} data={item} backid={backid}></CourseInfoItem2>)
            })
          :null
        }
        {/* <BxListView
          nomore={true}
          colNumber={1}
          listData={course}
          listItem={({ item, index }) => (<CourseInfoItem2 navigation={navigation} data={item} backid={backid}></CourseInfoItem2>)}>
        </BxListView> */}
      </View>
    )
  }
}

export default RelatedCourse