import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
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
    let { trainStore, height } = this.props;
    let trainInfo = trainStore.trainInfo
    return (
      <View>
        <View style={[mainStyle.pa15, mainStyle.flex1]}>
          <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.h100, mainStyle.mab15, mainStyle.mat10]}>
            <Text style={[mainStyle.fs15, mainStyle.c333]}>课程详情</Text>
          </View>
          <BxRichText text={trainInfo.detail || ''}></BxRichText>

        </View>
        <View style={[mainStyle.column, mainStyle.bgcfff]}>
          <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
            <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.fs14, mainStyle.c333]}>报名须知</Text>
            </View>
          </View>
          <View style={[mainStyle.patb20, mainStyle.mal15, mainStyle.mar15]}>
            {
              trainInfo.question ?
                trainInfo.question.map((item, i) => (
                  <View style={[mainStyle.row, mainStyle.mab20]}>
                    <Image source={{ uri: 'http://' + item.icon }} style={[styles.quesicon]}></Image>
                    <View style={[mainStyle.column, mainStyle.pal10]}>
                      <Text style={[mainStyle.fs13, mainStyle.c666]}>{item.question}</Text>
                      <View style={[mainStyle.mat15]}>
                        <Text style={[mainStyle.c999, mainStyle.fs13]}>{item.answer}</Text>
                      </View>
                    </View>
                  </View>
                )) : null
            }
          </View>
        </View>
      </View>
    )
  }
}

export default CourseArtInfo

const styles = StyleSheet.create({
  quesicon: {
    width: setSize(32),
    height: setSize(32)
  }
});