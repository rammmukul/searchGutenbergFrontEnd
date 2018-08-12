const searchComponentOptions = {
  template: `<div id="search-div">
              <input id="search-bar" type="text" v-on:input="$emit('input', $event.target.value)" placeholder="Type your query">
              <button @click="$emit('switch-form')">Advanced Search</button>
            </div>`
}

const advancedSearchComponentOptions = {
  template: `<div id="advanced-search">
              <form id="form">
                <legend>Advanced Search</legend>
                <span id="fields">
                  <span class="title">
                    <label for="title">Title: </label>
                    <input type="text" id="title" v-model="title">
                  </span>
                  <span class="author">
                    <label for="author">Author: </label>
                    <input type="text" id="author" v-model="authors">
                  </span>
                  <span class="subject">
                    <label for="subject">Subject: </label>
                    <input type="text" id="subject" v-model="subject">
                  </span>
                </span>
              </form>
              <div id="buttons">
                <button @click="$emit('switch-form')" id="back-to-basic">Back to Basic Search</button>
              </div>
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
      queryString = `${this.title ? `title:${this.title}` : ''}
                    ${this.subject ? `subject:${this.subject}` : ''}
                    ${this.authors ? `authors:${this.authors}` : ''}`
      this.$emit('search-query', queryString)
    }
  },
  watch: {
    title () {
      this.composeAdvancedQuery()
    },
    authors () {
      this.composeAdvancedQuery()
    },
    subject () {
      this.composeAdvancedQuery()
    }
  }
}

const bookComponentOptions = {
  template: `<div class="book">
              <a :href=bookUrl target="_blank">
                <h3 class="book-title">{{bookObj._source.title}}</h3>
                <ul class="authors" id="authors">
                  <li class="author" v-for="author in bookObj._source.authors">{{ author }} </li>
                </ul>
                <ul class="subjects" id="subjects" >
                  <li class="subject" v-for="subject in bookObj._source.subjects"><span>{{ subject }}</span> </li>
                </ul>
              </a>
            </div>`,
  props: ['bookObj'],
  computed: {
    bookUrl () {
      let id = this.bookObj._source.id
      return `http://www.gutenberg.org/ebooks/${id}`
    }
  }
}
