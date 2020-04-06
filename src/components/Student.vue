<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息统计</el-breadcrumb-item>
      <el-breadcrumb-item>学生状态</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 查询输入框 -->

      <el-form :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="queryInfo.realName" clearable @clear="getStudents">
            <!-- slot="append"应该是表示将按钮跟输入框结合在一起，是固定写法 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStudents"
              placeholder="请输入内容"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 用户表格 -->
      <!-- 增加height属性自动实现固定表头 -->
      <el-table :data="students" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="realName" label="姓名"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="getTagTypaByStatus(scope.row.statusId)"
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="toStatus(scope.row)"
            >
              统计信息
            </el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
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
        roleId: ''
      },
      // form里各元素标签的宽度
      formLabelWidth: '20%'
    }
  },
  created() {
    this.getStudents()
  },
  methods: {
    // 获取所有学生
    async getStudents() {
      const reponse = await this.$request.get('students', this.queryInfo)
      if (reponse.successful) {
        // 后台使用了分页插件，所以数据封装在了reponse.data.list里
        this.students = reponse.data.list
        this.total = reponse.data.total
      }
    },
    // 每页数据条数改变时触发
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getStudents()
    },
    // 当前页码改变时触发
    handleCurrentChange(corruentPageNum) {
      this.queryInfo.pageNum = corruentPageNum
      this.getStudents()
    },
    // 通过用户的状态渲染标签
    getTagTypaByStatus(statusId) {
      switch (statusId) {
        // 学习-绿色
        // 休息-橙色
        // 请假-灰色
        // 上课-蓝色
        // 打工-灰色
        case 1:
          return 'success'
        case 2:
          return 'warning'
        case 3:
          return 'info'
        case 4:
          return ''
        case 5:
          return 'info'
      }
    },
    // 跳转到状态统计页面
    toStatus(student) {
      this.$store.commit('updateStudent', {
        username: student.username,
        realName: student.realName
      })
      this.$router.push('/status')
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 10px;
}
.el-table {
  margin-bottom: 10px;
  width: 100%;
  height: 360px;
}
</style>
