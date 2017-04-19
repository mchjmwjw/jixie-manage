import * as types from '../mutation-types';

const state = {
	all: ''
};

const getters = {
	allkinds: state => state.all
};

const mutations = {
	[types.RECEIVE_KINDS] (state, { kinds }) {
		state.all = kinds;
	},
	[types.INSERT_KIND] (state, { kind }) {
		state.all.push(kind);
	}
};

const actions = {
	getAllKinds({commit}, data) {
		commit(types.RECEIVE_KINDS, data);
	},
	addNewNode({commit}, data) {
		commit(types.INSERT_KIND, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
