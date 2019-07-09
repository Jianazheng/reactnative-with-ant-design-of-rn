
import {IndexTabs} from './tabs';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Forget from '../pages/Login/Forget';
import Password from './../pages/Login/Password';
import UserInfo from './../pages/Mine/UserInfo';
import CourseInfo from './../pages/Course/CourseInfo/CourseInfo';
import CartList from './../pages/Cart/CartList';
import Settlement from './../pages/Order/Settlement';
import Payfail from './../pages/Payment/Payfail';
import PaySuccess from './../pages/Payment/PaySuccess';
import GoodsList from './../pages/Goods/GoodsList';
import MyOrder from '../pages/Order/MyOrder';
import MyCollect from './../pages/Mine/MyCollect';
import RefundReason from './../pages/Order/RefundReason';
import ApplyRefund from './../pages/Order/ApplyRefund';
import CourseList from './../pages/Course/MyCourseList';
import OutlineCourse from './../pages/Course/OutlineCourse';
import OutlineCourseReserve from './../pages/Course/OutlineCourseReserve';
import OnlineCourse from './../pages/Course/OnlineCourse';
import OnlineCourseInfo from './../pages/Course/OnlineCourseInfo';
import MyCertificate from './../pages/Mine/MyCertificate';
import ClassifyList from './../pages/Home/ClassifyList';
import OnlineCourseList from '../pages/Course/OnlineCourseList';
import GoodsInfo from './../pages/Goods/GoodsInfo/GoodsInfo';
import ViewPdf from './../pages/Course/ViewPdf';
import Address from './../pages/Mine/Address';
import AddressOperate from './../pages/Mine/AddressOperate';
import MyLevel from './../pages/Mine/MyLevel';



export const navItem = {
  Login: {screen: Login},
  Register:{screen:Register},
  Forget:{screen:Forget},
  Password:{screen:Password},
  UserInfo:{screen:UserInfo},
  CourseList:{screen:CourseList},
  OutlineCourse:{screen:OutlineCourse},
  OutlineCourseReserve:{screen:OutlineCourseReserve},
  OnlineCourse:{screen:OnlineCourse},
  OnlineCourseInfo:{screen:OnlineCourseInfo},
  CourseInfo:{screen:CourseInfo},
  CartList:{screen:CartList},
  ClassifyList:{screen:ClassifyList},
  Settlement:{screen:Settlement},
  Payfail:{screen:Payfail},
  PaySuccess:{screen:PaySuccess},
  GoodsList:{screen:GoodsList},
  GoodsInfo:{screen:GoodsInfo},
  OnlineCourseList:{screen:OnlineCourseList},
  MyOrder:{screen:MyOrder},
  MyCollect:{screen:MyCollect},
  RefundReason:{screen:RefundReason},
  ApplyRefund:{screen:ApplyRefund},
  MyCertificate:{screen:MyCertificate},
  ViewPdf:{screen:ViewPdf},
  Address:{screen:Address},
  AddressOperate:{screen:AddressOperate},
  MyLevel:{screen:MyLevel},
  Tab: {
    screen: IndexTabs,
    navigationOptions: () => ({
        header: null
    })
  }
}

export const navConfig = {
  initialRouteName: 'Settlement',
  headerMode: 'float',
  navigationOptions:{
    header:null,
  }
}