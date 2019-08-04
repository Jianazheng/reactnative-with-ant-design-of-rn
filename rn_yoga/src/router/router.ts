
import { IndexTabs } from './tabs';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Info from '../pages/Login/Info';
import Forget from '../pages/Login/Forget';
import Password from './../pages/Login/Password';
import UserInfo from './../pages/Mine/UserInfo';
import TrainInfo from './../pages/Train/TrainInfo';
import CartList from './../pages/Cart/CartList';
import Settlement from './../pages/Settlement/Settlement';
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
import WxPay from './../pages/Payment/WxPay';
import SettlementFail from './../pages/Settlement/SettlementFail';
import WxBind from './../pages/Login/WxBind';
import NotiveDetail from './../pages/Explore/NotiveDetail';
import OrderDetail from './../pages/Order/OrderDetail';
import NotiveList from './../pages/Explore/NotiveList';
import SendBack from './../pages/Order/SendBack';
import CourseInfo from './../pages/Course/CourseInfo/CourseInfo';
import MyFinish from './../pages/Course/MyFinish';
import WebArea from './../pages/Explore/WebArea';
import Search from './../pages/Home/Search';



export const navItem = {
  Login: { screen: Login },
  Register: { screen: Register },
  Info: { screen: Info },
  Forget: { screen: Forget },
  Password: { screen: Password },
  WxBind: { screen: WxBind },
  UserInfo: { screen: UserInfo },
  CourseList: { screen: CourseList },
  OutlineCourse: { screen: OutlineCourse },
  OutlineCourseReserve: { screen: OutlineCourseReserve },
  OnlineCourse: { screen: OnlineCourse },
  OnlineCourseInfo: { screen: OnlineCourseInfo },
  TrainInfo: { screen: TrainInfo },
  CartList: { screen: CartList },
  ClassifyList: { screen: ClassifyList },
  Settlement: { screen: Settlement },
  SettlementFail: { screen: SettlementFail },
  WxPay: { screen: WxPay },
  Payfail: { screen: Payfail },
  PaySuccess: { screen: PaySuccess },
  GoodsList: { screen: GoodsList },
  GoodsInfo: { screen: GoodsInfo },
  OnlineCourseList: { screen: OnlineCourseList },
  MyOrder: { screen: MyOrder },
  OrderDetail: { screen: OrderDetail },
  MyCollect: { screen: MyCollect },
  RefundReason: { screen: RefundReason },
  ApplyRefund: { screen: ApplyRefund },
  CourseInfo: { screen: CourseInfo },
  SendBack: { screen: SendBack },
  MyCertificate: { screen: MyCertificate },
  ViewPdf: { screen: ViewPdf },
  Address: { screen: Address },
  AddressOperate: { screen: AddressOperate },
  MyLevel: { screen: MyLevel },
  NotiveList: { screen: NotiveList },
  NotiveDetail: { screen: NotiveDetail },
  MyFinish: { screen: MyFinish },
  WebArea: { screen: WebArea },
  Search: { screen: Search },
  Tab: {
    screen: IndexTabs,
    navigationOptions: () => ({
      header: null
    })
  }
}

export const navConfig = {
  initialRouteName: 'Tab',
  headerMode: 'float',
  navigationOptions: {
    header: null,
  }
}