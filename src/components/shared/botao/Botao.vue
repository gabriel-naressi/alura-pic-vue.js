<template>
  <!--
    Repare nas linhas 9 e 10. Os atributos class e :class podem ser usados juntos. No caso, queremos para o caso do
    botao ser perigo ou padrao uma estilização comum que esta na classe botão. O vue se encarrega de fazer a concatenação
    dessas classes, ficando botao botao-perigo ou botao bota-padrao
  -->
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    :type="tipo"
  >
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  computed: {
    estiloDoBotao() {
      if (!this.estilo || this.estilo == "padrao") return "botao-padrao";
      if (this.estilo == "perigo") return "botao-perigo";
    },
  },
  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm("Confirma operação?")) {
          /*
            1. Dispara um evento com o nome 'botaoAtivado'.
              O evento botaoAtivado só vai ser disparado (executando a função que ele recebeu), caso o
              usuário confirme a operação.
            2. O segundo parâmetro exemplifica o envio de um dado para o componente pai
          */
          this.$emit("botaoAtivado", new Date());
        }
        return;
      } else {
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
    confirmacao: Boolean,
    estilo: String,
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