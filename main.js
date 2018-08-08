const appOptions = {
  template: `
    <div>
      <h1>Search Gutenberg</h1>
      <div v-if="basicSearchOn">
        <basic-search
          v-on:switch-form="switchForm"
          v-on:input="changeText" />
      </div>
      <div v-else>
        <advanced-search
          v-on:switch-form="switchForm" />
      </div>
    </div>`,
  el: '#app',
  data: {
    search: '',
    basicSearchOn: true
  },
  methods: {
    changeText (text) {
      console.log(text)
    },
    switchForm (message) {
      this.basicSearchOn = !this.basicSearchOn
    }
  }
}

Vue.component('basic-search', searchComponentOptions)
Vue.component('advanced-search', advancedSearchComponentOptions)
const app = new Vue(appOptions)
