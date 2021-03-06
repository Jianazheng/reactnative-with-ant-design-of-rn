import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { mainStyle, contentPadding, setSize } from '../../../public/style/style';
import BxListView from '../../../components/Pubilc/ListView';
import { CourseTeacherItem } from '../../../components/Course/TeacherItem';
import { observer, inject } from 'mobx-react';


interface CourseInfoItemProps {

}

class CourseTeacher extends React.Component<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { teacher } = this.props
    return (
      <View style={[mainStyle.pa30, mainStyle.patb10, mainStyle.flex1]}>
        <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.h100, mainStyle.mat10, mainStyle.mab10]}>
          <Text style={[mainStyle.fs15, mainStyle.c333]}>教师介绍</Text>
        </View>
        {
          teacher?
          teacher.map((item, i) => {
              return (<CourseTeacherItem key={i} data={item}></CourseTeacherItem>)
            })
          :null
        }
        {/* <BxListView
          nomore={true}
          colNumber={1}
          listData={teacher}
          listItem={({ item, index }) => (<CourseTeacherItem data={item}></CourseTeacherItem>)}>
        </BxListView> */}
      </View>
    )
  }
}

export default CourseTeacher