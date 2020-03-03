<template>
<!-- Окно подтверждения удаления одной записи почти стандартный диалог из Вутифай -->
    <v-row justify="center">
    <v-dialog 
        v-bind:value="value"
        persistent
        max-width="320"
    >
      <v-card>
        <v-card-title class="headline">Подтвердите действие</v-card-title>
        <v-card-text>Вы действительно хотите удалить запись с ID = {{id}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- ну тут все просто просто закрываем диалоговое окно -->
          <v-btn color="green darken-1" text @click="$emit('input', false)">Отмена</v-btn>
          <!-- при жмаке на Подтвердить отсылаем на ОТца событие подтвердил Удаление -->
          <v-btn color="green darken-1" text @click="$emit('confirm-del')">Подтвердить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: 'WinDelConfirm',
    props:{
        "value":{
            type: Boolean,
            required: true
        },
        "id":{
            required: true
        },
    },
    data: () => ({
            
    })
}
</script>
