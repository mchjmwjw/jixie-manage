//import manage from '../../../api/manage';
import * as types from '../mutation-types';

// 初始化state
const state = {
	all: [],
	count: 1
};

const getters = {
	allMaterials: state => state.all
};

const mutations = {
	[types.RECEIVE_MATERIALS] (state, { material }) {
		state.all = material;
	},
	increment(state) {
		state.count++;
	}
};

const actions = {
	getAllMaterials ({ commit }, data) {
		// manage.getMaterials(material => {
		// 	commit(types.RECEIVE_MATERIALS, { material });	// 提交mutation RECEIVE_MATERIALS
		// });
		commit(types.RECEIVE_MATERIALS, { data });
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};