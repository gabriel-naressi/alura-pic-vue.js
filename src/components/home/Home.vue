<template>
  <div>
    <!-- Chamado de interpolação. É um tipo de data binding. -->
    <h1 class="centralizado">{{ title }}</h1>
    <!-- A diretiva v-on (pode ser substituída por @) realiza uma associação de evento que flui da view para a fonte de dados. 
    Qualquer mudança na fonte de dados atualizará a view associada a ela, contanto que haja uma associação através de v-bind -->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre por parte do título"/>
  
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.url">
        <div class="painel">
          <meu-painel :titulo="foto.titulo">
            <!-- 
              Dentro de atributos, a interpolação não é permitida, por isso precisamos do v-bind. 
              O v-bind é a interpolação dentro de um atributo.
            -->
            <!-- <img v-bind:src="foto.url" v-bind:alt="foto.titulo"> -->
            <!-- A diretiva v-bind realiza uma associação que flui da fonte de dados para a view. Qualquer mudança na fonte de dados 
            fará com que a view seja atualizada para representar o novo valor. -->
            <!-- O v-bind pode ser substituído por :, deixando o código mais enxuto: -->
            <!-- <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo"> -->
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
          </meu-painel>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ImagemResponsivaVue from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Painel from '../shared/painel/Painel.vue';

export default {
  //"apelido" para o painel.
  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsivaVue
  },
  data() {
    return {
      title: 'Alurapic',
      fotos:[],
      filtro: ''
    }
  }, 
  //Lifecycle hooks: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  //Função que é chamada quando o objeto é criado
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      // response.json também é uma promise.
      .then(response => response.json())
      .then(responseData => this.fotos = responseData)
  },
  //Definição de métodos onde posso isolar uma lógica.
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
