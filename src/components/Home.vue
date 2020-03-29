<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <span>实验室管理系统</span>
      <!-- <el-button type="info" plain @click="logout">退出登录</el-button> -->
      <!-- <div class="systemOperation" @click="logout">···</div> -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          用户：{{ userRealName }}
          <i class="el-icon-arrow-down el-icon--right"></i
        ></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <!-- 身体 -->
    <el-container>
      <!-- 侧边栏，放菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse-button" @click="collapse">|||</div>
        <!-- 菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <!-- 循环 -->
          <!-- index要求绑定字符串 -->
          <el-submenu
            v-for="item in menus"
            :key="item.id"
            :index="item.id + ''"
            unique-opened
          >
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span>{{ item.description }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 内层循环 -->
            <el-menu-item
              v-for="childItem in item.childMenus"
              :key="childItem.id"
              :index="'/' + childItem.path"
            >
              <!-- 模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ childItem.description }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体，组件都放在这里显示 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 菜单
      menus: [],
      // 侧边栏是否折叠，默认不折叠
      isCollapse: false,
      // 用户真实姓名
      userRealName: ''
    }
  },
  created() {
    this.getMenus()
    this.getUserRealName()
  },
  methods: {
    logout() {
      // 清空session里保存的token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus() {
      // 这种写法将返回值里的data属性取出来，并命名为menus
      const response = await this.$request.get('/menus')
      if (response.successful) {
        this.menus = response.data
      }
    },
    // 折叠侧边栏
    collapse() {
      this.isCollapse = !this.isCollapse
    },
    // 页面右上角的下拉菜单
    handleCommand(command) {
      if (command === 'password') {
        this.$router.push('/password')
      }
      if (command === 'logout') {
        this.logout()
      }
    },
    async getUserRealName() {
      const response = await this.$request.get('user/real_name')
      if (response.successful) {
        this.userRealName = response.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 可以直接用element-ui的标签做类名
.el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;
  // 这个设置解决menu比aside长一小段的问题
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.collapse-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-dropdown-link {
  font-size: 8px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 16px;
}
</style>
