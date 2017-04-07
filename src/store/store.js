import Vuex from 'vuex';

export default new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state) {
            //变更状态
			state.count++;
		}
	}
});