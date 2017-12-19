<template>
  <section id="wrap">
    <h1 class="userClass">票种信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <span>票种名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SceneryTicketAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="sceneryTicketList"
      border
      v-loading="listLoading"
      style="width: 100%;">
      <el-table-column
        label="票种编码"
        prop="stt_Code">
      </el-table-column>
      <el-table-column
        label="票种名称"
        prop="stt_Name">
      </el-table-column>
      <el-table-column
        label="门票类型"
        prop="stt_GateTypeName">
      </el-table-column>
      <el-table-column
        label="票价(元)"
        prop="stt_TicketPrice">
      </el-table-column>
      <el-table-column
        label="折价金额(元)"
        prop="stt_SalePrice">
      </el-table-column>
      <el-table-column
        label="实际价格(元)"
        prop="stt_RealPrice">
      </el-table-column>

      <el-table-column
        label="游玩时间"
        prop="stt_PlayTime">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.stt_Code)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteSceneryTicke(scope.row.stt_Code)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                     style="float:right;" v-show="total">
      </el-pagination>
    </el-col>

    <!--添加票种-->
    <el-dialog title="添加票种" :visible.sync="addSceneryTickeDialog">
      <el-form :model="AddSceneryTicke">
        <el-form-item label="票种名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddSceneryTicke.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="门票类型" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="AddSceneryTicke.gateTypeCode" placeholder="请选择">
            <el-option
              v-for="item in gateTypeListAll"
              :key="item.gt_Code"
              :label="item.gt_Name"
              :value="item.gt_Code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="票种助记码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddSceneryTicke.helpCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="票价" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddSceneryTicke.ticketPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="折价金额" :label-width="formLabelWidth">
          <el-input v-model="AddSceneryTicke.salePrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实际价格" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddSceneryTicke.realPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="游玩日期" :label-width="formLabelWidth" :required="isOff">
          <el-date-picker
            v-model="AddSceneryTicke.playTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" >
          <el-input v-model="AddSceneryTicke.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSceneryTickeDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGateTypeDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改票种-->
    <el-dialog title="修改票种" :visible.sync="updateSceneryTickeDialog">
      <el-form :model="updateSceneryTicketObj">
        <el-form-item label="票种编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateSceneryTicketObj.stt_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="票种名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateSceneryTicketObj.stt_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="门票类型" :label-width="formLabelWidth"  :required="isOff">
          <el-select v-model="updateSceneryTicketObj.stt_GateTypeCode" placeholder="请选择">
            <el-option
              v-for="item in gateTypeListAll"
              :key="item.gt_Code"
              :label="item.gt_Name"
              :value="item.gt_Code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="票种助记码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateSceneryTicketObj.stt_HelpCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="票价" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateSceneryTicketObj.stt_TicketPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="折价金额" :label-width="formLabelWidth">
          <el-input v-model="updateSceneryTicketObj.stt_SalePrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实际价格" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateSceneryTicketObj.stt_RealPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="游玩日期" :label-width="formLabelWidth" :required="isOff">
          <el-date-picker
            v-model="updateSceneryTicketObj.stt_PlayTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="有效天数" :label-width="formLabelWidth" >
          <el-input v-model="updateSceneryTicketObj.stt_ExpireDay" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" >
          <el-input v-model="updateSceneryTicketObj.stt_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSceneryTickeDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSceneryTickeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed:mapGetters([
      'sceneryTicketList',
      'updateSceneryTicketObj',
      'gateTypeListAll'
    ]),
    data(){
      return {
        formLabelWidth:'120px',
        isOff:true,
        total: 0,
        addSceneryTickeDialog:false,//添加弹窗
        updateSceneryTickeDialog:false,//修改弹窗
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
        AddSceneryTicke:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          name:'',
          gateTypeCode:'',
          helpCode:'',
          ticketPrice:0,
          image:'',
          salePrice:0,
          realPrice:0,
          playTime:'',
          remark:''
        }
      }
    },
    methods: {
      initData(num){
        this.getData.page = '' + num;
        this.getData.name = this.filters.name.trim();
        this.listLoading = true;
        this.$store.dispatch('initSceneryTicket',this.getData)
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
      SceneryTicketAdd(){
        this.addSceneryTickeDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addGateTypeDialogSubmit(){
        if(
          this.AddSceneryTicke.name.trim()==''
          ||this.AddSceneryTicke.helpCode.trim()==''
          ||this.AddSceneryTicke.ticketPrice==0
          ||this.AddSceneryTicke.realPrice==0
        ){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        if(isNaN(this.AddSceneryTicke.ticketPrice)
          ||isNaN(this.AddSceneryTicke.realPrice)
          ||isNaN(this.AddSceneryTicke.salePrice)
        ){
          this.$message({
            showClose: true,
            message: '金额必须为数字！',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('addSceneryTicke',this.AddSceneryTicke)
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
        this.addSceneryTickeDialog = false
      },
      handleCurrentChange(num){
        this.initData(num)
      },
      //修改
      handleEdit(id){
        this.$store.commit('setTranstionFalse');
        this.updateSceneryTickeDialog = true;
        this.$store.commit('initUpdateSceneryTicketObj',id)
      },
      //修改提交
      updateSceneryTickeSubmit(){
        this.$store.dispatch('updateSceneryTicket',this.updateSceneryTicketObj)
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
        this.updateSceneryTickeDialog = false;
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
      },
      //删除
      deleteSceneryTicke(id){
        this.$store.dispatch('deleteSceneryTicke',id)
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
