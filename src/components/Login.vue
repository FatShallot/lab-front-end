<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <!-- :model绑定了表单与数据 -->
      <!-- :rules将自定义的校验规则与表单进行了绑定 -->
      <!-- ref属性定义了这个表单的实例对象，通过this.$refs.对象名获取 -->
      <el-form ref="loginFormRef" :model="systemUser" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <!-- prop属性将验证规则和表单数据项进行绑定 -->
        <el-form-item prop="username">
          <el-input v-model="systemUser.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="systemUser.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      systemUser: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    reset () {
      // 通过this.$refs.对象名 获取到了表单实例对象，并调用resetFields()方法，清空了表单
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 通过表单实例的validate()方法进行表单数据合法性验证
      // async await这两个关键字一起使用，用于处理异步请求返回的promise对象
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('login', this.systemUser)
        // 如果返回的状态码（响应里的status字段）不是200，Vue就直接抛异常了
        const token = res.headers.authorization

        if (res.data.code !== 2000) {
          return this.$message.error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          // 将token保存在axios中
          this.$http.defaults.headers.common.Authorization = token

          // 跳转到主页
          this.router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 250px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 50px 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
