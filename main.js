const appOptions = {
  template: `
    <div>
      <div id="spinner" v-bind:class="{ spinning: fetching }"></div>
      <header>
        <h1>Search Gutenberg</h1>
      </header>
      <div v-if="basicSearch">
        <basic-search
          v-model="search"
          v-on:switch-form="switchForm" />
      </div>
      <div v-else>
        <advanced-search
          v-on:search-query="setAdvancedQuery"
          v-on:switch-form="switchForm" />
      </div>
      <div id="books">
        <book v-for="book of booksList" :bookObj=book />
        <p v-if="noBook"> :-( No search results for {{ search }}, check the spelling or try a different term</p>
      </div>
    </div>`,
  el: '#app',
  data: {
    search: '',
    basicSearch: true,
    queryString: '',
    timeout: 0,
    booksList: [],
    fetching: false
  },
  methods: {
    switchForm () {
      this.search = ''
      this.qeryString = ''
      this.basicSearch = !this.basicSearch
    },
    setAdvancedQuery (queryString) {
      this.search = queryString
    },
    async getBooks (query) {
      clearTimeout(this.timeout)
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
    search () {
      this.fetching = true
      clearTimeout(this.timeout)
      this.queryString = JSON.stringify({ 'size': 10000, 'query': { 'query_string': { 'query': this.search } } })
      this.timeout = setTimeout(() => { this.getBooks(this.queryString) }, 500)
    }
  },
  computed: {
    noBook () {
      return !this.booksList.length && !this.fetching && !!this.search.trim().length
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
Vue.component('book', bookComponentOptions)
const app = new Vue(appOptions)
