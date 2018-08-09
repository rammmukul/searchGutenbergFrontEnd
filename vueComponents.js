const searchComponentOptions = {
  template: `<div id="search-div">
              <input id="search-bar" type="text" v-on:input="$emit('input', $event.target.value)">
              <span id="buttons">
                <button>Search</button>
                <button @click="$emit('switch-form')">Advanced Search</button>
              </span>
            </div>`
}

const advancedSearchComponentOptions = {
  template: `<div>
                <button @click="$emit('switch-form')">Back to Basic Search</button>
              <form>
                <legend>Advanced Search</legend>
                <label for="title">Title: </label>
                <input type="text" id="title" v-model="title">
                <label for="author">Author: </label>
                <input type="text" id="author" v-model="authors">
                <label for="subject">Subject: </label>
                <input type="text" id="subject" v-model="subject">
              </form>
                <button v-on:click="composeAdvancedQuery">Search</button>
            </div>`,
  data () {
    return {
      title: '',
      authors: '',
      subject: ''
    }
  },
  methods: {
    composeAdvancedQuery () {
      let queryString = ''
      queryString = JSON.stringify({ 'query': { 'query_string': { 'query': `${this.title ? `title:${this.title}` : ''}
                                                          ${this.subject ? `subject:${this.subject}` : ''}
                                                          ${this.authors ? `authors:${this.authors}` : ''}` } } })
      console.log(queryString)
      this.$emit('search-query', queryString)
    }
  }
}

const bookComponentOptions = {
  template: `<div class="book">
              <a>
                <h3 class="book-title">{{bookObj._source.title}}</h3>
              </a>
            </div>`,
  props: ['bookObj'],
  computed: {
    downloadUrl () {
      let id = this.bookObj._source.id
      return `http://www.gutenberg.org/files/${id}/${id}-0.txt`
    },
    bookUrl () {
      let id = this.bookObj._source.id
      return `http://www.gutenberg.org/ebooks/${id}`
    }
  }
}
