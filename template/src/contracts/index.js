/* global web3:true */

import contract from 'truffle-contract'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// import artifacts
import metacoinArtifacts from '../../../build/contracts/MetaCoin.json'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// create contracts
const MetaCoin = contract(metacoinArtifacts){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
MetaCoin.setProvider(web3.currentProvider){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  MetaCoin{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
