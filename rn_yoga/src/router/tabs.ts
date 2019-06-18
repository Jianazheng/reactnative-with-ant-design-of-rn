import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Home from '../pages/Home/Home';
import Explore from '../pages/Explore/Explore';
import {setSize, mainStyle} from '../public/style/style'
import Mine from './../pages/Mine/Mine';

export const IndexTabs = createBottomTabNavigator(
  {
    
    Home: {
      screen: Home,
    },
    
    Explore: {
      screen: Explore,
    },
    Mine: {
      screen: Mine,
    },
  },
  {
    tabBarOptions: {
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: mainStyle.czt.color,
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#666666',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      showLabel: true,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#999',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 0.7,
      //tab bar的样式
      style: {
        height:setSize(100),
        alignItems:'center',
        backgroundColor: mainStyle.cfff.color,
        paddingBottom: setSize(8),
        borderTopWidth: 0.4,
        paddingTop:setSize(8), 
        borderTopColor:mainStyle.ce2.color,
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize:setSize(22),
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: {height: 0},
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: true,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',
  }
);