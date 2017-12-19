/**
 * Created by leibo on 17/11/23.
 */
import Login from '@/components/Login'  //登录
import Home from '@/components/Home'  //首页
import HotelUser from '@/components/HotelUser'  //商户信息
import GateType from '@/components/GateType'  //门票类型
import SceneryTicket from '../components/SceneryTicket' //票种
import ScenicOrder from '../components/ScenicOrder' //订单详情
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '*',
    hidden: true,
    redirect: { name: 'Login' }
  },
  {
    path : '/home',
    component : Home,
    name : 'Home',
    children:[
      {
        path: 'hotelUser',
        components: {
          default: Home,
          User: HotelUser
        },
        name:'HotelUser'
      },
      {
        path: 'gateType',
        components: {
          default: Home,
          User: GateType
        },
        name:'GateType'
      },
      {
        path: 'sceneryTicket',
        components: {
          default: Home,
          User: SceneryTicket
        },
        name:'SceneryTicket'
      },
      {
        path: 'scenicOrder',
        components: {
          default: Home,
          User: ScenicOrder
        },
        name:'ScenicOrder'
      }
    ]
  }
]
