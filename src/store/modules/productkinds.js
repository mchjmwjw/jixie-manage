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
	}
};

const actions = {
	getAllKinds({commit}, data) {
		commit(types.RECEIVE_KINDS, data);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
