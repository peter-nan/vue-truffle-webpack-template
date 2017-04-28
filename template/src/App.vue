<template>
  <div id="app">
    {{#router}}
    <router-view></router-view>
    {{else}}
    <meta-coin></meta-coin>
    {{/router}}
  </div>
</template>

<script>
/* global web3:true */

{{#unless router}}
import MetaCoin from './components/MetaCoin'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/unless}}
import { default as Web3 } from 'web3'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import { mapGetters } from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  name: 'app',{{#unless router}}
  components: {
    MetaCoin{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },{{/unless}}
  data () {
    return {
      accountInterval: null{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  computed: {
    ...mapGetters({
      account: 'account'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  mounted () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 === 'undefined') {
      console.error(`No web3 detected. Please use MetaMask for development. https://metamask.io/`){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      return{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }

    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

    // keep account updated if user decides to switch
    this.$store.dispatch('setAccount', web3.eth.accounts[0]){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    this.accountInterval = setInterval(() => {
      const account = web3.eth.accounts[0]{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      if (account !== this.account) {
        this.$store.dispatch('updateAccount', account){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      }
    }, 100){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  beforeDestroy () {
    clearInterval(this.accountInterval){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 500px;
  padding: 0em 1em;
}
</style>
