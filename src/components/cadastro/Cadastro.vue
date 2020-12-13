<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <!-- Equivale ao preventDefault() do js -->
    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <!--
          Em todos os inputs temos um exemplo de data binding bidirecional (two-way data binding).

          1. @input="foto.titulo = $event.target.value" é um binding da view para a fonte de dados
          2. :value="foto.titulo" faz é um binding da fonte de dados para a view

          Mas podemos substituir estes dois atributos pela diretiva v-model, assim: v-model="foto.titulo"
        -->
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <!-- O modifier .lazy posterga a atualização dos dados da vie para o modelo no momento que o usuário sair do input -->
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <!-- v-show="foto.url" diz para o vue exibir este componente apenas quando uma foto.url exitir -->
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link to="/"
          ><meu-botao rotulo="VOLTAR" tipo="button"
        /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  created() {
    this.service = new FotoService(this.$resource);
  },
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: new Foto(),
    };
  },
  methods: {
    grava() {
      /*
        1. O this é o objeto que esta sendo controlado na função data acima

        2. Aprendemos a utilizar $http para consumir API's. No entanto, $http é um objeto especializado apenas na
        realização de requisições assíncronas ou se você preferir, requisições Ajax. Contudo, há um outro objeto mais
        especializado focado no consumo de API's que seguem o Padrão REST. É o $resource.

        Exemplo de chamada com o $http:

        this.$http.post("v1/fotos", this.foto).then(
          () => (this.foto = new Foto()),
          (err) => console.log(error)
        );
      */
      this.service.cadastra(this.foto).then(
        () => (this.foto = new Foto()),
        (err) => console.log(error)
      );
    },
  },
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>