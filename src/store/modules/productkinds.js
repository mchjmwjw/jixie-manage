import * as types from '../mutation-types';

const state = {
	all: [],
	data: ''
};

const getters = {
	allkinds: state => state.all,
	kinddata: state => state.data
};

const mutations = {
	[types.RECEIVE_KINDS] (state, { kinds }) {
		state.all = kinds;
	},
	[types.SAVE_KIND] (state, { kind }) {
		state.data = kind;
	},
	[types.LOAD_KIND] (state, { kinds }) {
		let arr = [];
		kinds.forEach(function(element, i, kindarr) {
			element.children = [];
			if(element.pid == null) {
				arr.push(element);
			}
			else {
				kindarr.forEach(function(ele) {
					if(ele.phid == element.pid){
						ele.children.push(element);
					}
				});
			}
		}, this);
		state.all = arr;
	}
};

const actions = {
	getAllKinds({commit}, data) {
		commit(types.RECEIVE_KINDS, data);
	},
	saveKindData({commit}, data) {
		commit(types.SAVE_KIND, data);
	},
	loadKindData({commit}, data) {
		commit(types.LOAD_KIND, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
