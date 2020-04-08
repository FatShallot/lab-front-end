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
      <div ref="bar" style="width: 1000px; height: 400px;" />
    </el-card>
  </div>
</template>

<script>
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
          },
          // 自定义提示信息
          formatter(data) {
            // 通过方法来操作提示信息的改进失败了，暂时放弃
            let msg = `${data[0].name}`
            // marker表示一段html，是这个状态的图例
            data.forEach(item => {
              // 将小数表示的小时转化为时分秒
              const duration =
                Math.trunc(item.data) +
                '时' +
                Math.trunc((item.data % 1) * 60) +
                '分'
              msg += `<br>${item.marker} ${item.seriesName} ${duration}`
            })
            // msg += `<br>${data[0].marker}`
            return msg
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
      },
      // 给堆叠柱状图用的配色表，这里用的是echarts提供的颜色，需要的话可以自己改
      colors: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
      ]
    }
  },
  created() {
    this.init()
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
          for (let j = 0; j < this.status[i].data.length; j++) {
            this.status[i].data[j] = this.status[i].data[j] / 3600
          }
          // 自定义颜色
          this.status[i].itemStyle = {
            color: this.colors[i % this.colors.length]
          }
        }
        // 图例
        this.option.legend.data = this.status.map(item => item.name)
        // x轴坐标
        this.option.xAxis[0].data = this.status[1].data.map((item, index) => {
          return index + 1 + '日'
        })
        // 数据
        this.option.series = this.status

        this.initBarChart()
      }
    },
    // 初始化堆叠柱状图
    initBarChart() {
      var barChart = this.$echarts.init(this.$refs.bar)
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
