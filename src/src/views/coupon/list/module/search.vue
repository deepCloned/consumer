<template>
  <div class="search">
    <el-row>
      <el-col :span="24">
        <div class="search-content">
          <el-form ref="search" :model="search" inline label-width="100px">
            <div class="line-one">
              <el-form-item label="礼券类型">
                <el-input v-model="search.type" placeholder="请输入礼券类型" style="width: 250px" />
              </el-form-item>
              <el-form-item label="发送时间">
                <el-date-picker
                  v-model="search.startDate"
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                  style="width: 250px"
                />
                <span class="gap">至</span>
                <el-date-picker
                  v-model="search.endDate"
                  type="date"
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  style="width: 250px"
                />
              </el-form-item>
            </div>
            <div class="line-two">
              <el-form-item label="顾客标签">
                <el-input v-model="search.label" placeholder="请输入顾客标签" style="width: 250px" />
              </el-form-item>
              <el-form-item label="发送状态">
                <el-select v-model="search.state" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-left: 270px" @click="handleSearch">搜索</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { DateModel } from '@/utils/date.js'
export default {
  data() {
    return {
      search: {
        type: '',
        startDate: '',
        endDate: '',
        label: '',
        state: '上海'
      }
    }
  },
  created() {
    this.setDefaultDate()
  },
  methods: {
    // 确认搜索
    handleSearch() {
      this.$emit('search', this.search)
    },
    setDefaultDate() {
      const curDate = DateModel.getCurDate()
      this.search.startDate = curDate
      this.search.endDate = curDate
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
</style>
