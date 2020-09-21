<template>
  <div class="app-container">
    <div v-if="true" class="search">
      <el-row>
        <el-col :span="24">
          <div class="search-content">
            <el-form ref="search" :model="search" inline label-width="100px">
              <div class="line-one">
                <el-form-item label="礼券名称">
                  <el-input v-model="info.name" placeholder="请输入礼券名称" style="width: 250px" />
                </el-form-item>
                <el-form-item label="促销类型">
                  <el-select v-model="info.promotion" placeholder="促销类型">
                    <el-option
                      v-for="promotion of promotionList"
                      :key="promotion.value"
                      :label="promotion.text"
                      :value="promotion.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="发送消息类型">
                  <el-select v-model="info.type" placeholder="发送消息类型">
                    <el-option
                      v-for="type of typeList"
                      :key="type.value"
                      :label="type.text"
                      :value="type.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="礼券时间">
                  <el-date-picker
                    v-model="info.startDate"
                    type="date"
                    placeholder="开始时间"
                    value-format="yyyy-MM-dd"
                    style="width: 250px"
                  />
                  <span class="gap">至</span>
                  <el-date-picker
                    v-model="info.endDate"
                    type="date"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    style="width: 250px"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-left: 270px" @click="handleSearch">搜索</el-button>
                </el-form-item>
              </div>
              <div class="line-two">
                <!-- <el-form-item label="顾客标签">
                  <el-input v-model="search.label" placeholder="请输入顾客标签" style="width: 250px" />
                </el-form-item>
                <el-form-item label="发送状态">
                  <el-select v-model="search.state" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item>
                  <el-button type="primary" style="margin-left: 270px" @click="handleSearch">搜索</el-button>
                </el-form-item> -->
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list-wrapper">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content title">礼券类型列表</div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="couponList"
        border
        style="width: 100%;margin-top: 20px;"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="礼券类型"
          width="100"
        />
        <el-table-column
          prop="promotionText"
          label="促销类型"
          width="100"
        />
        <el-table-column
          prop="typeText"
          label="发送类型"
          width="100"
        />
        <el-table-column
          prop="date"
          label="起始日期"
          width="120"
        />
        <el-table-column
          prop="title"
          label="标签"
          width="120"
        />
        <el-table-column
          prop="desc"
          label="描述"
          width="200"
        />
        <el-table-column
          prop="picUrl"
          label="图片url"
          width="200"
        />
        <el-table-column
          prop="linkUrl"
          label="图片跳转链接"
          width="200"
        />
        <el-table-column
          prop="statusText"
          label="有效状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '00'">有效</el-tag>
            <el-tag v-if="scope.row.status === '01'" type="info">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="creater"
          label="创建人"
        />
        <el-table-column
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
          <!-- 点击删除按钮提示框 -->

        </el-table-column>
      </el-table>
      <el-row>
        <el-col>
          <el-pagination
            layout="prev, pager, next"
            :total="totalSize"
            @current-change="handleChangePage"
          />
        </el-col>
      </el-row>
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
import { DateModel } from '@/utils/date.js'
import { queryCouponList, getCouponDelete } from '@/api/coupon/coupon'
export default {
  name: 'TypeList',
  data() {
    return {
      promotionList: [
        {
          value: '00',
          text: '满减'
        },
        {
          value: '01',
          text: '折扣'
        },
        {
          value: '02',
          text: '赠品'
        }
      ],
      typeList: [
        {
          value: '00',
          text: '图片'
        },
        {
          value: '01',
          text: '链接'
        }
      ],
      info: {
        name: '',
        promotion: '',
        type: '',
        startDate: '',
        endDate: ''
      },
      search: {},
      deleteVisible: false,
      deleteNumber: '',
      couponList: [],
      loading: false,
      /**
       * 分页数据
       */
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      // 删除id
      deleteId: ''
    }
  },
  created() {
    this.setDefaultDate()
    this.queryCouponList()
  },
  methods: {
    async queryCouponList() {
      const {
        name,
        promotion,
        type,
        startDate,
        endDate
      } = this.info
      const queryParamMap = {}
      if (name) {
        queryParamMap.name = name
      }
      if (promotion) {
        queryParamMap.promotionList = [promotion]
      }
      if (type) {
        queryParamMap.type = [type]
      }
      if (startDate) {
        queryParamMap.startDate = startDate
      }
      if (endDate) {
        queryParamMap.endDate = endDate
      }
      const requestData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        queryParamMap
      }
      this.loading = true
      const result = await queryCouponList(requestData)
      this.loading = false
      this.couponList = result.content
      this.totalSize = result.totalSize
      console.log(this.couponList)
    },
    handleChangePage(page) {
      this.pageNum = page
      this.queryCouponList()
    },
    /**
     * 设置表头和表格内容居中
     */
    rowStyle() {
      return 'text-align: center'
    },
    headerStyle() {
      return 'text-align: center'
    },
    // 确认搜索
    handleSearch() {
      this.queryCouponList()
    },
    setDefaultDate() {
      const curDate = DateModel.getCurDate()
      this.search.startDate = curDate
      this.search.endDate = curDate
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
      this.deleteId = row.id
      this.deleteVisible = true
    },

    handleCloseDelete() {
      this.deleteVisible = false
    },
    async handleConfirmDelete(id) {
      const data = {
        ids: [this.deleteId]
      }
      const deleteRes = await getCouponDelete(data)
      console.log(deleteRes)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      /**
       * 删除成功之后
       * 重新请求数据
       * 如果当前页码大于1，则让页面减一
       * 否则不变，请求数据
       */
      if (this.pageNum > 1) {
        this.pageNum--
      }
      console.log('重新获取数据')
      this.handleCloseDelete()
      this.queryCouponList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search{
    .search-content{
      width: 100%;
      border-radius: 6px;
      background: #ffffff;
      padding-top: 10px;
      padding-bottom: 10px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      .gap{
        color: #333;
        margin: 0 10px;
      }
    }
  }
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
