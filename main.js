const appOptions = {
  template: `
    <div>
      <h1>Search Gutenberg</h1>
      <div v-if="basicSearchOn">
        <basic-search
          v-model="search"
          v-on:switch-form="switchForm" />
      </div>
      <div v-else>
        <advanced-search
          v-on:search-query="setAdvancedQuery"
          v-on:switch-form="switchForm" />
      </div>
    </div>`,
  el: '#app',
  data: {
    search: '',
    basicSearchOn: true,
    queryObj: ''
  },
  methods: {
    switchForm (message) {
      this.basicSearchOn = !this.basicSearchOn
    },
    constructQuery () {
      this.queryObj = JSON.stringify({ 'query': { 'query_string': { 'query': this.search } } })
    },
    setAdvancedQuery (q) {
      this.queryObj = q
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
const app = new Vue(appOptions)
