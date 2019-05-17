import { StyleSheet,Dimensions} from 'react-native';
import {setSize,setText,screenH,screenW} from './pixel'
const windows = Dimensions.get('window');

const mainStyle = StyleSheet.create({
    icon:{
        fontFamily:'iconfont',
        fontSize:setSize(32),
    },
    textright:{textAlign:"right"},
    positonre:{position:"relative"},
    width90:{width:setSize(90)},
    width160:{width:setSize(160)},
    width300:{width:setSize(300)},
    mal10:{ marginLeft:setSize(20),},
    mal15:{ marginLeft:setSize(30),},
    mal20:{ marginLeft:setSize(40),},
    mar10:{ marginRight:setSize(20),},
    mat10:{ marginTop:setSize(20),},
    mat15:{ marginTop:setSize(30),},
    mat20:{ marginTop:setSize(40),},
    mat30:{ marginTop:setSize(60),},
    mab5:{ marginBottom:setSize(10),}, 
    mab10:{ marginBottom:setSize(20),}, 
    mab20:{ marginBottom:setSize(40),},
    mab30:{ marginBottom:setSize(60),},
    mab40:{ marginBottom:setSize(80),},
    pa5_10:{paddingTop:setSize(10),paddingBottom:setSize(10),paddingRight:setSize(20),paddingLeft:setSize(20)},
    par10:{paddingRight:setSize(20)},
    pal10:{paddingLeft:setSize(20)},
    pal15:{paddingLeft:setSize(30)},
    palr10:{paddingLeft:setSize(20),paddingRight:setSize(20)},
    palr15:{paddingLeft:setSize(30),paddingRight:setSize(30)},
    palr20:{paddingLeft:setSize(40),paddingRight:setSize(40)},
    patb20:{paddingTop:setSize(40),paddingBottom:setSize(40)},
    patb10:{paddingTop:setSize(20),paddingBottom:setSize(20)},
    pa15:{paddingTop:setSize(30),paddingBottom:setSize(30),paddingLeft:setSize(30),paddingRight:setSize(30)},
    cce2:{color:'#ce2a2a',},
    bgcce2:{backgroundColor:'#ce2a2a',},
    c333:{color:'#333333',},
    c666:{color:'#666666',},
    c999:{color:'#999999',},
    ce2:{color:'#e2e2e2',},
    c597:{color:'#ce2a2a',},
    cfff:{color:'#ffffff',},
    cc0b:{color:'#c0b529',},
    cc2:{color:'#c2c2c2',},
    czt:{color:"rgb(221, 101, 114)"},
    cyellow:{color:'#C59743'},
    cred:{color:'#CE2A2A'},
    bgcc2:{backgroundColor:'#c2c2c2'},
    bgccc:{backgroundColor:'#cccccc'},
    bgc59:{backgroundColor:'#ce2a2a'},
    bgczt:{backgroundColor:"rgb(221, 101, 114)"},
    bgcfff:{backgroundColor:'#FFFFFF',},
    bgcred:{backgroundColor:'#CE2A2A'},
    bgcyellow:{backgroundColor:'#C59743'},
    bgcf2:{backgroundColor:'#f2f2f2',},
    bgcf7:{backgroundColor:'#f7f7f7',},
    bgcjin:{backgroundColor:'#C59743'},
    bgcju:{backgroundColor:'#FF8300'},
    cjin:{color:'#C59743'},
    cju:{color:'#FF8300'},
    fs11:{fontSize:setSize(22),},
    fs12:{fontSize:setSize(26),},
    fs13:{fontSize:setSize(24),},
    fs14:{fontSize:setSize(28),},
    fs15:{fontSize:setSize(30),},
    fs16:{fontSize:setSize(32),},
    fs18:{fontSize:setSize(36),},
    fs24:{fontSize:setSize(48),},
    fs22:{fontSize:setSize(44)},
    fs30:{fontSize:setSize(60)},
    fontbold:{fontWeight:'600',},
    tl:{textAlign:'left',},
    tc:{textAlign:'center',},
    width90m:{
        marginLeft:windows.width*0.05,
        marginRight:windows.width*0.05,
    },
    width90p:{
        paddingLeft:windows.width*0.05,
        paddingRight:windows.width*0.05,
    },
    width80p:{
        paddingLeft:windows.width*0.1,
        paddingRight:windows.width*0.1,
    },
    width80m:{
        marginLeft:windows.width*0.1,
        marginRight:windows.width*0.1,
    },
    icons: {
        width: setSize(48),
        height: setSize(48),
        marginTop:setSize(6)
    },
    h60:{height:setSize(60)},
    h80:{height:setSize(80)},
    h100:{height:setSize(100)},
    h120:{height:setSize(120)},
    h160:{height:setSize(160)},
    h200:{height:setSize(200)},
    h300:{height:setSize(300)},
    h400:{height:setSize(400)},
    imgCover:{resizeMode:'cover'},
    imgContain:{resizeMode:'contain'},
    imgStretch:{resizeMode:'stretch'},
    flex3:{
    flex:3
    },
    flex2:{
    flex:2
    },
    flex1:{
    flex:1
    },
    row:{flexDirection:'row'},
    column:{flexDirection:'column'},
    wrap:{flexWrap:'wrap'},
    aiEnd:{alignItems:'flex-end'},
    aiCenter:{alignItems:'center'},
    jcCenter:{justifyContent:'center'},
    jcAround:{justifyContent:'space-around'},
    jcBetween:{justifyContent:'space-between'},
    brl1e2:{
        borderLeftWidth:setSize(0.6),
        borderColor:'#e2e2e2'
    },
    brr1e2:{
        borderRightWidth:setSize(0.6),
        borderColor:'#e2e2e2'
    },
    brt1e2:{
        borderTopWidth:setSize(0.6),
        borderColor:'#e2e2e2'
    },
    brb1e2:{
        borderBottomWidth:setSize(0.6),
        borderColor:'#e2e2e2',   
    },
    brczt:{borderColor:'#ce2a2a'}
});
export {
    setSize,setText,screenH,screenW,mainStyle
}