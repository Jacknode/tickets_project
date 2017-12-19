<template>
  <section id="wrap">
    <h1 class="userClass">门票类型</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <span>类型名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="gateAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="gateTypeList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;">
      <el-table-column
        label="类型编码"
        prop="gt_Code">
      </el-table-column>
      <el-table-column
        label="类型名称"
        prop="gt_Name">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="gt_CreateTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.gt_Code)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.gt_Code)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                     style="float:right;" v-show="total">
      </el-pagination>
    </el-col>

    <!--添加门票类型-->
    <el-dialog title="添加门票类型" :visible.sync="addGateTypeDialog">
      <el-form :model="AddGateType">
        <el-form-item label="类型编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddGateType.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddGateType.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGateTypeDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGateTypeDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改门票类型-->
    <el-dialog title="修改门票类型" :visible.sync="updateGateTypeDialog">
      <el-form :model="updateGateTypeObj">
        <el-form-item label="类型编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateGateTypeObj.gt_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateGateTypeObj.gt_Name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGateTypeDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateGateTypeDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed:mapGetters([
        'gateTypeList',
        'updateGateTypeObj'
    ]),
    data(){
      return {
        formLabelWidth:'120px',
        isOff:true,
        total: 0,
        addGateTypeDialog:false,//添加弹窗
        updateGateTypeDialog:false,//修改弹窗
        listLoading: false,
        filters: {
          name: ''
        },
        //请求参数
        getData:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          name:'',
          isDelete:0,
          page:1,
          rows:5
        },
        //添加参数
        AddGateType:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          code:'',
          name:''
        }
      }
    },
    methods: {
      initData(num){
        this.getData.page = '' + num;
        this.getData.name = this.filters.name.trim();
        this.listLoading = true;
        this.$store.dispatch('initGateType',this.getData)
          .then(total=>{
            this.total = total;
            this.listLoading = false;
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },
      //筛选
      search(){
        this.initData(1)
      },
      //添加
      gateAdd(){
        this.addGateTypeDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addGateTypeDialogSubmit(){
        if(this.AddGateType.code.trim()==''||this.AddGateType.name.trim()==''){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('addGateType',this.AddGateType)
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
        this.addGateTypeDialog = false
      },
      handleCurrentChange(num){
        this.initData(num)
      },
      //修改
      handleEdit(id){
        this.$store.commit('setTranstionFalse');
        this.updateGateTypeDialog = true;
        this.$store.commit('initUpdateGateTypeObj',id)
      },
      //修改提交
      updateGateTypeDialogSubmit(){
        this.$store.dispatch('updateGateType',this.updateGateTypeObj)
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
        this.updateGateTypeDialog = false;
      },
      //删除
      handleDelete(id){
        this.$store.dispatch('deleteGateType',id)
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
    padding-left: 20px;
  }

  .formSearch {
    padding: 20px 0 0 5px;
  }

  .userClass {
    padding: 20px 0 0 5px;
    font-size: 18px;
  }

</style>
