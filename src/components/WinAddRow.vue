<template>
<!-- Окно Добавления, Логики не содержит -->
<v-row justify="center">
    <v-dialog 
        v-bind:value="value"
        persistent
        max-width="320"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Форма Добавления</span>
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
                <v-btn color="blue darken-1" text @click="$emit('save-add',{name,price})">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    name: 'WinAddRow',
    props:{
        "value":{
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        name:'',
        price:''
    })
}
</script>
