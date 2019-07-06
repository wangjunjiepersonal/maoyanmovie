import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	// City
		city: {
			nm:window.localStorage.getItem('nowNm') || '北京',
			id:window.localStorage.getItem('nowId') || 1
		}
  },
  mutations: {
		CITY_INFO(state,payload){
			state.city.nm = payload.nm
			state.city.id = payload.id
		}
  },
  actions: {

  }
})
