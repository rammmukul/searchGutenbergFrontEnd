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
                <input type="text" id="title">
                <label for="author">Author: </label>
                <input type="text" id="author">
                <label for="subject">Subject: </label>
                <input type="text" id="subject">
                <button>Search</button>
              </form>
            </div>`
}
