const appOptions = {
  template: `
    <div>
      <h1>Search Gutenberg</h1>
      <div v-if="basicSearchOn">
        <basic-search
          v-model="basicSearch"
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
    basicSearch: '',
    basicSearchOn: true,
    queryString: '',
    bookObj: {'title': 'hmara'}
  },
  methods: {
    switchForm (message) {
      this.basicSearchOn = !this.basicSearchOn
    },
    setAdvancedQuery (q) {
      this.queryString = q
    },
    async getBooks (q) {
      const books = await fetchBooks(q)
      console.log(books)
      return books
    }
  },
  watch: {
    basicSearch () {
      this.queryString = JSON.stringify({ 'query': { 'query_string': { 'query': this.basicSearch } } })
      this.getBooks(this.queryString)
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
Vue.component('book', bookComponentOptions)
const app = new Vue(appOptions)
