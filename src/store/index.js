import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import materials from './modules/materials';

Vue.use(Vuex);

// export default new Vuex.Store({
// 	state: {
// 		count: 1
// 	},
// 	mutations: {
// 		increment(state) {
//             //变更状态
// 			state.count++;
// 		}
// 	}
// });

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		materials
	}
});

