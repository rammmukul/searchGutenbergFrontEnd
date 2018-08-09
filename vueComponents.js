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
                <input type="text" id="author" v-model="author">
                <label for="subject">Subject: </label>
                <input type="text" id="subject" v-model="subject">
              </form>
                <button v-on:click="composeAdvancedQuery">Search</button>
            </div>`,
  data () {
    return {
      title: '',
      author: '',
      subject: '',
    }
  },
  methods: {
    composeAdvancedQuery () {
      let queryObj = {}
      queryObj = JSON.stringify({ 'query': { 'fuzzy': { 'subjects': this.subject, 'author': this.author, 'title': this.title } } })
      this.$emit('search-query', queryObj)
    }
  }
}
