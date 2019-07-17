import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { mainStyle, contentPadding, setSize } from '../../public/style/style';
import { CourseApplyNotice } from '../../components/Course/CourseItem';
import BxListView from '../../components/Pubilc/ListView';
import { observer, inject } from 'mobx-react';
import BxRichText from '../../components/Pubilc/RichText';

interface CourseInfoItemProps {

}

@inject('trainStore')
@observer
class CourseArtInfo extends React.Component<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { trainStore } = this.props;
    let trainInfo = trainStore.trainInfo
    return (
      <View style={[mainStyle.pa15]}>
        <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.h100, mainStyle.mat10]}>
          <Text style={[mainStyle.fs15, mainStyle.c333]}>课程详情</Text>
        </View>
        <BxRichText text={trainInfo.detail}></BxRichText>
      </View>
    )
  }
}

export default CourseArtInfo