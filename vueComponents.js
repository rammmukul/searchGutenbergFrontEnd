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
      const isQuery = this.title.length || this.authors.length || this.subject.length
      this.$emit('search-query', {queryString, isQuery})
    }
  }
}

const bookComponentOptions = {
  template: `<div class="book">
              <a :href=bookUrl target="_blank">
                <h3 class="book-title">{{bookObj._source.title}}</h3>
                <ul class="authors" id="authors" v-for="author in bookObj._source.authors">
                  <li class="author">{{ author }}</li>
                </ul>
                <ul class="subjects" id="subjects" v-for="subject in bookObj._source.subjects">
                  <li class="subject">{{ subject }}</li>
                </ul>
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
