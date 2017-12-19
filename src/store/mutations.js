/**
 * Created by leibo on 17/11/23.
 */
import getters from './getters'

const state = {
  //加载动画
  loadingShow:false,
  //初始化动画
  transtionActive:{
    isActive:false,
    isMove:false
  },
  //景区商户
  sceneryBussinessInfoList:[],
  //景区商户修改obj
  initUpdateHotelUserObj:{},
  //门票类型
  gateTypeList:[],
  gateTypeListAll:[],
  //门票类型修改obj
  updateGateTypeObj:{},
  //票种
  sceneryTicketList:[],
  //修改票种obj
  updateSceneryTicketObj:{},
  //订单
  sceneryOrderList:[],
  //修改订单obj
  updateScenicOrderObj:{}
};

const mutations = {
  //路由切换清空
  clearAll(state){
    state.sceneryBussinessInfoList = state.sceneryTicketList = state.sceneryOrderList = []
  },
  //loading动画过渡
  showLoading(state){
    state.loadingShow = true
  },
  hideLoading(){
    state.loadingShow = false
  },
  //初始化门票类型
  initGateType(state,data){
    state.gateTypeList = data;
  },
  //初始化动画
  setTranstionFalse(state){
    state.transtionActive = {
      isActive:false,
      isMove:false
    }
  },
  oPTranstionFalse(){
    state.transtionActive = {
      isActive:!state.transtionActive.isActive,
      isMove:!state.transtionActive.isMove
    }
  },
  //初始化商户
  initGetHotelUser(state,data){
    state.sceneryBussinessInfoList = data
  },
  //景区商户修改obj
  initHotelUser(state,id){
    state.initUpdateHotelUserObj = state.sceneryBussinessInfoList.filter(item=>{
      if(item.tbi_SceneryID==id){
        return true;
      }
      return false;
    })[0]
  },
  //删除商户
  deleteHotelUser(state,id){
    state.sceneryBussinessInfoList = state.sceneryBussinessInfoList.filter(item=>{
      if(item.tbi_SceneryID==id){
        return false
      }else{
        return true;
      }
    })
  },
  //修改门票类型obj
  initUpdateGateTypeObj(state,id){
    state.updateGateTypeObj = state.gateTypeList.filter(item=>{
      if(item.gt_Code==id){
        return true
      }
      return false
    })[0]
  },
  //删除门票类型
  deleteGateType(state,id){
    state.gateTypeList = state.gateTypeList.filter(item=>{
      if(item.gt_Code==id){
        return false
      }
      return true
    })
  },
  //所有门票类型
  initGateTypeAll(state,data){
    state.gateTypeListAll = data;
  },
  //票种
  initSceneryTicket(state,data){
    // gt_Code  stt_GateTypeCode
    for(var i=0;i<data.length;i++){
      for(var j=0;j<state.gateTypeListAll.length;j++){
        if(data[i].stt_GateTypeCode==state.gateTypeListAll[j].gt_Code){
          data[i].stt_GateTypeName=state.gateTypeListAll[j].gt_Name;
        }
      }
    }
    state.sceneryTicketList = data;
  },
  //修改票种obj
  initUpdateSceneryTicketObj(state,id){
    state.updateSceneryTicketObj = state.sceneryTicketList.filter(item=>{
      if(item.stt_Code==id){
        return true
      }
      return false
    })[0]
  },
  //删除票种
  deleteSceneryTicke(state,id){
    state.sceneryTicketList = state.sceneryTicketList.filter(item=>{
      if(item.stt_Code==id){
        return false
      }
      return true
    })
  },
  //初始化订单
  initSceneryOrder(state,data){
    state.sceneryOrderList = data;
  },
  //修改订单obj
  initUpdateScenicOrderObj(state,id){
    state.updateScenicOrderObj = state.sceneryOrderList.filter(item=>{
      if(item.so_OrderID==id){
        return true
      }
      return false
    })[0]
  },
  //删除订单
  deleteScenicOrder(state,id){
    state.sceneryOrderList = state.sceneryOrderList.filter(item=>{
      if(item.so_OrderID==id){
        return false
      }
      return true
    })
  },
};

export default {
  getters,
  state,
  mutations
}
