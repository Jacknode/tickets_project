<template>
    <section id="wrap">
      <h1 class="userClass">订单信息</h1>
      <!--工具条-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" :model="userSearch">
          <el-form-item>
            <span>订单号筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="请选择查询方式">
              <el-option label="订单号查询" value="0"></el-option>
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userSearch.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="addScenicOrder">新增</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-col>
      <el-table
        :data="sceneryOrderList"
        highlight-current-row
        v-loading="listLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单用户名称:">
                <span>{{ props.row.so_UserName }}</span>
              </el-form-item>
              <el-form-item label="景区名称:">
                <span>{{ props.row.so_SceneryName }}</span>
              </el-form-item>
              <el-form-item label="订单虚拟票号:">
                <span>{{ props.row.so_TicketID }}</span>
              </el-form-item>
              <el-form-item label="票价:">
                <span>{{ "¥ " +props.row.so_SellPrice }}</span>
              </el-form-item>
              <el-form-item label="票型名称:">
                <span>{{ props.row.so_TicketTypeID }}</span>
              </el-form-item>
              <el-form-item label="支付状态:">
                <span>{{ props.row.so_PayState==0?"未支付":"已支付"}}</span>
              </el-form-item>
              <el-form-item label="支付方式:">
                <span>{{ props.row.so_PayWay}}</span>
              </el-form-item>
              <el-form-item label="游玩日期:">
                <span>{{ props.row.so_PlayTime}}</span>
              </el-form-item>
              <el-form-item label="取票状态:">
                <span>{{ props.row.so_GetState==0?"未取票":"已取票" }}</span>
              </el-form-item>
              <el-form-item label="票状态:">
                <span>{{ props.row.so_TicketState | getTicketStatus }}</span>
              </el-form-item>
              <el-form-item label="提供票方名称:">
                <span>{{ props.row.so_SellName}}</span>
              </el-form-item>
              <el-form-item label="发起订单时间:">
                <span>{{ props.row.so_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="支付订单时间:">
                <span>{{ props.row.so_PayTime}}</span>
              </el-form-item>
              <el-form-item label="取票时间:">
                <span>{{ props.row.so_GetTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          prop="so_OrderID">
        </el-table-column>
        <el-table-column
          label="订单用户名"
          prop="so_UserName">
        </el-table-column>
        <el-table-column
          label="游玩日期"
          prop="so_PlayTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="ScenicOrderEdit(scope.row.so_OrderID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="ScenicOrderDelete(scope.row.so_OrderID)">删除
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
      <!--修改订单-->
      <el-dialog title="修改订单" :visible.sync="updateScenicOrderDialog">
        <el-form :model="updateScenicOrderObj">
          <el-form-item label="订单编码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateScenicOrderObj.so_OrderID" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="支付状态" :label-width="formLabelWidth"  :required="isOff">
            <el-select v-model="updateScenicOrderObj.so_PayState" placeholder="请选择支付状态">
              <el-option label="未支付" value="0"></el-option>
              <el-option label="已支付" value="1"></el-option>
            </el-select>
            <span style="color: green"><span style="color: #f60">温馨提示:</span>(0:未支付;1:已支付)</span>
          </el-form-item>
          <el-form-item label="取票状态" :label-width="formLabelWidth"  :required="isOff">
            <el-select v-model="updateScenicOrderObj.so_GetState" placeholder="请选择取票状态">
              <el-option label="未取票" value="0"></el-option>
              <el-option label="已取票" value="1"></el-option>
            </el-select>
            <span style="color: green"><span style="color: #f60">温馨提示:</span>(0:未取票;1:已取票)</span>
          </el-form-item>
          <el-form-item label="票状态" :label-width="formLabelWidth"  :required="isOff">
            <el-select v-model="updateScenicOrderObj.so_TicketState" placeholder="请选择票状态">
              <el-option label="无效" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="已退" value="2"></el-option>
              <el-option label="已废" value="3"></el-option>
              <el-option label="已检" value="4"></el-option>
            </el-select>
            <span style="color: green"><span style="color: #f60">温馨提示:</span>(0:无效;1:正常;2:已退;3:已废;4:已检;)</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateScenicOrderDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateScenicOrderSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        formLabelWidth:'120px',
        updateScenicOrderDialog:false,//修改弹窗
        isOff:true,
        total: 0,
        value:'',
        listLoading: false,
        userSearch: {
          name: ''
        },
        //请求参数
        getData: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          orderID:'',
          isDelete:0,
          page: 1,
          rows: 5
        }
      }
    },
    computed: mapGetters([
        'sceneryOrderList',
        'updateScenicOrderObj'
    ]),
    methods: {
      initData(num){
        this.getData.page = '' + num;
        this.getData.orderID = this.userSearch.name.trim();//订单号查询
        this.listLoading = true;
        this.$store.dispatch('initScenicOrder',this.getData)
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
      //添加
      addScenicOrder(){},
      //筛选
      search(){
        this.initData(1)
      },
      //分页
      handleCurrentChange(num){},
      //修改
      ScenicOrderEdit(id){
        this.$store.commit('setTranstionFalse');
        this.updateScenicOrderDialog = true;
        this.$store.commit('initUpdateScenicOrderObj',id)
      },
      //修改提交
      updateScenicOrderSubmit(){
        this.$store.dispatch('updateScenicOrder',this.updateScenicOrderObj)
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
        this.updateScenicOrderDialog = false;
      },
      //删除订单
      ScenicOrderDelete(id){
        this.$store.dispatch('deleteScenicOrder',id)
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
    },
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
