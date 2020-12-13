import Vue from 'vue';

/*
  Não se coloca v- em nomes de diretivas. Mas ao utilizá-las o v- é obrigatório.
  Quando formos utilizar esta diretiva, teremos que chamá-la assim: v-meu-transform.
 */
Vue.directive('meu-transform', {
    /*
        1. O bind é um hook que é chamado toda vez que a diretiva é associada ao elemento do DOM
        2. O el é uma referência ao elemento do DOM ao qual a diretiva foi associada.
    */
    bind(el, binding, vnode) {
        let current = 0;
        el.addEventListener('dblclick', function () {
            current += 90;
            el.style.transform = `rotate(${current}deg)`;
        });
        console.log(el);
    },
});