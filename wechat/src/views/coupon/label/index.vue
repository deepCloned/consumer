<template>
  <div class="app-container">
    <div class="label">
      <el-row type="flex">
        <el-col :span="4">
          <div class="grid-content title">顾客组合标签</div>
        </el-col>
      </el-row>
      <el-row type="flex" style="margin-top: 20px;">
        <el-col :span="24">
          <el-form ref="label" :model="label" :rules="labelRules" inline label-width="106px">
            <el-form-item label="组合标签名称" prop="name">
              <el-input v-model="label.name" placeholder="请输入组合标签名称" style="width: 250px" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" style="margin-top:20px;">
        <el-col :span="4" style="color: #606266; font-size: 14px;font-weight: 700">标签设定区域</el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <div class="label-setting">
            <el-row type="flex" justify="space-between" class="label-header">
              <el-col :span="5" style="color: #5677fc; cursor: pointer">
                <div @click="handleAddLabel">+ 新增基础标签</div>
              </el-col>
              <el-col :span="5" style="color: #606266">标签阙值设定区域</el-col>
            </el-row>
            <!-- 已选标签设定区域 -->
            <el-row>
              <el-col :span="22">
                <div class="table-label">
                  <el-row>
                    <el-col :span="8" style="text-align: center;color: #606266">已选择基础标签</el-col>
                    <el-col :span="8" style="text-align: center;color: #333">标签类型</el-col>
                    <el-col :span="8" style="text-align: center;color: #333">标签阙值</el-col>
                  </el-row>
                  <div class="label-list">
                    <el-row v-for="(label, index) of labelList" :key="label.name">
                      <el-col :span="8">
                        <div class="label-item">
                          <div :class="['select-icon', label.chooseActive ? 'active' : '']" @click="handleSelectLabel(index)">
                            <span :class="['icon-inner', label.chooseActive ? 'active' : '']" />
                          </div>
                          <div class="label-name">{{ label.name }}</div>
                          <div :class="['delete', label.chooseActive ? '' : 'active']" @click="handleDeleteLabel(index)">
                            <svg-icon icon-class="delete" />
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-item center">
                          {{ label.type.name }}
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-item">
                          <!-- 根据标签类型设置不同的选择条件 -->
                          <div v-if="label.type.value === 'number'" class="select-area">
                            <el-select v-model="label.activeOption" placeholder="请选择" style="width: 100px;height: 30px">
                              <el-option
                                v-for="item in label.optionsList"
                                :key="item"
                                :label="item"
                                :value="item"
                              />
                            </el-select>
                            <el-input v-model="label.value" type="number" placeholder="请输入阙值" style="width: 120px;height:30px" />
                          </div>
                          <div v-if="label.type.value === 'more'" class="select-area">
                            <el-select v-model="label.activeOption" placeholder="请选择" style="width: 224px;height: 30px">
                              <el-option
                                v-for="item in label.optionsList"
                                :key="item"
                                :label="item"
                                :value="item"
                              />
                            </el-select>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 所选标签预计人数 -->
            <el-row>
              <el-col :span="24">
                <div class="calculate-count">
                  组合标签预计人数: <span class="count">{{ calculateCount }}</span>人
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="confirm-cancel">
            <el-button type="primary">确认</el-button>
            <el-button type="info" plain>取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="addLabelVisible"
      title="基础标签类型"
      width="60%"
      :before-close="handleAddLabelClose"
    >
      <span class="sub-title">可通过类型筛选标签</span>
      <el-row>
        <el-col :span="24">
          <div class="basic-label">
            <el-row>基础标签类型</el-row>
            <el-row>
              <el-col :span="24">
                <div class="label-search">
                  <el-select v-model="labelType" placeholder="请选择" style="width: 150px;height: 30px">
                    <el-option
                      v-for="item in labelTypeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <el-input
                    v-model="searchLabelName"
                    placeholder="请输入标签名"
                    style="width: 160px;height:30px"
                    @input="handleChangeLabelName"
                  />
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="choose-label">
                  <div v-for="(chooseLabel, index) of chooseLabelList" :key="chooseLabel.name" class="choose-label-item">
                    <div :class="['select-icon', chooseLabel.chooseActive ? 'active' : '']" @click="handleChooseLabel(chooseLabel, index)">
                      <span :class="['icon-inner', chooseLabel.chooseActive ? 'active' : '']" />
                    </div>
                    <div class="label-name">{{ chooseLabel.name }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-pagination
                  layout="prev, pager, next"
                  :total="totalLabelCount"
                />
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="label-operation">
            <el-button type="primary" @click="handleConfirmChooseLabel">确认</el-button>
            <el-button type="info" plain @click="handleAddLabelClose">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Label',
  data() {
    return {
      label: {
        name: ''
      },
      addLabelVisible: false,
      labelRules: {
        name: [
          { required: true, message: '请输入组合标签名称', trigger: 'blur' }
        ]
      },
      labelType: '全部',
      labelTypeList: ['全部', '大数据标签', '店长标签', '叠加标签'],
      searchLabelName: '',
      totalLabelCount: 500,
      chooseLabelList: [
        {
          name: '消费频次30天',
          type: {
            name: '数值型',
            value: 'number'
          },
          activeOption: '大于',
          optionsList: ['大于', '小于', '等于', '大于等于', '小于等于'],
          value: 0,
          chooseActive: false
        },
        {
          name: '消费频次60天',
          type: {
            name: '数值型',
            value: 'number'
          },
          activeOption: '大于',
          optionsList: ['大于', '小于', '等于', '大于等于', '小于等于'],
          value: 0,
          chooseActive: false
        },
        {
          name: '消费场景近60天',
          type: {
            name: '多选类型',
            value: 'more'
          },
          activeOption: '',
          optionsList: ['世通', '世通大屏点餐', '吉时秀送餐外带'],
          chooseActive: false
        },
        {
          name: 'FRM金额',
          type: {
            name: '多选类型',
            value: 'more'
          },
          activeOption: '',
          optionsList: ['高频', '低频', '中频'],
          chooseActive: false
        }
      ],
      labelList: [],
      calculateCount: '1999'
    }
  },
  /**
   * 钩子函数
   */
  created() {
    console.log(this.labelList, this.chooseLabelList)
  },
  methods: {
    /**
     * 选择/取消选择标签
     */
    handleSelectLabel(index) {
      console.log(index)
      const labelList = this.labelList
      labelList[index].chooseActive = !labelList[index].chooseActive
      console.log(labelList)
      this.labelList = labelList
    },
    /**
     * 删除选择标签
     */
    handleDeleteLabel(index) {
      const labelList = this.labelList
      const list = labelList.filter((ele, i) => {
        return i !== index
      })
      this.labelList = list
    },
    handleAddLabelClose() {
      this.addLabelVisible = false
    },
    handleAddLabel() {
      console.log('click')
      this.addLabelVisible = true
    },
    handleConfirmLabelSetting() {
      console.log(this.labelList)
    },
    /**
     * 监听搜索标签名
     */
    handleChangeLabelName(value) {

    },
    handleChooseLabel(label, index) {
      const labelList = this.chooseLabelList
      labelList[index].chooseActive = !labelList[index].chooseActive
    },
    /**
     * 确认标签选择
     */
    handleConfirmChooseLabel() {
      const chooseLabelList = JSON.parse(JSON.stringify(this.chooseLabelList)).filter((ele) => ele.chooseActive === true)
      const labelList = JSON.parse(JSON.stringify(this.labelList))
      for (let i = 0; i < chooseLabelList.length; i++) {
        let index = -1
        for (let j = 0; j < labelList.length; j++) {
          if (chooseLabelList[i].name === labelList[j].name) {
            index = i
          }
        }
        if (index === -1) {
          labelList.push(chooseLabelList[i])
        }
        index = -1
      }
      this.labelList = labelList
      this.handleAddLabelClose()
    }
    /**
     * 选择标签逻辑
     * 点击新增基础标签 => 弹出基础标签列表 => 选择基础标签
     * 点击确认 => 追加到已选择的标签列表中
     * 点击取消 => 什么事也不做
     * 点击标签选择 => 弹出基础标签列表，需要做一个过滤，已经选择的不展示在列表展示中
     * 以此循环
     */
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .label{
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
      font-size: 16px;
      color: #606266;
    }
    /* 标签设置区域 */
    .label-setting{
      margin-top: 10px;
      padding: 10px 20px;
      width: 100%;
      background: #fafafa;
      font-size: 14px;
      border: 1px dashed #dcdcdc;
      border-radius: 2px;
      .label-header{
        padding: 4px 0;
      }
      .table-label{
        margin-top: 10px;
        padding: 10px;
        width: 100%;
        background: #ffffff;
        font-size: 14px;
        border: 1px dashed #e1e1e1;
        border-radius: 2px;
        .label-list{
          margin-top: 10px;
          color: #606266;
          .label-item{
            display: flex;
            align-items: center;
            padding: 4px 0px;
            width: 80%;
            margin-left: 10%;
            &.center{
              justify-content: center;
            }
            .select-icon{
              margin-left: 8px;
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
            .delete{
              margin-left: 10px;
              visibility: hidden;
              cursor: pointer;
              transition: all .2s ease-in-out;
              &.active{
                visibility: visible;
              }
            }
          }
        }
      }
      .calculate-count{
        margin-top: 50px;
        margin-bottom: 10px;
        .count{
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
    /* 确认/取消 */
    .confirm-cancel{
      margin-top: 25px;
      margin-bottom: 8px;
    }
  }
  /* dialog 样式 */
  .sub-title{
    position: absolute;
    top: 24px;
    left: 135px;
  }
  .basic-label{
    padding: 15px;
    width: 100%;
    background: #fafafa;
    font-size: 14px;
    border: 1px dashed #e1e1e1;
    border-radius: 2px;
    .label-search{
      margin-top: 15px;
    }
    .choose-label{
      width: 100%;
      margin-top: 15px;
      margin-bottom: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .choose-label-item{
        box-sizing: border-box;
        width: 33.33%;
        display: flex;
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
  .label-operation{
    margin-top: 15px;
  }
</style>
