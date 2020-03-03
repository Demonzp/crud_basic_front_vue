<template>
    <v-container>
        <!-- Компонент Алерт выпадающее нет появляющееся сообщение которое можно 
        закрыть -->
        <Alert v-model="alert" :text="alert_text"/>
        <!-- Окно защиты от необдуманого клика удалить тут юзаеться интересная
        фича ВУ v-model, но как она работает я не раскажу)),
        также передаем ИД и слушаем подтверждение и реагируем на него в
        функции onConfirmDel -->
        
        <WinDelConfirm 
            v-model="dialog_del" 
            :id="id_del"
            @confirm-del="onConfirmDel"
        />
        <!-- Так тут у меня разметка скопиреная из либы вутифай
        https://vuetifyjs.com/ru/components/simple-tables 
        еще момент все что начинаеться с v-, это значит из вуе или вуекса,
        но также можно юзать и чистые штмЛ теги -->
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                    <!-- Вот она магия мы можем спарсить наш массив
                    :key это обязательная переменная при вставке через
                    v-for для виртуал дома она должна быть уникальная -->
                    <th v-for="(head,i) in headers" :key="i"
                        class="text-left"
                    >
                        {{head}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Так сделал незнаю зачем еще один компонент DataRow
                но думаю можно было бы и обойтись без такого дробления
                но для больше показать Ву наверно надо а может и по
                их философии тоже надо вобщем в компонент мы передаем :item
                и вешаем слушатель события удаления, а также назначаем функцию-->
                <DataRow v-for="item in items" :key="item.id" 
                    :item="item"
                    @delete="onDelete"
                />
            </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import axios from 'axios';
import DataRow from './DataRow.vue';
import WinDelConfirm from './WinDelConfirm';
import Alert from './Alert';

export default {
    name: 'Table',
    components: {
        DataRow,
        WinDelConfirm,
        Alert
    },

    data: () => ({
        //содержит имена заголовков таблицы
        headers:[
            'Наименование',
            'Цена',
            'Действия'
        ],
        //тут будет массив итовом с сервера
        items: [],
        dialog_del: false,
        id_del:null,
        alert: false,
        alert_text:'Все пучком!!!'
    }),
    //moundted функция которая в Ву кличеться Options / Lifecycle Hooks
    //я просто зову же Хукс сробатывает один рас при инициализации Компонента
    //когда создан его инстанс и вроди наверно виртуал ДоМ тут нам доступен this
    mounted(){
        //вот магия Аксиос
        axios.get('http://localhost:3000/products')
        .then((response)=> {
            //после получения ответа от сервера 
            //получаем мы кучу еще доп инфы но если мы тут, значит у
            //нас есть поле дата, это то что отдал сервер
            //и я тупо пихаю полученый массив в массив стейт,
            //блин ну нихера это не стейт помоему в Ву стейт в Вуексе
            //просто в переменную я так считаю
            this.items = response.data;
            console.log(response);
        })
        .catch((error)=> {
            //ну тут понятно обработка сетевых ошибок но опускаем их
            //ради упрощения
            console.log(error);
        });
    },
    methods:{
        //Функция Удаления записи из БД принимает ИД
        onConfirmDel(){
            this.dialog_del = false;

            axios.delete(`http://localhost:3000/products/delete/${this.id_del}`)
            .then((response)=>{
                //просто и тупо после гуд от сервера делаем фильтр по существующему
                //массиву и присваем его ему же
                this.items = this.items.filter(item=>{return item.id!=this.id_del});
                //выдаем гуд алерт с текстом от сервера
                this.alert = true;
                this.alert_text = response.data;
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        onDelete(id){
            //просто вызываем окно подтверждения а и еще записуем ид который
            //хотим удалить
            this.dialog_del = true;
            this.id_del = id;
        }
    }
}
</script>
