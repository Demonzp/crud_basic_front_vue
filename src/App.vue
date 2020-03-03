<template>
<!-- Секция с HTML разметкой но хитрой -->
    <v-app>
        <v-content>
            <!-- Вставляем нашу компонент таблицу -->
            <Table/>
        </v-content>
    </v-app>
</template>

<script>
//Секция где можно писать супер пупер дупер JS код
import Table from './components/Table.vue';
//а тут магия ВУ
export default {
    //Имя компонента я хз может не обязательное поле)))
    name: 'App',
    //Тут мы должны обявить наши импортные компоненты которые хотим отображать
    components: {
        Table,
    },
    //Ну типа аналог Стейта
    data: () => ({
        //
    }),
};
</script>
