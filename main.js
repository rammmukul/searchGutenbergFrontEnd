const appOptions = {
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
