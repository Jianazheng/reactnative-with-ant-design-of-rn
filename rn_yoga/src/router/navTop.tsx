import React, {Component, Children} from 'react';
import {Platform, StyleSheet, Text, View,TouchableHighlight,TouchableOpacity,StatusBarIOS} from 'react-native';
import { mainStyle,setSize, screenW } from '../public/style/style';


interface Props {
	navType:'normal'|'title'|''|undefined,
	disableColor:string,
	style:any,
	title:string,
	children:any|null,
	onPress:(cb:any)=>void
};
export default class NavTop extends Component<Props> {
    constructor(props:Props) {
			super(props);
			this._onPress = this._onPress.bind(this);
			this._enable = this._enable.bind(this);
			this._disable = this._disable.bind(this);
			this.state = {
					disable: false,
					statusBar:0,
			}
        
    }
    _onPress() {
			if (this.props.onPress) {
				this._disable();
				this.props.onPress(this._enable);
			}
    }
    
    _enable() {
			this.setState({
				disable: false
			});
    };
    
    _disable() {
			this.setState({
				disable: true
			});
		};
		
    _renderTouchableHighlight(children,style,title) {
			return (
				<View style={[styles.navtopMain1,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.bgcfff]}>
					<View style={[styles.leftright,mainStyle.row,mainStyle.aiCenter]}>
						<TouchableHighlight
						underlayColor={'#e2e2e2'}
						onPress={this._onPress}
						style={[styles.navtoplh,mainStyle.aiCenter,mainStyle.row,{opacity:this.state.disable?0.6:0.9}, this.state.disable && {backgroundColor: this.props.disableColor}]}
						disabled={this.state.disable}
						>
							<Text style={[mainStyle.icon,styles.navtopIcon]}>&#xe64c;</Text>
						</TouchableHighlight>
					</View>
					<View style={[mainStyle.flex1,mainStyle.row,mainStyle.aiCenter,mainStyle.bgcfff,mainStyle.jcCenter]}>
						<Text style={[styles.navtopTitle,style]}>{title}</Text>
					</View>
					<View style={[styles.leftright,mainStyle.row,mainStyle.aiCenter]}>
						{children}
					</View>
				</View>
			);
    }
    _renderShowTitle(style,title) {
			return (
				<View style={[styles.navtopMain,mainStyle.jcCenter,mainStyle.bgcfff]}>
					<Text style={[styles.navtopTitle,mainStyle.tc,style]}>{title}</Text>
				</View>
			);
    }
    

    componentWillMount(){
        
    }
    componentDidMount(){
        let _this = this;
        if(Platform.OS=='ios'){
            StatusBarIOS._nativeModule.getHeight((h)=>{
                _this.setState({
                    statusBar:h.height
                })
            });
        }
    }
    render() {
        let {navType,style,title,children} = this.props;
        switch(navType){
            case 'normal':
            return this._renderTouchableHighlight(children,style,title);
            break;
            case 'title':
            return this._renderShowTitle(style,title)
            break;
        }
    }
}

const styles = StyleSheet.create({
	leftright:{
		width:setSize(120)
	},
	container: {
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden'
	},
	navtopMain:{
			width:screenW,
			height:setSize(80),
			flexDirection:'row',
			alignItems: 'center',
			borderColor:'#e2e2e2',
			borderBottomWidth:setSize(1),
			borderStyle:'solid',
	},
	navtopMain1:{
			width:screenW,
			height:setSize(100),
			flexDirection:'row',
			alignItems: 'center',
	},
	navtoplh:{  
			width:setSize(80),
			height:setSize(80),
			borderRadius:setSize(8),
			alignItems: 'center',
			backgroundColor:'#fff',
			marginRight:setSize(30),
			marginLeft:setSize(30),
	},
	navtopIcon:{
			lineHeight:setSize(76),
			fontSize:setSize(80),
			borderRadius:setSize(40),
			textAlign:'center',
			textAlignVertical:'center',
			color:"#333",
	},
	navtopTitle:{
			color:"#333",
			fontSize:setSize(30)
	},
	icon:{
			height:36,
			width:36,
			margin:7
	}
});