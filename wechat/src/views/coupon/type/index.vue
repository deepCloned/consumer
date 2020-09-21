<template>
  <div class="app-container">
    <div class="coupon-type">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content title">礼券基础信息维护</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="float: right;" @click="handleGoBack">返回</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form ref="info" :model="info" inline label-width="100px" style="margin-top: 20px;">
        <div class="common coupon-name">
          <el-form-item label="名称">
            <el-input v-model="info.name" placeholder="请输入礼券名称" style="width: 200px" />
          </el-form-item>
        </div>
        <div class="common">
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
        </div>
        <div class="common">
          <el-form-item label="有效时间">
            <el-date-picker
              v-model="info.startDate"
              type="date"
              placeholder="开始时间"
              value-format="yyyy-MM-dd"
              style="width: 200px"
            />
            <span class="gap">至</span>
            <el-date-picker
              v-model="info.endDate"
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd"
              style="width: 200px"
            />
          </el-form-item>
        </div>
      </el-form>
      <!-- 企业微信群发消息模板配置 -->
      <el-row style="margin-top: 20px">
        <el-col :span="6">
          <div class="grid-content title">企业微信群发消息模板配置</div>
        </el-col>
      </el-row>
      <!-- 模板配置区域 -->
      <el-row>
        <el-col :span="16">
          <div class="template-config">
            <el-row>
              <el-col :span="18">
                <div class="desc-common theme">
                  <span>标题</span>
                  <el-input v-model="title" placeholder="消息标题" style="width:90%" />
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <div class="desc-common desc">
                  <span>描述</span>
                  <el-input
                    v-model="desc"
                    type="textarea"
                    :rows="6"
                    placeholder="消息描述"
                    style="width: 90%;"
                  />
                  <img class="desc-image" :src="picUrl" alt="描述图片">
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="desc-common upload">
                  <span>图片</span>
                  <el-upload
                    class="avatar-uploader"
                    action="upload_url"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleUploadImage()"
                  >
                    <img v-if="pictureUrl" :src="pictureUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                  <span class="link-url">图片跳转链接</span>
                  <el-input
                    v-model="linkUrl"
                    placeholder="请输入跳转链接"
                    style="width: 240px;"
                  />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="confirm-cancel">
            <el-button type="primary" @click="handleConfirmInfo">确认</el-button>
            <el-button type="info" plain>取消</el-button>
            <!-- <input type="file" @change="handleChange">上传</input> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { DateModel } from '@/utils/date.js'
import { getCreateCoupon } from '@/api/coupon/coupon'
export default {
  name: 'CouponType',
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
        name: '促销券',
        promotion: '00',
        type: '00',
        startDate: '',
        endDate: '',
        status: '00'
      },
      /**
       * 标题、描述、图片链接、消息跳转链接
       */
      title: '',
      desc: '',
      picUrl: 'https://piecework-server-product.oss-cn-hangzhou.aliyuncs.com/93A6F090DFB7D1B89E999B269224B7A5.png',
      linkUrl: 'https://piecework-server-product.oss-cn-hangzhou.aliyuncs.com/93A6F090DFB7D1B89E999B269224B7A5.png',
      pictureUrl: '',
      upload_url: ''
    }
  },
  created() {
    this.setDefaultDate()
  },
  methods: {
    handleChange(e) {
      console.log(e)
    },
    handleGoBack() {
      this.$router.go(-1)
    },
    async handleConfirmInfo() {
      console.log('确认')
      const { info, title, desc, picUrl, linkUrl } = this
      const { name, promotion, type, startDate, endDate } = info
      /**
       * 参数校验
       */
      if (!name) {
        this.$message('请输入优惠券名称')
        return
      }
      if (!startDate) {
        this.$message('请输入礼券有效时间')
        return
      }
      if (!endDate) {
        this.$message('请输入礼券有效时间')
        return
      }
      if (!title) {
        this.$message('请输入消息标题')
        return
      }
      if (!desc) {
        this.$message('请输入消息描述')
        return
      }
      if (!linkUrl) {
        this.$message('请输入消息跳转链接')
        return
      }
      if (!picUrl) {
        this.$message('请上传图片')
        return
      }
      console.log(info)
      const requestData = { ...this.info, title, desc, picUrl, linkUrl }
      const createRes = await getCreateCoupon(requestData)
      this.$message({
        message: '创建成功',
        type: 'success'
      })
      console.log(createRes)
    },
    /**
     * 上传图片方法
     */
    handleUploadImage(e) {
      console.log(e)
    },
    handleAvatarSuccess(e) {
      console.log('success', e)
    },
    beforeAvatarUpload(file) {
      console.log('before upload')
    },
    setDefaultDate() {
      console.log(DateModel)
      const curDate = DateModel.getCurDate()
      this.info.startDate = curDate
      this.info.endDate = curDate
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
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
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
    .template-config{
      padding: 15px;
      background: #FAFAFA;
      margin-top: 10px;
      border-radius: 2px;
      .desc-common{
        margin: 10px 0;
        display: flex;
        &.theme{
          align-items: center;
        }
        span{
          margin-right: 20px;
          font-size: 14px;
          color: #101010;
        }
        &.upload{
          display: flex;
          align-items: center;
          .link-url{
            margin-left: 40px;
          }
        }
      }
      .desc{
        position: relative;
        .desc-image{
          position: absolute;
          top: 17px;
          right: 22px;
          width: 85px;
          height: 85px;
          background: #f8f8f8;
        }
      }
    }
    .confirm-cancel{
      margin-left: 8px;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
</style>

<style>
  .desc .el-textarea__inner{
    padding-right: 150px;
    border: none;
  }
  /* 上传样式 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
  }
  .avatar {
    width: 85px;
    height: 85px;
    display: block;
  }
</style>
