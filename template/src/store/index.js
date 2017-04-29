import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import createLogger from 'vuex/dist/logger'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import * as types from './mutation-types'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import { MetaCoin } from '../contracts'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const debug = process.env.NODE_ENV !== 'production'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const rootState = {
  account: '',
  balance: '0',
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
  setAccount{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}({ commit, dispatch, state }, account) {
    commit(types.UPDATE_ACCOUNT, account){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  // action is dispatched when/if the account is updated
  // use this action to refresh the app with the new account's data
  updateAccount{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}({ commit, dispatch, state }, account) {
    commit(types.UPDATE_ACCOUNT, account){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  sendMeta{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}({ commit, dispatch, state }) {
    commit(types.UPDATE_STATUS, 'Initiating transaction... (please wait)'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    MetaCoin.deployed().then(instance => (
      instance.sendCoin(state.address, parseInt(state.amount, 10), { from: state.account })
    )).then(() => {
      dispatch('getBalance'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Transaction complete!'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).catch((err) => {
      console.error(err){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Error sending coin; see log.'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  getBalance{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}({ commit, state }) {
    MetaCoin.deployed().then(instance => (
      instance.getBalance.call(state.account, { from: state.account })
    )).then((balance) => {
      commit(types.UPDATE_BALANCE, balance.toString()){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }).catch((err) => {
      console.error(err){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      commit(types.UPDATE_STATUS, 'Error getting balance; see log.'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const mutations = {
  {{#router}}
  // this mutatation is called when the route changes
  [types.ROUTE_CHANGED]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, { to, from }) {
    console.log('route changed from', from.name, 'to', to.name){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  {{/router}}
  [types.UPDATE_ACCOUNT]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, account) {
    state.account = account{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_ADDRESS]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, address) {
    state.address = address{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_AMOUNT]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, amount) {
    state.amount = amount{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_BALANCE]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, balance) {
    state.balance = balance{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.UPDATE_STATUS]{{#if_not_eq lintConfig "airbnb"}} {{/if_not_eq}}(state, status) {
    state.status = status{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default new Vuex.Store({
  state: rootState,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
