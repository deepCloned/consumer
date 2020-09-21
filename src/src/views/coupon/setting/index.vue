<template>
  <div class="app-container">
    <div class="coupon-type">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content title">请根据标签确认相关信息录入</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="set-header">
            <span>礼券信息</span>
            <span @click="handleAddCouponType">+ 新增礼券</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="coupon-name">
            <span class="name">礼券</span>
            <el-select
              v-model="couponName"
              placeholder="请选择礼券"
              filterable
            >
              <el-option label="礼券1" value="礼券1" />
              <el-option label="礼券2" value="礼券2" />
              <el-option label="礼券3" value="礼券3" />
              <el-option label="礼券4" value="礼券4" />
              <el-option label="礼券5" value="礼券5" />
              <el-option label="礼券6" value="礼券6" />
              <el-option label="礼券7" value="礼券7" />
              <el-option label="礼券8" value="礼券8" />
              <el-option label="礼券9" value="礼券9" />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 预览 -->
      <el-row>
        <el-col :span="6">
          <div class="coupon-view">
            <div class="view-content">
              <div class="left" />
              <img class="coupon-img" :src="image" alt="dog">
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 选择标签 -->
      <el-row>
        <el-col :span="7">
          <div class="set-header">
            <span>顾客标签</span>
            <span @click="handleAddLabel">+ 新增组合标签</span>
          </div>
          <div class="label-choose">
            <div class="search-condition">
              <span
                v-for="(search, index) of searchList"
                :key="search.name"
                :class="['item', search.chooseActive ? 'active' : '']"
                @click="handleChooseSearch(search, index)"
              >
                {{ search.name }}
              </span>
              <span class="item">新增标签</span>
            </div>
            <div class="choose-label">
              <div v-for="(label, index) of labelList" :key="label.name" class="choose-label-item">
                <div :class="['select-icon', label.chooseActive ? 'active' : '']" @click="handleChooseLabel(label, index)">
                  <span :class="['icon-inner', label.chooseActive ? 'active' : '']" />
                </div>
                <div class="label-name">{{ label.name }}</div>
                <div class="label-count">{{ label.count }}人</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="additional">
            <span class="name">推送A/B组比例</span>
            <el-input v-model="rate" placeholder="请输入比例" style="width: 150px" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="additional">
            <span class="name">自动推送日期</span>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="推送日期"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="confirm-cancel">
            <el-button type="primary">确认</el-button>
            <el-button type="info" plain>取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponType',
  data() {
    return {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600066505512&di=3a24540e0d818c8b6eba7382cc352f56&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F55%2F22%2F20300000929429130630222900050.jpg',
      couponName: '',
      rate: '80',
      date: '',
      searchList: [
        {
          name: '人数最优',
          chooseActive: false
        },
        {
          name: '回购最多',
          chooseActive: false
        }
      ],
      labelList: [
        {
          name: '白领商圈',
          count: 99,
          chooseActive: false
        },
        {
          name: '白吃免费党',
          count: 199,
          chooseActive: true
        },
        {
          name: '新欢热恋期',
          count: 299,
          chooseActive: false
        },
        {
          name: '薅羊毛',
          count: 399,
          chooseActive: false
        }
      ]
    }
  },
  watch: {
    date(oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    handleChooseLabel(label, index) {
      const labelList = this.labelList
      labelList[index].chooseActive = !labelList[index].chooseActive
      this.labelList = labelList
    },
    handleChooseSearch(search, index) {
      const searchList = this.searchList
      searchList[index].chooseActive = !searchList[index].chooseActive
      this.searchList = searchList
    },
    /**
     * 新增礼券
     */
    handleAddCouponType() {
      this.$router.push({
        path: '/coupon/type'
      })
    },
    /**
     * 新增组合标签
     */
    handleAddLabel() {
      this.$router.push({
        path: '/coupon/label'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .coupon-type{
    width: 100%;
    min-height: 90px;
    border-radius: 6px;
    background: #ffffff;
    padding: 30px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    .title{
      font-size: 14px;
      color: #606266;
    }
    .common{
      .gap{
        color: #606266;
        margin: 0 10px;
      }
    }
    .set-header{
      margin-top: 20px;
      font-size: 14px;
      color: #333333;
      span{
        &:nth-of-type(2){
          margin-left: 20px;
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
    .coupon-name{
      margin-top: 12px;
      font-size: 14px;
      color: #606266;
      .name{
        margin-right: 20px;
      }
    }
    .coupon-view{
      margin-top: 10px;
      background: #fafafa;
      border: 1px dashed #dbdbdb;
      border-radius: 2px;
      padding: 10px;
      .view-content{
        background: #fff;
        border-radius: 2px;
        border: 1px dashed #dbdbdb;
        padding: 10rpx;
        min-height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        .coupon-img{
          width: 90px;
          height: 90px;
        }
      }
    }
    .label-choose{
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
      border: 1px dashed #dbdbdb;
      border-radius: 2px;
      font-size: 14px;
      color: #101010;
      .search-condition{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item{
          padding: 6px 8px;
          border: 1px solid #e7e7e7;
          border-radius: 2px;
          cursor: pointer;
          &.active{
            border-color: #5677fc;
            color: #5677fc;
          }
        }
      }
      .choose-label{
        width: 100%;
        margin-top: 40px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        .choose-label-item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px;
          .select-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1px solid #606266;
            cursor: pointer;
            transition: all .2s ease-in-out;
            &.active{
              border-color: #5677fc;
            }
            .icon-inner{
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: transparent;
              transition: all .2s ease-in-out;
              &.active{
                background: #5677fc;
              }
            }
          }
          .label-name{
            margin-left: 10px;
            color: #333;
          }
        }
      }
    }
    .additional{
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 14px;
      color: #606266;
      .name{
        width: 120px;
        margin-right: 20px;
      }
    }
    .confirm-cancel{
      margin-top: 15px;
    }
  }
</style>
