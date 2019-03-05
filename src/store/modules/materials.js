//import manage from '../../../api/manage';
import * as types from '../mutation-types';

// 初始化state
const state = {
	all: [],
	count: 1,
	infos: {},
	filter: []
};

const getters = {
	allMaterials: state => state.all,
	allInfos: state => state.infos,
	filterMaterials: state => state.filter
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
	},
	[types.FILTER_MATERIALS] (state, { kind_id }) {
		let arr = [];
		state.all.forEach(function(element) {
			if(element.kind_id == kind_id) {
				arr.push(element);
			}
		}, this);
		state.filter = arr;
	}
};

const actions = {
	getAllMaterials ({ commit }, data) {		
		commit(types.RECEIVE_MATERIALS, data);
		return data.me;
	},
	setMaterials ({ commit }, data) {
		commit(types.SET_MATERIALS, data);
	},
	getMaterialsByKindId ({ commit }, data) {
		commit(types.FILTER_MATERIALS, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};