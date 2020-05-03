<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 请假申请表格 -->
      <el-table :data="leaveApplications" border style="width: 100%;" stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="reason" label="请假原因" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="state" label="请假申请状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="approve(scope.row)">批准</el-button>
            <el-button type="warning" plain size="mini" @click="disapprove(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="驳回申请"
      :visible.sync="isDisapproveLeaveApplicationDialogVisable"
      width="60%"
      @close="handleDisapproveLeaveApplicationDialogClose"
      :close-on-click-modal="false"
    >
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
      <el-form
        :model="form"
        ref="disapproveLeaveApplicationFormRef"
        :rules="rules"
        label-position="top"
      >
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
        <el-form-item label="请假开始时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            readonly
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="请假结束时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            readonly
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input type="textarea" readonly autosize v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="驳回原因" prop="disapprovedReason">
          <el-input
            type="textarea"
            :autosize="{minRows: 5, maxRows: 10}"
            placeholder="请输入内容"
            v-model="form.disapprovedReason"
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
      form: {},
      isDisapproveLeaveApplicationDialogVisable: false,
      rules: {
        disapprovedReason: [
          { required: true, message: '请填写驳回原因', trigger: 'blur' },
          { max: 140, message: '长度不要超过140个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getLeaveApplications()
  },
  methods: {
    // 获取所有待审核的请假申请
    async getLeaveApplications() {
      const response = await this.$request.get('leave_applications/待审核')
      if (response.successful) {
        this.leaveApplications = response.data
      }
    },
    // 请假申请对话框关闭时触发
    handleDisapproveLeaveApplicationDialogClose() {
      this.$refs.disapproveLeaveApplicationFormRef.resetFields()
    },
    // 同意请假
    async approve(leaveApplication) {
      leaveApplication.state = '同意'
      const response = await this.$request.putWithBody(
        'leave_application',
        leaveApplication
      )
      if (response.successful) {
        this.getLeaveApplications()
        this.$message.success('审核成功')
      }
    },
    // 不同意请假
    disapprove(leaveApplication) {
      this.form = leaveApplication
      this.isDisapproveLeaveApplicationDialogVisable = true
    },
    // 提交不同意的原因
    submit() {
      this.$refs.disapproveLeaveApplicationFormRef.validate(async valid => {
        if (valid) {
          this.form.state = '不同意'
          const response = await this.$request.putWithBody(
            'leave_application',
            this.form
          )
          if (response.successful) {
            this.isDisapproveLeaveApplicationDialogVisable = false
            this.getLeaveApplications()
            this.$message.success('审核成功')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 10px;
}
</style>
