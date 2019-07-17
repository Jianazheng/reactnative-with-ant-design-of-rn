import React from 'react';
import { View, ScrollView, StyleSheet, WebView } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxRichText from '../../components/Pubilc/RichText';


interface Props { }

@inject('publicStore')
@observer
class NotiveDetail extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  componentDidMount() {
    let { navigation, publicStore } = this.props
    let { params } = navigation.state
    publicStore.getNotiveInfo(params.id)
      .then(res => {
        if (res != null) {
          this.setState({
            title: res.title,
            content: res.content
          })
        }
      })
  }

  render() {
    let { title, content } = this.state
    let { navigation } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={title == '' ? '公告详情' : title}
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <BxRichText
          text={content}
        ></BxRichText>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default NotiveDetail