import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    num:JSON.parse(localStorage.getItem('num')) ||0
  },
  mutations:{
    changeNum(state,value){
      state.num += value;
      localStorage.setItem('num',JSON.stringify(state.num))
    }
  }
})
