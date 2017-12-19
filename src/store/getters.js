/**
 * Created by leibo on 17/11/23.
 */
export default {
  //加载动画
  loadingShow:(state)=>state.loadingShow,
  //初始化动画
  transtionActive:(state)=>state.transtionActive,
  //商户信息
  sceneryBussinessInfoList:(state)=>state.sceneryBussinessInfoList,
  //商户修改obj
  initUpdateHotelUserObj:state=>state.initUpdateHotelUserObj,
  //门票类型
  gateTypeList:state=>state.gateTypeList,
  //门票修改类型obj
  updateGateTypeObj:state=>state.updateGateTypeObj,
  //票种
  sceneryTicketList:state=>state.sceneryTicketList,
  //所有门票类型
  gateTypeListAll:state=>state.gateTypeListAll,
  //修改票种obj
  updateSceneryTicketObj:state=>state.updateSceneryTicketObj,
  //订单
  sceneryOrderList:state=>state.sceneryOrderList,
  //修改订单obj
  updateScenicOrderObj:state=>state.updateScenicOrderObj,
}
