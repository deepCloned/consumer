<template>
  <div class="app-container">
    <search @search="handleGetData" />
    <div class="list-wrapper">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content title">礼券发放列表</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="float: right;" @click="handleAdd">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        :cell-style="rowStyle"
        :header-cell-style="headerStyle"
        style="width: 100%;margin-top: 20px;"
      >
        <el-table-column
          prop="number"
          label="编号"
        />
        <el-table-column
          prop="label"
          label="顾客标签"
        />
        <el-table-column
          prop="type"
          label="礼券类型"
        />
        <el-table-column
          prop="date"
          label="发送日期"
        />
        <el-table-column
          prop="quantity"
          label="标签用户数"
        />
        <el-table-column
          prop="groupA"
          label="A组"
        />
        <el-table-column
          prop="groupB"
          label="B组"
        />
        <el-table-column
          prop="actualQuantity"
          label="实际发送数"
        />
        <el-table-column
          prop="recoveryQuantity"
          label="回收数量"
        />
        <el-table-column
          prop="state"
          label="发送状态"
        />
        <el-table-column
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="info" size="mini" plain @click="handleView(scope.row)">复用规则</el-button>
          </template>
          <!-- 点击删除按钮提示框 -->

        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="deleteVisible"
        width="30%"
        :before-close="handleCloseDelete"
      >
        <span>确认删除本条数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import search from './module/search.vue'
export default {
  name: 'CouponList',
  components: {
    search
  },
  data() {
    return {
      deleteVisible: false,
      deleteNumber: '',
      tableData: [{
        number: '0000001',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }, {
        number: '0000002',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }, {
        number: '0000003',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }, {
        number: '0000004',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }, {
        number: '0000005',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }, {
        number: '0000006',
        label: '月光光',
        type: '白给',
        date: '2020-08-08',
        quantity: '100',
        groupA: '80',
        groupB: '20',
        actualQuantity: '60',
        recoveryQuantity: '40',
        state: '01'
      }]
    }
  },
  methods: {
    /**
     * 设置表头和表格内容居中
     */
    rowStyle() {
      return 'text-align: center'
    },
    headerStyle() {
      return 'text-align: center'
    },
    handleAdd() {
      this.$router.push('/coupon/setting')
    },
    handleGetData(val) {
      console.log(val)
    },
    /**
     * 对表格执行 编辑 查看 删除 操作
     */
    handleEdit(row) {
      console.log(row)
    },
    handleView(row) {
      console.log(row)
    },
    handleDelete(row) {
      this.deleteNumber = row.number
      this.deleteVisible = true
    },

    handleCloseDelete() {
      this.deleteVisible = false
    },
    handleConfirmDelete() {
      console.log('确认删除')
      const { deleteNumber, tableData } = this
      let data = []
      data = tableData.filter(ele => {
        return ele.number !== deleteNumber
      })
      this.tableData = data
      this.deleteVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .list-wrapper{
    width: 100%;
    min-height: 90px;
    border-radius: 6px;
    background: #ffffff;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    .grid-content{
      &.title{
        font-weight: 600;
      }
    }
  }
</style>
