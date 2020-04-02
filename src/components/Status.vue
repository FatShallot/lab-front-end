<template>
  <div>
    <!-- 页头 -->
    <el-page-header @back="goBack" content="状态统计"> </el-page-header>

    <el-card>
      <!-- 姓名 + 月份选择器 -->
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
      <!-- 图表 -->
      <div ref="bar" style="width: 1000px;height:400px;" />
    </el-card>
  </div>
</template>

<script>
// 导入echarts
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  data() {
    return {
      username: '',
      realName: '',
      month: '',
      // 学生的状态数据
      status: '',
      // 图表要用到的数据
      option: {
        // 柱状图每个柱子上的提示信息
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 图例
        legend: {
          data: []
        },
        // 柱状图四周的空间
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // x轴
        xAxis: [
          {
            type: 'category',
            // 使坐标文本倾斜
            axisLabel: {
              rotate: 45
            },
            data: []
          }
        ],
        // y轴
        yAxis: [
          {
            type: 'value'
          }
        ],
        // 数据
        // stack的值相同的列会堆叠在一起
        series: []
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 官网要求在其他dom加载完成才能开始初始化图表
    // this.initBarChart()
  },
  methods: {
    // 初始化
    init() {
      const studnet = this.$store.getters.getStudent
      this.username = studnet.username
      this.realName = studnet.realName
      // 获取当前年-月
      const date = new Date()
      this.month = date.getFullYear() + '-' + (date.getMonth() + 1)
      this.getStatusStatistic()
    },
    goBack() {
      // 回退，但是会将上一个页面刷新
      this.$router.back()
    },
    // 获取学生该月的状态统计信息
    async getStatusStatistic() {
      const response = await this.$request.get('student/month/status', {
        username: this.username,
        month: this.month
      })
      if (response.successful) {
        this.status = response.data
        // 加上type和stack，这两个在这里都是固定值
        for (let i = 0; i < this.status.length; i++) {
          this.status[i].type = 'bar'
          this.status[i].stack = '状态'
          // this.status[i].data = this.status[i].data / 3600
          for (let j = 0; j < this.status[i].data.length; j++) {
            this.status[i].data[j] = this.status[i].data[j] / 3600
          }
        }
        console.log(this.status)
        // 这里可以引入计算属性
        // 图例
        this.option.legend.data = this.status.map(item => item.name)
        // x轴坐标
        this.option.xAxis[0].data = this.status[1].data.map((item, index) => {
          return index + '日'
        })
        // 数据
        this.option.series = this.status

        this.initBarChart()
      }
    },
    // 初始化堆叠柱状图
    initBarChart() {
      var barChart = echarts.init(this.$refs.bar)
      barChart.setOption(this.option)
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
