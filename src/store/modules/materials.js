//import manage from '../../../api/manage';
import * as types from '../mutation-types';

// 初始化state
const state = {
	all: [],
	count: 1,
	infos: {}
};

const getters = {
	allMaterials: state => state.all,
	allInfos: state => state.infos
};

const mutations = {
	[types.RECEIVE_MATERIALS] (state, { material }) {
		state.all = material;
	},
	increment(state) {
		state.count++;
	},
	[types.SET_MATERIALS] (state, { infos }) {
		state.infos = infos;
	}
};

const actions = {
	getAllMaterials ({ commit }, data) {		
		commit(types.RECEIVE_MATERIALS, data);
	},
	setMaterials ({ commit }, data) {
		commit(types.SET_MATERIALS, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};