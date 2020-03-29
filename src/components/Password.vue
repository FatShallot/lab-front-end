<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-form :rules="rules" :model="form" ref="formRef">
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="reNewPassword">
          <el-input v-model="form.reNewPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validateNewPasswordSame = (rule, value, callback) => {
      if (this.form.reNewPassword === this.form.newPassword) {
        callback()
      } else {
        callback(new Error('请确保两次输入的新密码一致'))
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        reNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          },
          {
            validator: validateNewPasswordSame,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    reset() {
      // 通过this.$refs.对象名 获取到了表单实例对象，并调用resetFields()方法，清空了表单
      this.$refs.formRef.resetFields()
    },
    // 提交
    submit() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        const response = await this.$request.putWithParam('user/password', {
          oldPassword: this.form.oldPassword,
          newPassword: this.form.newPassword
        })
        if (response.successful) {
          this.$message.success('密码修改成功，请重新登录')
          window.sessionStorage.clear()
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  width: 50%;
}

.el-card {
  margin-top: 10px;
}
</style>
