import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import createLogger from 'vuex/dist/logger'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import * as types from './mutation-types.js'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import { MetaCoin } from '../contracts'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const debug = process.env.NODE_ENV !== 'production'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const rootState = {
  account: '',
  balance: 0,
  amount: '',
  address: '',
  status: ''{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const getters = {
  account: state => state.account,
  balance: state => state.balance,
  amount: state => state.amount,
  address: state => state.address,
  status: state => state.status{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const actions = {
  // action is dispatched when account is first set
  // this is where you can put your initialization calls
  setAccount ({ commit, dispatch, state }, account) {
    commit(types.UPDATE_ACCOUNT, account){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  // action is dispatched when/if the account is updated
  // use this action to refresh the app with the new account's data
  updateAccount ({ commit, dispatch, state }, account) {
    commit(types.UPDATE_ACCOUNT, account){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  sendMeta ({ commit, dispatch, state }) {
    commit(types.UPDATE_STATUS, 'Initiating transaction... (please wait)'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    MetaCoin.deployed().then((instance) => {
      return instance.sendCoin(state.address, parseInt(state.amount), { from: state.account }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).then(() => {
      dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Transaction complete!'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).catch((err) => {
      console.error(err){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Error sending coin; see log.'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  getBalance ({ commit, state }) {
    MetaCoin.deployed().then((instance) => {
      return instance.getBalance.call(state.account, { from: state.account }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).then((balance) => {
      commit(types.UPDATE_BALANCE, balance.toString()){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).catch((err) => {
      console.error(err){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Error getting balance; see log.'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const mutations = {
  [types.UPDATE_ACCOUNT] (state, account) {
    state.account = account{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_ADDRESS] (state, address) {
    state.address = address{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_AMOUNT] (state, amount) {
    state.amount = amount{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_BALANCE] (state, balance) {
    state.balance = balance{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_STATUS] (state, status) {
    state.status = status{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default new Vuex.Store({
  state: rootState,
  getters: getters,
  actions: actions,
  mutations: mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
