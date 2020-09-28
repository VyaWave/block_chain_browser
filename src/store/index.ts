/*************************************************************
 *
 *                      全局状态
 *
 ************************************************************/
'use strict';

import Vue from 'vue';

import Vuex from 'vuex';

/** state */
import _States from './states';

/** getters */
import _Getters from './getters';

/** actions */
import _Actions from './actions';

/** mtations */
import _Mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({

  // 获取状态
  state: _States,

  // 获取数据并渲染
  getters: _Getters,

  // 数据的异步操作
  actions: _Actions,

  // 处理数据的唯一途径，state的改变或赋值只能在这里
  mutations: _Mutations,

  modules: {},
})