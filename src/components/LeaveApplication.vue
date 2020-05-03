<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假申请</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" plain @click="showAddLeaveAppllicationDialog">申请请假</el-button>
        </el-form-item>
      </el-form>

      <!-- 请假申请表格 -->
      <!-- 增加height属性自动实现固定表头 -->
      <el-table :data="leaveApplications" border style="width: 100%;" stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="reason" label="请假原因" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="state" label="请假申请状态"></el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="申请请假"
      :visible.sync="isAddLeaveApplicationDialogVisable"
      width="60%"
      @close="handleAddLeaveApplicationDialogClose"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="addLeaveApplicationFormRef" :rules="rules" label-position="top">
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
        <el-form-item label="请假时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="请假原因" prop="reason">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            placeholder="请输入内容"
            v-model="form.reason"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaveApplications: [],
      form: {
        time: [],
        reason: ''
      },
      isAddLeaveApplicationDialogVisable: false,
      rules: {
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        reason: [
          { max: 140, message: '长度不要超过140个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getLeaveApplications()
  },
  methods: {
    // 获取当前用户的所有请假申请
    async getLeaveApplications() {
      const response = await this.$request.get('leave_applications')
      if (response.successful) {
        this.leaveApplications = response.data
      }
    },
    // 显示发起申请对话框
    showAddLeaveAppllicationDialog() {
      this.isAddLeaveApplicationDialogVisable = true
    },
    // 发起请假申请
    submit() {
      this.$refs.addLeaveApplicationFormRef.validate(async valid => {
        if (valid) {
          const response = await this.$request.postWithBody(
            'leave_application',
            {
              startTime: this.form.time[0],
              endTime: this.form.time[1],
              reason: this.form.reason
            }
          )
          if (response.successful) {
            this.isAddLeaveApplicationDialogVisable = false
            this.getLeaveApplications()
            this.$message.success('发起申请成功')
          }
        }
      })
    },
    // 请假申请对话框关闭时触发
    handleAddLeaveApplicationDialogClose() {
      this.$refs.addLeaveApplicationFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 10px;
}
</style>
