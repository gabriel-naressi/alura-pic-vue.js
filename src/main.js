//Global view object
import Vue from 'vue'
import App from './App.vue'

// É um módulo que se integra muito bem com vue.js, utilizado para fazer requisições. Ele não faz parte do vue core.
import VueResource from 'vue-resource';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
