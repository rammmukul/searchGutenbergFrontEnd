const searchComponentOptions = {
  template: `<div>
              <input type="text" v-on:input="$emit('input', $event.target.value)">
              <button>Search</button>
              <button @click="$emit('switch-form')">Advanced Search</button>
            </div>`
}
const advancedSearchComponentOptions = {
  template: `<div>
              <form>
                <legend>Advanced Search</legend>
                <button @click="$emit('switch-form')">Back to Basic Search</button>
                <label for="title">Title: </label>
                <input v-model="title" type="text" id="title">
                <label for="author">Author: </label>
                <input v-model="author" type="text" id="author">
                <label for="subject">Subject: </label>
                <input v-model="subject" type="text" id="subject">
                <button>Search</button>
              </form>
            </div>`,
  data: () => ({
    title: '',
    author: '',
    subject: ''
  })
}
