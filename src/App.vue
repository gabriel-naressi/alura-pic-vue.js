<template>
  <div class="corpo">
    <meu-menu :rotas="routes" />
    <transition name="pagina">
      <!-- Serve para indicar para o template da página principal da aplicação o local no qual os demais componentes 
        carregados através de rotas devem ser renderizados. -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import { routes } from './routes'; 
import Menu from './components/shared/menu/Menu.vue';

export default {
  components: {
    'meu-menu': Menu
  },
  data() {
    return { routes : routes }
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s;
  }
</style>
