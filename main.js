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
      <book v-for="book of booksList" :bookObj=book />
      <p v-if="noBook">No Books for you...</p>
    </div>`,
  el: '#app',
  data: {
    basicSearch: '',
    basicSearchOn: true,
    basicQueryString: '',
    timeout: 0,
    booksList: [],
    fetching: false
  },
  methods: {
    switchForm (message) {
      this.basicSearchOn = !this.basicSearchOn
    },
    setAdvancedQuery (query) {
      this.getBooks(query)
    },
    async getBooks (query) {
      clearTimeout(this.timeout)
      console.count('getBooks called')
      const books = await this.fetchBooks(query)
      console.log(books)
      this.booksList = books.hits.hits
      this.fetching = false
    },
    async fetchBooks (query) {
      const url = 'http://localhost:9200/_search'
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: query
      }
      const res = await fetch(url, options)
      return res.json()
    }
  },
  watch: {
    basicSearch () {
      this.fetching = true
      clearTimeout(this.timeout)
      this.basicQueryString = JSON.stringify({ 'size': 10000, 'query': { 'query_string': { 'query': this.basicSearch } } })
      this.timeout = setTimeout(() => { this.getBooks(this.basicQueryString) }, 500)
    }
  },
  computed: {
    noBook () {
      return !this.booksList.length && this.basicSearch.length && !this.fetching
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
Vue.component('book', bookComponentOptions)
const app = new Vue(appOptions)
