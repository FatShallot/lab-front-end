import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态->相当于数据
  state: {
    student: {
      username: '',
      realName: ''
    }
  },
  // 定义对值得修改
  mutations: {
    // 第一个参数必须声明，用来获取state
    updateStudent(state, playload) {
      state.student = playload
    }
  },
  // 定义对值得获取
  getters: {
    getStudent: state => {
      return state.student
    }
  }
})

export default store
