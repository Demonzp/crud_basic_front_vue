<template>
<!-- Окно Редактирования, в теории оноже будет и добавления, возможно, не я уже устал
делаю два отдельных компонента через копи паст)) -->
<v-row justify="center">
    <v-dialog 
        v-bind:value="value"
        persistent
        max-width="320"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Форма Редактирования</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                    
                    <v-col cols="12">
                        <v-text-field v-model="name" label="Наименование*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="price" label="Цена*" required></v-text-field>
                    </v-col>
                    
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="$emit('input', false)">Отмена</v-btn>
                <!-- передаем при нажатии на Сохранить введеные данные и переданый ранее id -->
                <v-btn color="blue darken-1" text @click="$emit('save-edit',{id,name,price})">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    name: 'WinEditRow',
    props:{
        "value":{
            type: Boolean,
            required: true
        },
        "data":{
            type:Object,
            required: true
        },
    },
    data: () => ({
        name:'',
        price:'',
        id:''
    }),
    //так вот тут мне кажеться у меня в корне не правельный подход но как по
    //другому я хз карочи у нас это окно в виртуал доме сразу рендерица,
    //даже если оно не отображаеться оно уже есть в оперативке, так вот
    //Хук mounted сработает один рас при загрузке компонента Отца
    // и тут мне на помощь бежит метод(хук) вачер карочи, он смотрит за изменениями
    //в переменной data она же у Отца data_edit и как тока мы в нее что то вносим
    // мы тутже на это реагируем и перезаписываем значения в полях для ввода
    //но почему это не очень подход мне кажеться он ресурсоемкий в ВУ 2 наскока я 
    //вкурсе Вачер юзает какойто древний метод Обсерв из JS возможно в Ву 3 оно Юзает
    //Poxy, ну и ясно дело наверняка есть более елегантные решения даже и на Ву 2
    //алеж маэмо що маэмо
    watch:{
        'data': 'fetchData'
    },
    methods:{
        fetchData(){
            this.name = this.data.name;
            this.price = this.data.price;
            this.id = this.data.id;
        }
    }
}
</script>
