<template>
  <button @click="disparaAcao()" class="botao botao-perigo" :type="tipo">
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  methods: {
    disparaAcao() {
      //Dispara um evento com o nome 'botaoAtivado'
      if (confirm("Confirma operação?")) {
        //O evento botaoAtivado só vai ser disparado (executando a função que ele recebeu), caso o
        //usuário confirme a operação

        //O segundo parâmetro exemplifica o envio de um dado para o componente pai
        this.$emit("botaoAtivado", new Date());
      }
    },
  },
  props: {
    tipo: {
      type: String,
      required: true,
    },
    rotulo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>