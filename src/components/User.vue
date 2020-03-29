<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户设置</el-breadcrumb-item>
      <el-breadcrumb-item>所有账户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 查询输入框 -->
      <!-- gutter属性给每个el-col之间设置间隔 -->
      <el-row :gutter="20">
        <!-- 查询信息 -->
        <el-col :span="8">
          <el-input
            v-model="queryInfo.realName"
            clearable
            @clear="getUsers"
            placeholder="姓名"
          >
            <!-- slot="append"应该是表示将按钮跟输入框结合在一起，是固定写法 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsers"
              placeholder="请输入内容"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" plain @click="showAddUserDialog">
            添加用户
          </el-button>
        </el-col>
      </el-row>

      <!-- 用户表格 -->
      <!-- 增加height属性自动实现固定表头 -->
      <el-table :data="users" border style="width: 100%" stripe height="380">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="realName" label="姓名"> </el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="showChangeRoleDialog(scope.row)"
            >
              更改角色
            </el-button>
            <el-button
              size="mini"
              type="warning"
              plain
              @click="resetPassword(scope.row.username)"
              >重置密码</el-button
            >
            <el-button
              size="mini"
              type="warning"
              plain
              @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改用户角色的对话框 -->
    <el-dialog
      title="修改用户角色"
      :visible.sync="isChangeRoleDialogVisable"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="changeRoleForm" :label-width="formLabelWidth">
        <el-form-item label="姓名">
          <!-- 加了style之后，form里的input和select宽度就一致了 -->
          <el-input
            v-model="changeRoleForm.realName"
            disabled
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <!-- 表示选中的值 -->
          <el-select
            v-model="changeRoleForm.role"
            placeholder="请选择用户角色"
            style="width:100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isChangeRoleDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="changeRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="isAddUserDialogVisiable"
      width="40%"
      @close="handleAddUserDialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addUserForm"
        :rules="addUserFormRules"
        :label-width="formLabelWidth"
        ref="addUserFormRef"
      >
        <el-form-item label="账号" prop="username">
          <!-- 加了style之后，form里的input和select宽度就一致了 -->
          <el-input
            v-model="addUserForm.username"
            style="width:100%"
            oninput="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <!-- 加了style之后，form里的input和select宽度就一致了 -->
          <el-input
            v-model="addUserForm.realName"
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <!-- 表示选中的值 -->
          <el-select
            v-model="addUserForm.role"
            placeholder="请选择用户角色"
            style="width:100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddUserDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      queryInfo: {
        realName: '',
        // 当前页码
        pageNum: 1,
        // 每页数据条数
        pageSize: 5
      },
      // 数据总条数
      total: 0,
      // 角色列表
      roles: [],
      // 控制对话框是否显示
      isChangeRoleDialogVisable: false,
      // 改变用户角色时需要的信息
      changeRoleForm: {
        username: '',
        realName: '',
        role: ''
      },
      // form里各元素标签的宽度
      formLabelWidth: '20%',
      // 添加用户对话框是否显示
      isAddUserDialogVisiable: false,
      // 添加的用户信息
      addUserForm: {
        username: '',
        realName: '',
        role: ''
      },
      // 添加用户对话框表单的校验规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 13, message: '长度在 3 到 13 个字符', trigger: 'blur' }
        ],
        realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    async getUsers() {
      const reponse = await this.$request.get('users', this.queryInfo)
      if (reponse.successful) {
        // 后台使用了分页插件，所以数据封装在了reponse.data.list里
        this.users = reponse.data.list
        this.total = reponse.data.total
      }
    },
    // 每页数据条数改变时触发
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUsers()
    },
    // 当前页码改变时触发
    handleCurrentChange(corruentPageNum) {
      this.queryInfo.pageNum = corruentPageNum
      this.getUsers()
    },
    // 重置密码
    resetPassword(username) {
      this.$confirm('是否确定重置用户密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const response = await this.$request.putWithParam(
            'user/password/init',
            {
              username: username
            }
          )
          if (response.successful) {
            this.$message.success('重置成功')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    // 删除用户
    deleteUser(user) {
      this.$confirm('是否确定删除用户' + user.realName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const response = await this.$request.deleteWithParam('user', {
            username: user.username
          })
          if (response.successful) {
            this.$message.success('删除成功')
            this.getUsers()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取所有用户角色
    async getRoles() {
      const response = await this.$request.get('/roles')
      if (response.successful) {
        this.roles = response.data
      }
    },
    // 修改用户角色
    async changeRole() {
      this.isChangeRoleDialogVisable = false
      const response = await this.$request.putWithBody(
        'user/role',
        this.changeRoleForm
      )
      if (response.successful) {
        this.$message.success('用户角色修改成功')
        this.getUsers()
      }
    },
    // 显示修改用户角色的对话框
    showChangeRoleDialog(user) {
      this.isChangeRoleDialogVisable = true
      // 每次打开对话框都将当前的角色赋值上去
      this.changeRoleForm.role = user.roleId
      this.changeRoleForm.realName = user.realName
      this.changeRoleForm.username = user.username
    },
    // 显示添加用户对话框
    showAddUserDialog() {
      this.isAddUserDialogVisiable = true
    },
    // 添加用户
    addUser() {
      this.$refs.addUserFormRef.validate(async valid => {
        if (valid) {
          const response = await this.$request.postWithBody(
            'user',
            this.addUserForm
          )
          if (response.successful) {
            this.isAddUserDialogVisiable = false
            this.getUsers()
            this.$message.success('用户添加成功')
          }
        }
      })
    },
    // 添加用户对话框关闭时触发
    handleAddUserDialogClose() {
      // 重置表单
      this.$refs.addUserFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
}
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
