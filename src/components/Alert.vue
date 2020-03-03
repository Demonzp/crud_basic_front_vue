<template>
    <!-- вобщемто полностью стандартный из мануала вутифай компонент +
    немного магии от v-model из Ву мануала -->
    <v-alert
        :value="value"
        @input="$emit('input', $event)"
        type="success"
      
        dismissible
    >
        {{text}}
    </v-alert>
</template>

<script>
export default {
    name: 'Alert',
    props:{
        "value":{
            type:Boolean,
            required: true
        },
        "text":{
            type:String,
            required: true
        },
    },
    data: () => ({
         
    })
}
</script>
