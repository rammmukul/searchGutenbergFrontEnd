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
    basicQueryString: '',
    bookObj: {'title': 'hmara'}
  },
  methods: {
    switchForm (message) {
      this.basicSearchOn = !this.basicSearchOn
    },
    setAdvancedQuery (query) {
      this.getBooks(query)
    },
    async getBooks (query) {
      const books = await fetchBooks(query)
      console.log(books)
      return books
    }
  },
  watch: {
    basicSearch () {
      this.basicQueryString = JSON.stringify({ 'size': 10000, 'query': { 'query_string': { 'query': this.basicSearch } } })
      this.getBooks(this.basicQueryString)
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
Vue.component('book', bookComponentOptions)
const app = new Vue(appOptions)
