/**
 * Created by leibo on 17/11/23.
 */
import {postPromise} from '../assets/js/public'
import axios from 'axios'
export default {
  //首页初始化
  initData({commit},num){
    commit('showLoading');
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetGateTypeList', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "isDelete": "0",
          page: 1,
          rows: num==1?5:30
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          if(num==1){
            commit('initGateType', data.tm_GateTypeList)
          }else{
            commit('initGateTypeAll', data.tm_GateTypeList)
          }
          relove()
        } else {
          reject(data.backResult)
        }
      })

    })
  },

  //初始化商户信息
  initGetHotelUser({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetSceneryBussinessInfoList', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          commit('initGetHotelUser', data.tm_SceneryBussinessInfoList)
          relove(Number(data.total))
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //添加商户
  addHotelUser({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/AddSceneryBussinessInfo', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove(Number(data.total))
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //修改商户
  updateHotelUser({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/UpdateSceneryBussinessInfo', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          sceneryID: data.tbi_SceneryID,
          sceneryName: data.tbi_SceneryName,
          phone: data.tbi_Phone,
          cardNo: data.tbi_CardNo,
          provice: data.tbi_Provice,
          city: data.tbi_City,
          contry: data.tbi_Contry,
          introduce: data.tbi_Introduce,
          remark: data.tbi_Remark,
          isDelete: 0,
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //删除商户
  deleteHotelUser({commit}, id){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/DeleteSceneryBussinessInfo', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          sceneryID: id
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //门票类型
  initGateType({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetGateTypeList', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          commit('initGateType', data.tm_GateTypeList)
          relove(Number(data.total))
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //添加门票类型
  addGateType({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/AddGateType', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove();
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //修改门票类型
  updateGateType({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/UpdateGateType', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          code: data.gt_Code,
          name: data.gt_Name,
          isDelete: 0
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove();
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //删除
  deleteGateType({commit}, id){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/DeleteGateType', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          code: id
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove();
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //查询票种
  initSceneryTicket({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetSceneryTicketTypeList', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          commit('initSceneryTicket', data.tm_SceneryTicketTypeList)
          relove(Number(data.total))
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //添加票种
  addSceneryTicke({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/AddSceneryTicketType', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //修改票种
  updateSceneryTicket({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/UpdateSceneryTicketType', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          code: data.stt_Code,
          name: data.stt_Name,
          gateTypeCode: data.stt_GateTypeCode,
          helpCode: data.stt_HelpCode,
          ticketPrice: data.stt_TicketPrice,
          salePrice: data.stt_SalePrice,
          realPrice: data.stt_RealPrice,
          playTime: data.stt_PlayTime,
          remark: data.stt_Remark,
          expireDay: data.stt_ExpireDay,
          isDelete: 0
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //删除票种
  deleteSceneryTicke({commit}, id){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/DeleteSceneryTicketType', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          code: id
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //初始化订单
  initScenicOrder({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetSceneryOrderList', {
        paramjson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          commit('initSceneryOrder', data.tm_SceneryOrderList)
          relove(Number(data.total))
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //修改订单
  updateScenicOrder({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/UpdateSceneryOrder', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          orderID: data.so_OrderID,
          payState: data.so_PayState,
          getState: data.so_GetState,
          ticketState: data.so_TicketState,
          isDelete: 0
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
  //删除订单
  deleteScenicOrder({commit}, id){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/DeleteSceneryOrder', {
        paramjson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          orderID: id
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      })
    })
  },
}
