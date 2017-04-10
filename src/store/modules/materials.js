import manage from '../../../api/manage';
import * as types from '../mutation-types';

// 初始化state
const state = {
	all: [],
	count: 1
};

const getters = {
	allMaterials: state => state.all
};

const actions = {
	getAllMaterials ({ commit }) {
		manage.getMaterials(material => {
			commit(types.RECEIVE_MATERIALS, { material });	// 提交mutation RECEIVE_MATERIALS
		});
	}
};

const mutations = {
	[types.RECEIVE_MATERIALS] (state, { material }) {
		state.all = material;
	},
	increment(state) {
		state.count++;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};