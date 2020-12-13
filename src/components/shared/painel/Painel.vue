<template>
  <div class="painel">
    <!-- A diretiva v-on pode ser substituída por @, deixando o código mais enxuto: -->
    <!-- <h2 class="painel-titulo" v-on:dblclick="visivel = !visivel">{{titulo}}</h2> -->
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">
      <!-- Essa variável é recebida por prop (linha 22) e exibida através de interpolação -->
      {{ titulo }}
    </h2>
    <!-- Tudo que estiver dentro da tag do componente, vai cair dentro de slot -->
    <!-- a diretiva v-show não pode ser usada em slots! -->
    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  //Os valores declarados nas props, podem ser acessados por interpolação
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visivel: true,
    };
  },
};
</script>

<!-- Aplicando scoped, o estilo fica contido no componente. Isso quer dizer que
mesmo se utilizarmos um seletor global de estilização, apenas os elementos deste
componente serão afetados. Isso é uma boa prática -->
<style scoped>
.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

* {
  box-shadow: 5px 5px 5px;
}

/* Ao adicionarmos o name painel-fade na tag transition, o vue automaticamente cria algumas classes,
     adicionadas em diferentes etapas:

    1. painel-fade-enter: antes do elemento ser incluído ou removido, o estado atual
    2. painel-fade-enter-active: quando o elemento esta sendo incluido
    3. painel-fade-leave-active: quando o elemento esta sendo removido
  */

.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}

.painel-conteudo {
  overflow: hidden;
}
</style>
