import * as types from '../mutation-types';

const state = {
	all: '',
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
	}
};

const actions = {
	getAllKinds({commit}, data) {
		commit(types.RECEIVE_KINDS, data);
	},
	saveKindData({commit}, data) {
		commit(types.SAVE_KIND, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
