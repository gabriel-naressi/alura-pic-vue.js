//Global view object
import Vue from 'vue'
import App from './App.vue'

// É um módulo que se integra muito bem com vue.js, utilizado para fazer requisições. Ele não faz parte do vue core.
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';

//Queremos que esse objeto seja carregado para a diretiva ser registrada.
import './directives/transform';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  //Elimina o uso de # na url. Para isso funcionar, o servidor precisa devolver sempre uma página index.html,
  //independentemente da url que estiver sendo acessada. O servidor utilizado para este projeto já faz isso.
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
