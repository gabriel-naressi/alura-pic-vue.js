<template>
  <div id="app">
    <!-- Chamado de interpolação. É um tipo de data binding. -->
    {{title}}
    <!-- 
      Dentro de atributos, a interpolação não é permitida, por isso precisamos do v-bind. 
      O v-bind é a interpolação dentro de um atributo.
    -->
    <!-- <img v-bind:src="foto.url" v-bind:alt="foto.titulo"> !-->
    <!-- O v-bind pode ser omitido, deixando o código mais enxuto: -->
    <img v-for="foto in fotos" :src="foto.url" :alt="foto.titulo">
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Alurapic',
      fotos:[]
    }
  }, 
  //Lifecycle hooks: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  //Função que é chamada quando o objeto é criado
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      // response.json também é uma promise.
      .then(response => response.json())
      .then(responseData => this.fotos = responseData)
  }
}
</script>

<style>
</style>
