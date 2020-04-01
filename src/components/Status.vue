<template>
  <div>
    <el-page-header @back="goBack" content="状态统计"> </el-page-header>

    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <span>{{ realName }}</span>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月"
            format="yyyy 年 MM 月"
            :editable="false"
            value-format="yyyy-MM"
            @change="getStatusStatistic"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      realName: '',
      month: ''
    }
  },
  created() {
    const studnet = this.$store.getters.getStudent
    this.username = studnet.username
    this.realName = studnet.realName
    // 获取当前年-月
    const date = new Date()
    this.month = date.getFullYear() + '-' + (date.getMonth() + 1)
    this.getStatusStatistic()
  },
  methods: {
    goBack() {
      // 回退，但是会将上一个页面刷新
      this.$router.back()
    },
    async getStatusStatistic() {
      const response = await this.$request.get('student/month/status', {
        username: this.username,
        month: this.month
      })
      if (response.successful) {
        console.log(response.data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 10px;
  height: 500px;
}
</style>
