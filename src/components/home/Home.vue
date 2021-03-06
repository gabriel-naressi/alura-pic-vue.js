<template>
  <div>
    <!-- Chamado de interpolação. É um tipo de data binding. -->
    <h1 class="centralizado">{{ title }}</h1>
    <p v-show="mensagem">{{ mensagem }}</p>
    <!--

      v-on = @
      v-bind = :

      A diretiva v-on (pode ser substituída por @) realiza uma associação de evento que flui da view para a
      fonte de dados. Qualquer mudança na fonte de dados atualizará a view associada a ela, contanto que haja uma
      associação através de v-bind
    -->
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    />
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto.url"
      >
        <div class="painel">
          <meu-painel :titulo="foto.titulo">
            <!--
              1. Dentro de atributos, a interpolação não é permitida, por isso precisamos do v-bind.
                O v-bind é a interpolação dentro de um atributo. A diretiva v-bind realiza uma
                associação que flui da fonte de dados para a view. Qualquer mudança na fonte de dados
                fará com que a view seja atualizada para representar o novo valor.
                <img v-bind:src="foto.url" v-bind:alt="foto.titulo">
              2. O v-bind pode ser substituído por :, deixando o código mais enxuto:
                <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
              3. Posso passar valores para uma diretiva através de objetos, ou usando modifiers.
                Como objeto ficaria assim: v-meu-transform="{ animate: true, incremento: 15 }"
                Com modifier, o exemplo esta na linha 44.
              4. Posso passar modifiers para uma diretiva, assim:
                v-meu-transform.animate="15" ou v-meu-transform.animate.reverse="15"
            -->

            <imagem-responsiva
              :url="foto.url"
              :titulo="foto.titulo"
              v-meu-transform:scale.animate="1.2"
            />
            <!--
              1. O dois pontos foi omitido neste caso porque não estamos fazendo data binding. Em outras palavras,
                esses dados não estão sendo controlados na função data().
              2. Para colocar um evento de click no meu componente, preciso defini-lo de um jeito especial, já que ele
                não é um elemento html comum. Como o elemento que é renderizado pelo componente meu-botao, é apenas um
                botão, consigo pedir para o vue utilizar o click "nativo" deste elemento, assim:
                <meu-botao tipo="button" rotulo="REMOVER" @click.native="remove()" />
            -->
            <meu-botao
              tipo="button"
              rotulo="REMOVER"
              @botaoAtivado="remove($event, foto)"
              :confirmacao="false"
              estilo="perigo"
            />
          </meu-painel>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ImagemResponsivaVue from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Painel from "../shared/painel/Painel.vue";
import Botao from "../shared/botao/Botao.vue";
import transform from "../../directives/transform";
import FotoService from "../../domain/foto/FotoService";

export default {
  //Import de componentes. A chave do objeto é o "apelido" do componente.
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsivaVue,
    "meu-botao": Botao,
  },
  // Diretivas específicas para este componente
  directives: {
    "meu-transform": transform,
  },
  //Fonte de dados que se deseja controlar (state).
  data() {
    return {
      title: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: "",
    };
  },
  //Essa é uma das funções lifecycle hooks, ela é chamada quando o objeto é criado.
  //Para saber mais: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  created() {
    /*
    this.$http
      .get("v1/fotos")
      // response.json também é uma promise.
      .then((response) => response.json())
      //Altero meu conjunto de dados fotos (definido na linha 49)
      .then((responseData) => (this.fotos = responseData));
    */
    this.service = new FotoService(this.$resource);
    this.service.lista().then((responseData) => (this.fotos = responseData));
  },
  //Definição de métodos onde posso isolar alguma lógica específica que vai acontecer com um conjunto de dados.
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        const exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },
  //Define ações que serão executadas dentro deste componente
  methods: {
    remove($event, foto) {
      //Exemplo de exibição de um dado que foi enviado pelo componente filho
      //alert($event);
      //alert("Remover a foto: " + foto.titulo);
      this.service.apaga(foto._id).then(
        () => {
          /*
            Para sincronizar a remoção da foto na tela, apenas removemos ela da lista que esta sendo exibida.
            Poderíamos fazer uma requisição novamente, mas sabemos que quanto mais pudermos evitar requisições, mais rápida
            a aplicação fica.
          */
          const index = this.fotos.indexOf(foto);
          this.fotos.splice(index, 1);
          this.mensagem = "Foto removida com sucesso";
        },
        (err) => {
          console.error(err);
          this.mensagem = "Não foi possível remover a foto";
        }
      );
    },
  },
};
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
