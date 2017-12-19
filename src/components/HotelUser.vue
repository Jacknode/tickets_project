<template>
  <section id="wrap">
    <h1 class="userClass">商户信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="userSearch">
        <el-form-item>
          <span>商户名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请选择查询方式">
            <el-option label="名称查询" value="0"></el-option>
            <el-option label="全部" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userSearch.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addHotelUser">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="sceneryBussinessInfoList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="景区商户名称:">
              <span>{{ props.row.tbi_SceneryName }}</span>
            </el-form-item>
            <el-form-item label="联系电话号码:">
              <span>{{ props.row.tbi_Phone }}</span>
            </el-form-item>
            <el-form-item label="商家开户银行:">
              <span>{{ props.row.tbi_Bank }}</span>
            </el-form-item>
            <el-form-item label="商家对公银行卡号:">
              <span>{{ props.row.tbi_CardNo }}</span>
            </el-form-item>
            <el-form-item label="所属省市县:">
              <span>{{ props.row.tbi_Provice+"省"+props.row.tbi_Provice+"市"+props.row.tbi_Provice +"县"}}</span>
            </el-form-item>
            <el-form-item label="景区详细地址:">
              <span>{{ props.row.tbi_Address }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.tbi_CreateTime }}</span>
            </el-form-item>
            <el-form-item label="景区简介:">
              <span>{{ props.row.tbi_Introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商户编码"
        prop="tbi_SceneryID">
      </el-table-column>
      <el-table-column
        label="商户名称"
        prop="tbi_SceneryName">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="tbi_Remark">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.tbi_SceneryID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.tbi_SceneryID)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total"
                     style="float:right;" v-show="total">
      </el-pagination>
    </el-col>

    <!--添加商户信息-->
    <el-dialog title="添加商户信息" :visible.sync="addHotelUserDialog">
      <el-form :model="AddHotelUser">
        <el-form-item label="景区商户编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddHotelUser.sceneryID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddHotelUser.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddHotelUser.checkPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="景区名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddHotelUser.sceneryName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddHotelUser.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHotelUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addHotelUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改商户信息-->
    <el-dialog title="修改商户信息" :visible.sync="updateHotelUserDialog">
      <el-form :model="initUpdateHotelUserObj">
        <el-form-item label="景区商户编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="initUpdateHotelUserObj.tbi_SceneryID" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="景区商户名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="initUpdateHotelUserObj.tbi_SceneryName" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="对公银行卡号" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="initUpdateHotelUserObj.tbi_CardNo" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="所属省份" :label-width="formLabelWidth">
          <el-input v-model="initUpdateHotelUserObj.tbi_Provice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属市" :label-width="formLabelWidth">
          <el-input v-model="initUpdateHotelUserObj.tbi_City" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属县" :label-width="formLabelWidth">
          <el-input v-model="initUpdateHotelUserObj.tbi_Contry" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="initUpdateHotelUserObj.tbi_Phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="景区简介" :label-width="formLabelWidth">
          <el-input v-model="initUpdateHotelUserObj.tbi_Introduce" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="initUpdateHotelUserObj.tbi_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateHotelUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateHotelUserSubmit">确 定</el-button>
      </div>
    </el-dialog>


  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: mapGetters([
      'sceneryBussinessInfoList',
      'initUpdateHotelUserObj'
    ]),
    data(){
      return {
        formLabelWidth:'120px',
        isOff:true,
        addHotelUserDialog:false,//添加弹窗
        updateHotelUserDialog:false,//修改弹窗
        value:'',
        total: 0,
        listLoading: false,
        userSearch: {
          name: ''
        },
        //添加参数
        AddHotelUser:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          sceneryID:'',
          password:'',
          sceneryName:'',
          phone:'',
          checkPassword:'',
        },
        //请求参数
        getData: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          isDelete: 0,
          page: 1,
          rows: 5
        }
      }
    },
    methods: {
      initData(num){
        this.getData.page = '' + num;
        this.getData.sceneryName = this.userSearch.name.trim()
        this.listLoading = true;
        this.$store.dispatch('initGetHotelUser', this.getData)
          .then((total) => {
            this.total = total;
            this.listLoading = false;
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
      },
      //搜索
      search(){
        this.initData(1);
      },
      //添加
      addHotelUser(){
        this.addHotelUserDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      handleCurrentChange(num){
        this.initData(num)
      },
      batchRemove(){
      },
      //添加提交
      addHotelUserSubmit(){
        var arrValue = Object.entries(this.AddHotelUser);
        console.log(arrValue)
        for(var i=0;i<arrValue.length;i++){
          if(!arrValue[i][1].trim()){
            this.$message({
              showClose: true,
              message: '输入内容不能为空！',
              type: 'error'
            });
            return;
          }
        }
        if(isNaN(this.AddHotelUser.phone.trim())||isNaN(this.AddHotelUser.sceneryID.trim())){
          this.$message({
            showClose: true,
            message: '电话号码或商户编码必须为数字!',
            type: 'error'
          });
          return;
        }
        if(this.AddHotelUser.password.trim()!==this.AddHotelUser.checkPassword.trim()){
          this.$message({
            showClose: true,
            message: '两次输入密码不一致!',
            type: 'error'
          });
          return;
        }

        delete this.AddHotelUser.checkPassword;
        this.$store.dispatch('addHotelUser',this.AddHotelUser)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.initData(1)
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.addHotelUserDialog = false;
      },
      //修改
      handleEdit(id){
        this.updateHotelUserDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initHotelUser',id)
      },
      //修改提交
      updateHotelUserSubmit(){
        if(this.initUpdateHotelUserObj.tbi_CardNo.trim()==''||this.initUpdateHotelUserObj.tbi_Phone.trim()==''){
          this.$message({
            showClose: true,
            message: '银行卡或者电话号码不能为空!',
            type: 'error'
          });
          return;
        }
        if(isNaN(this.initUpdateHotelUserObj.tbi_CardNo)||isNaN(this.initUpdateHotelUserObj.tbi_Phone)){
          this.$message({
            showClose: true,
            message: '银行卡或者电话号码不是数字!',
            type: 'error'
          });
          return;
        }

        this.$store.dispatch('updateHotelUser',this.initUpdateHotelUserObj)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData(1);
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.updateHotelUserDialog = false;
      },
      //删除
      handleDelete(id){
        this.$store.dispatch('deleteHotelUser',id)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.initData(1);
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }

    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

</style>
