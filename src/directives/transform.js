/*

Se eu quisesse declarar uma diretiva global, eu usuaria:

import Vue from 'vue';

Vue.directive('meu-transform', {
    bind(el, binding, vnode) {...}
})

*/

//Para declarar uma diretiva específica para um componente, este export default é necessário.
export default {
    /*
        1. O bind é um hook que é chamado toda vez que a diretiva é associada ao elemento do DOM
        2. O argumento el é uma referência ao elemento do DOM ao qual a diretiva foi associada.
        3. O argumento binding é um possível valor que a diretiva possa vir a receber.
        4. O argumento vnode é uma referência para o Virtual DOM utilizado pelo Vue. Ele permite acessar
            propriedades do Componente no qual ela foi associada. No entanto, essa dependência pode acabar com o
            reuso da diretiva, por isso deve ser usado com parcimônia. Além disso, não é comum querermos interagir
            com esse parâmetro.
    */
    bind(el, binding, vnode) {
        let current = 0;
        el.addEventListener('dblclick', function () {
            /*

            1. Caso passasse valores como objeto para a minha diretiva, eu acessaria assim:
            if (binding.value) {
                incremento = binding.value.incremento;
                animate = binding.value.animate;
            }

            2. Caso passasse os valores com modifiers para a minha diretiva:
                Obs: É comum testarmos a presença de modifiers e modifico algo na presença ou ausência de algum

            if (binding.modifiers.reverse) {
                current -= incremento;
            } else {
                current += incremento;
            }

            3. Uma diretiva pode suportar zero ou mais argumentos e eles servem para ditar a lógica principal da diretiva
                que deve ser executada. Já os modificadores podem ser usados pelos argumentos para que ativem ou não
                determinada lógica.

                Abaixo estamos combinando modificadores e argumentos. Passamos argumentos com :

                - O modificador animate funciona para os dois argumentos (rotate ou scale)
                - O modificador reverse não será aplicado no scale

                Isso é comum. Na documentação da diretiva dizemos quais os modificadores para cada argumento

                Possibilidades de configuração:
                    - v-meu-transform:rotate.animate
                    - v-meu-transform:scale.animate
                    - v-meu-transform.reverse.animate
                    - v-meu-transform:animate
            */

            let incremento = binding.value || 90;
            let efeito;

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= incremento;
                } else {
                    current += incremento;
                }
                efeito = `rotate(${current}deg)`;
            } else {
                efeito = `scale(${incremento})`;
            }

            el.style.transform = efeito;

            if (binding.modifiers.animate) el.style.transition = 'transform 0.5s';
        });
    },
};